// Define tile layers
let satelliteLayer = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
});

let grayscaleLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    style: 'grayscale'
});

let outdoorLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
});

// Load the tectonic plates data
let tectonicPlatesLayer;
d3.json('tectonicplates/GeoJSON/PB2002_boundaries.json').then(function(data) {
    tectonicPlatesLayer = L.geoJSON(data, {
        style: function () {
            return { color: "orange", weight: 2 };
        }
    });

    // Now that tectonicPlatesLayer is defined, continue map initialization
    initializeMap();
});

// Load the earthquake data
let earthquakeLayer;
d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson').then(function(data) {
    earthquakeLayer = L.geoJSON(data, {
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
    });

    // Now that earthquakeLayer is defined, continue map initialization
    initializeMap();
});

// Create a map centered on a global view
let map; // Declare map variable outside so it can be accessed in functions

function initializeMap() {
    // Check if all layers are loaded before initializing the map
    if (satelliteLayer && tectonicPlatesLayer && earthquakeLayer) {
        // Initialize map with layers
        map = L.map("map", {
            center: [37.09, -95.71],
            zoom: 3,
            layers: [satelliteLayer, tectonicPlatesLayer, earthquakeLayer]
        });

        // Layer control
        let baseLayers = {
            "Satellite": satelliteLayer,
            "Grayscale": grayscaleLayer,
            "Outdoor": outdoorLayer
        };

        let overlayLayers = {
            "Tectonic Plates": tectonicPlatesLayer,
            "Earthquakes": earthquakeLayer
        };

        // Add layer control to the map
        L.control.layers(baseLayers, overlayLayers, { collapsed: false }).addTo(map);

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
                    grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + ' km<br>' : '+ km<br>');
            }

            return div;
        };

        legend.addTo(map);
    }
}

// Function to get color based on depth
function getColor(depth) {
    return depth > 90 ? '#FF0000' :
           depth > 70 ? '#FF4500' :
           depth > 50 ? '#FFA500' :
           depth > 30 ? '#ecdc58' :
           depth > 10 ? '#bfea29' :
           '#68f402';
}
