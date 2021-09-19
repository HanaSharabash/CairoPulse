var markers = new Array();
fields.forEach(function (poi) {

    const element_poi = document.getElementById(poi);

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
        console.log(data);
        data.forEach(function(point){
            console.log("point");
            console.log(point.location.coordinates);
            var marker = L.marker([point.location.coordinates[1],point.location.coordinates[0]]);
            // console.log(marker._icon);
            // marker._icon.style.filter = "hue-rotate("+fields.indexOf(poi)*11+"deg)";
            marker.bindPopup(point.name);
            marker.on('mouseover', function (e) {
                this.openPopup();
            });
            marker.on('mouseout', function (e) {
                this.closePopup();
            });
            marker.addTo(map);
        })
        // console.log(marker._icon.style)




  });
});



