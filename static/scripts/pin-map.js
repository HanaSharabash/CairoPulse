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
  });
});


