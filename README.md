# leaflet-challenge


## Overview

This project utilizes Leaflet.js and D3.js to visualize earthquake and tectonic plate data on an interactive map. The application fetches data from external sources and dynamically renders it using various map layers and visualizations.

### Leaflet-Part-1

#### Overview:

* **Map Initialization** : Sets up a global view centered around coordinates (37.0902, -95.7129) with an initial zoom level of 5.
* **Tile Layer** : Uses OpenStreetMap tiles to render the base map layer with a maximum zoom level of 18.
* **Earthquake Data Visualization** : Retrieves real-time earthquake data from the USGS API (`https://earthquake.usgs.gov`) and displays it as circle markers on the map.
* **Legend** : Displays a legend on the bottom right of the map indicating earthquake depth ranges using colored markers.

### Leaflet-Part-2

#### Overview:

* **Tile Layers** : Defines multiple tile layers including satellite view (`Google Maps`), grayscale view, and outdoor terrain view.
* **Tectonic Plates Data** : Loads tectonic plate boundary data from an external plugin cloned from "https://github.com/fraxen/tectonicplates" to a local GeoJSON file (`PB2002_boundaries.json`) and displays it as orange lines on the map.
* **Integration with Earthquake Data** : Combines earthquake data visualization with tectonic plate boundaries and tile layers to provide comprehensive map overlays.
* **Layer Control** : Implements a layer control allowing users to toggle between different base map layers (satellite, grayscale, outdoor) and overlay layers (tectonic plates, earthquakes).
* **Legend Enhancement** : Enhances the legend functionality to accommodate both earthquake depth and other relevant map layers.
