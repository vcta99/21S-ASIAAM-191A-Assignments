let center = [40.0709, -118.444];
let zoomLevel = 7;

let mapConfig = {"center":[34.0709, -118.444], "zoomLevel":5}
const map = L.map('map').setView(center,zoomLevel);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

function addMarker(lat,lng,title,message){
    L.marker([lat,lng]).addTo(map).bindPopup(`${message}`);
    createButton(lat,lng,title);
    return message;
}

// function midpoint(latOld,latNew,lngOld,lngNew,message){
//     let midpointLat = (latOld + latNew)/2
//     let midpointLng = (lngOld + lngNew)/2
//     L.marker([midpointLat, midpointLng,]).addTo(map).bindPopup('message')
//     return message
// }

function createButton(lat,lng,title){
    const newButton = document.createElement("button");
    newButton.id = "button"; // gives the button a unique id
    newButton.innerHTML = title; // gives the button a title
    newButton.setAttribute("lat",lat); // sets the latitude 
    newButton.setAttribute("lng",lng); // sets the longitude 
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng]); //this is the flyTo from Leaflet
    })
    document.body.appendChild(newButton); //this adds the button to our page.
}

addMarker(47,-122,"Join Us For A Sh*tty Good Time", " <h2>Seattle, WA </h2> <p> An impulsive trip I took in the summer of 2019 with a few of my close friends. </p> <img width = 300px height = 100% src = 'Seattle.jpg'>" ) //seattle
addMarker(34,-116,"Beware Of Daut", " <h2>Joshua Tree, CA </h2> <p> The last real roadtrip I took before the pandemic started. Daut, immitating an apex predator. </p><img width = 300px height = 400px src = 'daut.jpg'>") //joshua tree
addMarker(34,-118,"Hello pumpkin do you want some pie?", "<h2>Westwood, CA</h2> <p>Baking sweets with friends on random school nights and watching Christopher Nolan movies.</p><img width = 300px height = 100% src = 'pies.jpg'>") //Los Angeles
addMarker(37,-121, "Hilltops", "<h2>San Jose, CA</h2> <p>My roommate and I on the (in)famous Communication Hills in our hometown.</p><img width = 300px height = 100% src = 'hill.jpg'>") //San Jose




