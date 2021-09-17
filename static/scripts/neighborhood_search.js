const search_bar = document.getElementById('search-bar') ;
const csrftoken = getCookie('csrftoken');

search_bar.addEventListener ('keydown',function (e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        return false;
    }
});

async function handler (event) {

    if(search_bar.value != ""){
        const response = await fetch( '/search_neighborhoods' , {
            method: 'POST',
            headers: {
                 "X-CSRFToken": csrftoken,
                 'Content-Type': 'application/json',
            },
            body: JSON.stringify(search_bar.value)

      }) ;
      const data = await response.json() ;
      const div = document.createElement('div');

      for(let i = 0 ; i < data.length ; i++ ){
         const search_entry = document.createElement('a');
         search_entry.id = data[i]['_id']['$oid']
         search_entry.innerHTML = data[i]['name_EN']+', '+data[i]['name_AR'] ;
         search_entry.addEventListener('click',function (event) {

            geojson.eachLayer(function(layer) {
                console.log(layer.feature.properties.name_EN);

                if(layer.feature.properties._id['$oid']===search_entry.id){
                    map.fitBounds(layer.getBounds());
                };
            });

         })
         div.appendChild(search_entry) ;
      }
      const search_results = document.getElementById('search-res');
      search_results.innerHTML = ''
      search_results.appendChild(div) ;
      }
      else{
      const search_results = document.getElementById('search-res');
      search_results.innerHTML = ''

      }
}



function searchEventListener () {
search_bar.addEventListener('keyup', handler ) ;
search_bar.addEventListener('click',handler) ;
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
