// JavaScript const variable declaration
const map = L.map('map').setView([37.5319485736073,-121.85760498046875], 8);

// Leaflet tile layer, i.e. the base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// //JavaScript let variable declaration to create a marker
// let marker = L.marker([34.0709, -118.444]).addTo(map)
// 		.bindPopup('Math Sciences 4328 aka the Technology Sandbox<br> is the lab where I work in ')
// 		.openPopup();

    fetch("js/map.geojson")
        .then(response => {
            return response.json()
        })
        .then(data =>{
            // Basic Leaflet method to add GeoJSON data
            L.geoJSON(data)
            .bindPopup(function (layer) {
                return layer.feature.properties.Place;
            }).addTo(map);
        })