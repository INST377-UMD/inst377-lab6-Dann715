// Initialize the map centered in the US
var map = L.map('map').setView([37.0902, -95.7129], 4);

// Add the OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Foe random coordinates
function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

// 3 random markers
let markerInfoDiv = document.getElementById('marker-info');

for (let i = 1; i <= 3; i++) {
    let latitude = getRandomInRange(30, 35, 3);
    let longitude = getRandomInRange(-90, -100, 3);

    // Place marker on the map
    let marker = L.marker([latitude, longitude]).addTo(map);
    marker.bindPopup(`Marker ${i}: Latitude: ${latitude}, Longitude: ${longitude}`).openPopup();

    // Fetch locality data for the markers we just did
    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
        .then(response => response.json())
        .then(data => {
            let locality = data.locality || "Unknown Locality";
            // locality information right below the map
            markerInfoDiv.innerHTML += `<p>Marker ${i}: Latitude: ${latitude}, Longitude: ${longitude}<br>Locality: ${locality}</p>`;
        })
        .catch(error => {
            console.error('Error fetching locality data:', error);
            markerInfoDiv.innerHTML += `<p>Marker ${i}: Latitude: ${latitude}, Longitude: ${longitude}<br>Locality: Error fetching data</p>`;
        });
}
