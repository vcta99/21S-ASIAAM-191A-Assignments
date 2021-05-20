const map = L.map('map').setView([34.0709, -118.444], 11);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let forTheCoffee = L.featureGroup();
let forTheRomance = L.featureGroup();


let layers = {
    "For The Coffee": forTheCoffee,
    "For The Romance": forTheRomance,
}

let circleOptions = {
    radius: 4,
    fillColor: "#800000",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
}

L.control.layers(null,layers).addTo(map);

function addMarker(data){
        // console.log(data)
        // these are the names of our fields in the google sheets:
        if(data.whyareyourecommendingthiscoffeeshop == "for the coffee"){
          circleOptions.fillColor = "brown"
          forTheCoffee.addLayer(L.circleMarker([data.lat,data.lng]).bindPopup(`<h2>${data.coffeeshop}</h2> <p>${data.story}</>`))
          createButtons(data.lat,data.lng,data.coffeeshop)
          return data.timestamp
        }
        else {
          circleOptions.fillColor = "red"
          forTheRomance.addLayer(L.circleMarker([data.lat,data.lng]).bindPopup(`<h2>${data.coffeeshop}</h2> <p>${data.story}</>`))
          createButtons(data.lat,data.lng,data.coffeeshop)
          return data.timestamp
        }

}

function createButtons(lat,lng,title){
    const newButton = document.createElement("button"); // adds a new button
    newButton.id = "button"+title; // gives the button a unique id
    newButton.innerHTML = title; // gives the button a title
    newButton.setAttribute("lat",lat); // sets the latitude 
    newButton.setAttribute("lng",lng); // sets the longitude 
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng]); //this is the flyTo from Leaflet
    })
    const spaceForButtons = document.getElementById("contents")
    spaceForButtons.appendChild(newButton); //this adds the button to our page.
}

let url = "https://spreadsheets.google.com/feeds/list/1mg4IqOpE7w6xG-LQHDnwEEpPRp-_pEhmd3roaZ4lFpk/ocb5qt5/public/values?alt=json"

fetch(url)
	.then(response => {
		return response.json();
		})
    .then(data =>{
                // console.log(data)
                formatData(data)
        }
)


function formatData(theData){
        const formattedData = [] /* this array will eventually be populated with the contents of the spreadsheet's rows */
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
}


const faveDrinks = ['matcha','latte','mocha','decaf']
function myFunction(data, faveDrinks) {
    for (const drink of faveDrinks){
        console.log ("I love drinking" + drink + "at" + data.coffeeshop);
        }
  }


console.log('hi albert i am sorry if this lab is wrong')


