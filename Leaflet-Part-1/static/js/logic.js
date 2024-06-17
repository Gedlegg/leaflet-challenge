// Create a map centered on a global view
let map = L.map('map').setView([37.0902, -95.7129], 5);

// Add a tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
}).addTo(map);

// Function to get color based on depth
function getColor(depth) {
    return  depth > 90  ? '#FF0000' :
            depth > 70  ? '#FF4500' :
            depth > 50  ? '#FFA500' :
            depth > 30  ? '#ecdc58' :
            depth > 10  ? '#bfea29' :
                          '#68f402';
}

// Load the earthquake data
d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson').then(function(data) { // Replace with the path to your downloaded file
    L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {
                radius: feature.properties.mag * 3,
                fillColor: getColor(feature.geometry.coordinates[2]),
                color: "#000",
                weight: .4,
                opacity: .8,
                fillOpacity: 0.9
            });
        },
        onEachFeature: function (feature, layer) {
            layer.bindPopup(
                'Magnitude: ' + feature.properties.mag + '<br>' +
                'Location: ' + feature.properties.place + '<br>' +
                'Depth: ' + feature.geometry.coordinates[2] + ' km'
            );
        }
    }).addTo(map);
});

// Add a legend to the map
let legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {
    let div = L.DomUtil.create('div', 'legend'),
        grades = [0, 10, 30, 50, 70, 90],
        labels = [];

    div.innerHTML = '<b>Earthquake Depth (km)</b><br>';
    for (let i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);