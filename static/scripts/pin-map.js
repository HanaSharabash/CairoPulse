var markers = new Array();
fields.forEach(function (poi) {

    const element_poi = document.getElementById(poi+'-button');

    element_poi.addEventListener('click' , async function(event){
        const x = document.getElementById('neighborhood-name') ;

        const response = await fetch( '/get-poi-data' , {
            method: 'POST' ,
            headers: {
            'X-CSRFToken': csrftoken,
                 'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               'id' : x.getAttribute('neighborhoodid') ,
               'poi': poi
            })
        }) ;
        data = await response.json() ;

        markers.forEach(function(marker){
            map.removeLayer(marker);
        })
        console.log(data);
        data.forEach(function(point){
            var marker = L.marker([point.location.coordinates[1],point.location.coordinates[0]]);
            marker.bindPopup(point.name);
            marker.on('mouseover', function (e) {
                this.openPopup();
            });
            marker.on('mouseout', function (e) {
                this.closePopup();
            });
            markers.push(marker);
            marker.addTo(map);
            marker._icon.style.filter = "hue-rotate("+fields.indexOf(poi)*11+"deg)";
        })


  });
});



