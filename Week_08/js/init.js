const map = L.map('map').setView([34.0709, -118.444], 5);

const url = "https://spreadsheets.google.com/feeds/list/1upD99bKWIO68jL8MKWV67KE-_H_TVn2bCwqyQkqNsBw/oxw5dh3/public/values?alt=json"


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

fetch(url)
	.then(response => {
		return response.json();
		})
    .then(data =>{
                // console.log(data)
                formatData(data)
        }
)

let speakFluentEnglish = L.featureGroup();
let speakOtherLanguage = L.featureGroup();


let layers = {
    "English": speakFluentEnglish,
    "Non-English": speakOtherLanguage,
}

let circleOptions = {
    radius: 4,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
}

L.control.layers(null,layers).addTo(map);
function addMarker(data){
    if(data.doyouspeakenglishfluently == "Yes"){
        circleOptions.fillColor = "brown"
        speakFluentEnglish.addLayer(L.circleMarker([data.lat,data.lng]).bindPopup(`<h2>Speaks English fluently</h2>`))
        createButtons(data.lat,data.lng,data.location)
    }
    else{
        circleOptions.fillColor = "red"
        speakOtherLanguage.addLayer(L.circleMarker([data.lat,data.lng]).bindPopup(`<h2>Speak other languages</h2>`))
        createButtons(data.lat,data.lng,data.location)   
        // Bonus:    
        // speakOtherLanguage += 1
    }
    return data.timestamp
}


// let speakOtherLanguage = 0
//window.onload = function afterWebPageLoad() { 
    //document.body.append("Number of hidden records:"+speakOtherLanguage)



function createButtons(lat,lng,title){
    const newButton = document.createElement("button");
    newButton.id = "button"+title;
    newButton.innerHTML = title;
    newButton.setAttribute("lat",lat); 
    newButton.setAttribute("lng",lng);
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng]);
    })
    const spaceForButtons = document.getElementById('contents')
    spaceForButtons.appendChild(newButton);
}

function formatData(theData){
        const formattedData = []
        const rows = theData.feed.entry
        for(const row of rows) {
          const formattedRow = {}
          for(const key in row) {
            if(key.startsWith("gsx$")) {
                  formattedRow[key.replace("gsx$", "")] = row[key].$t
            }
          }
          formattedData.push(formattedRow)
        }
        console.log(formattedData)
        formattedData.forEach(addMarker)  
        speakFluentEnglish.addTo(map)
        speakOtherLanguage.addTo(map)  
        let allLayers= L.featureGroup([speakFluentEnglish,speakOtherLanguage]);    
        map.fitBounds(allLayers.getBounds());
}

