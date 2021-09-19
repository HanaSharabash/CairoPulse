var districts ;
var geojson ;
var map ;

async function paint_map(){
      map = L.map('mapid').setView([30.0444, 31.2357 ], 11);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 30,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiYWhtZWQtZWxhbW9yeSIsImEiOiJja3NyZnBnc2cwbWJ2MnFvM3hiaWxpZzUxIn0.xoCsgjFAng1B8o048IzF1A'
        }).addTo(map);

        var popup = L.popup();


        var info = L.control();

        info.onAdd = function (map) {
            this._div = L.DomUtil.create('div', 'info');
            this.update();
            return this._div;
        };

        info.update = function (props) {
            this._div.innerHTML = '<h4>District Properties</h4>' +
              (props ? '<b>' + props.name_AR + '</b> <br> <b>'+props.name_EN+'</b>' : 'Hover over a District');
        };

        info.addTo(map);


        function highlightFeature(e) {
            var layer = e.target;

            layer.setStyle({
                weight: 5,
                color: '#666',
                dashArray: '',
                fillOpacity: 0.7
            });

            if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                layer.bringToFront();
            }

            info.update(layer.feature.properties);
        }



        function resetHighlight(e) {
            geojson.resetStyle(e.target);
            info.update();
        }

         zoom = async function zoomToFeature(e) {
           const side_nav = document.getElementById("mySidenav") ;
           const response = await fetch( '/get-categories' , {
            method: 'POST',
            headers: {
            'X-CSRFToken': csrftoken,
                 'Content-Type': 'application/json',
            },
            body: e.target?JSON.stringify(e.target.feature.properties._id['$oid']):JSON.stringify(e.feature.properties._id['$oid'])

             }) ;

             data = await response.json();

             data = data[0] ;


                   document.getElementById('neighborhood-name').innerHTML = data['name_EN'];
             Object.keys(data).forEach(function(key) {
                var value = data[key];
                if (!(key === '_id' || key === 'name_EN')){
                const element = document.getElementById(key) ;
                element.textContent = value ;
                }
             });

            map.fitBounds(e.target?e.target.getBounds():e.getBounds());
            side_nav.style.width = "400px";

        }






        function onEachFeature(feature, layer) {
            layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight,
                click: zoom
             });
        }



        function getColor(c) {
		return  c == 0  ? '#bfd3e6' :
				c == 1  ? '#9ebcda' :
				c == 2  ? '#bcbddc' :
				c == 3  ? '#9e9ac8' :
				c == 4  ? '#88419d' :
				c == 5  ? '#810f7c' :
				c == 6	? '#4d004b' :
				           '#4d004b';




	}


    function style(feature) {
		return {
			weight: 2,
			opacity: 1,
			color: 'white',
			dashArray: '3',
			fillOpacity: 0.8,
			fillColor: getColor(feature.properties.vibrancy.cluster)
		};
	}


    var legend = L.control({position: 'bottomright'});



    legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [1, 2, 3, 4, 5, 6],
        labels = [],
        from, to;

        for (var i = 0; i < grades.length; i++) {
			from = grades[i];
			to = grades[i + 1];

			labels.push(
				'<i style="background:' + getColor(from + 1) + '"></i> ' +
				from + (to ? '&ndash;' + to : '+'));
		}

		div.innerHTML = '<b>Vibrancy Levels:</b><br>'+'<div>'+labels.join('<br>')+'</div>';

		return div;
    };

	legend.addTo(map);

    map.attributionControl.addAttribution('Copyrights &copy; <a href="https://github.com/HanaSharabash/CairoPulse">Cairo Pulse</a>');


        geojson = L.geoJson(districts, {
            style: style,
            onEachFeature: onEachFeature

        }).addTo(map);


}




async function get_geometries (){
       const response = await fetch( '/get-geometries', {
            method: 'GET',
            headers: {
                 'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
          }) ;
      data = await response.json() ;
      return data ;
}

window.addEventListener('load' , async function (event) {

      districts = await get_geometries() ;
      await paint_map();
      searchEventListener() ;
});







