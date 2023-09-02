// Start map
    var map = L.map('map').setView([46, 14], 5);

// Add TileLayer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
    }).addTo(map);

// Add GeoJSON
    var geojsonLayer = L.geoJSON (groupStage);

// Add Markercluster
    var markers = L.markerClusterGroup({
        maxClusterRadius: 10 // Set value in px
    });


// Create Icon
    function createCustomIcon(imageURL) {
        return L.icon({
            iconUrl: imageURL,
            iconSize: [32, 32], // Set icon size
            iconAnchor: [16, 32], // Set anchor point
            popupAnchor: [0, -32] // Set pop-up anchor point
        });
    }

// Add icons
L.geoJSON(groupStage, {
    pointToLayer: function(feature, latlng) {
        // Verificando se a propriedade "img" existe no GeoJSON
        if (feature.properties && feature.properties.img) {
            var imageURL = 'img/' + feature.properties.img + '.png';

            // Criando ícone personalizado
            var customIcon = createCustomIcon(imageURL);

            // Criando marcador com ícone personalizado
            var marker = L.marker(latlng, { icon: customIcon });

            var countryImage = ''; // Inicialize com uma string vazia

            // Verificando se a propriedade "Country" existe
            if (feature.properties.Country) {
                countryImage = 'img/' + feature.properties.Country + '.png';
            }

            // Criando o conteúdo do popup
            var popupContent = ''
            
            // Adicionando a imagem do país ao popup, se existir
            if (countryImage !== '') {
                popupContent += `

                <div class ='club-profile'>
                    <img src=${imageURL} alt=${feature.properties.Name} class="club-img">
                    <img src=${countryImage} alt=${feature.properties.Country} class="club-country-flag">
                    <br>
                    <h6 class="club-name">${feature.properties.Name}</h6>
                    <br>
                    <div class ='stuff-icon'>
                        <i class="fa-solid fa-trophy"> ${feature.properties.UefaTitles}</i>
                        <br>
                        <i class="fa-solid fa-house" style="font-size: 14px;"> ${feature.properties.Stadium}</i> 
                        <br>
                        <i class="fa-solid fa-people-group"> ${feature.properties.Capacity}</i>
                        <br>
                        <i class="fa-solid fa-ranking-star"> ${feature.properties.UefaRank}º uefa rank</i>
                        <br>
                        <i class="fa-solid fa-euro-sign"> ${feature.properties.TeamValueF}</i>
                    </div>
                </div>
            `;
        }

            // Vinculando o popup ao marcador
            marker.bindPopup(popupContent,{
                //maxWidth: 560
            });

            // Adicionando o marcador ao grupo de marcadores clusterizados
            markers.addLayer(marker);

            // Retornando o marcador
            return marker;
        }
    }
});



// Add markercluster
map.addLayer(markers);

// Calculate geojson center
    var geojsonBounds = geojsonLayer.getBounds();
    map.fitBounds(geojsonBounds);











