const map = L.map('map').setView([34.0709, -118.444], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

function addMarker(data){
        // console.log(data)
        // these are the names of our fields in the google sheets:
        L.marker([data.lat,data.lng]).addTo(map).bindPopup(`<h2>${data.coffeeshop}</h2> <p>${data.story}</>`)
        return data.timestamp
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