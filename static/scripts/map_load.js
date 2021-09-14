
       var map = L.map('mapid').setView([30.0444, 31.2357 ], 11);
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
              (props ? '<b>' + props.NAME_ar + '</b> <br> <b>'+props.NAME_en+'</b>' : 'Hover over a District');
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

        function zoomToFeature(e) {
            map.fitBounds(e.target.getBounds());

        }




        function onEachFeature(feature, layer) {
            layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight,
                click: zoomToFeature
             });
        }



        function getColor(c) {
		return  c == 1  ? '#f2f0f7' :
				c == 2  ? '#dadaeb' :
				c == 3  ? '#bcbddc' :
				c == 4  ? '#9e9ac8':
				c == 5  ? '#807dba':
				c == 6  ? '#6a51a3':
						  '#4a1486';
	}


    function style(feature) {
		return {
			weight: 2,
			opacity: 1,
			color: 'white',
			dashArray: '3',
			fillOpacity: 0.8,
			fillColor: getColor(feature.properties.c)
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

		div.innerHTML = '<div>'+labels.join('<br>')+'</div>';

		return div;
    };

	legend.addTo(map);

    map.attributionControl.addAttribution('Copyrights &copy; <a href="https://github.com/HanaSharabash/CairoPulse">Cairo Pulse</a>');


        var geojson = L.geoJson(cairoDistricts, {
            style: style,
            onEachFeature: onEachFeature

        }).addTo(map);
