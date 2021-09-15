const search_bar = document.getElementById('search-bar') ;


search_bar.addEventListener('keyup' , async function(event) {

    if(search_bar.value != ""){
      let csrftoken = getCookie('csrftoken');
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
         search_entry.innerHTML = data[i]['name_EN']+', '+data[i]['name_AR'] ;
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
})

function getCookie(cname) {
     var name = cname + "=";
     var ca = document.cookie.split(';');
     for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if(c.indexOf(name) == 0)
           return c.substring(name.length,c.length);
     }
     return "";
}