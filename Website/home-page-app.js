function openNav(id) {
    document.getElementById("mySidenav").style.width = "500px";
    document.getElementById("main").style.marginLeft = "0px";

    if (id == "t") {
        fetch('tagamoAwal.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            appendData(data);
        })
        .catch(function (err) {
            console.log('error: ' + err);
        });
    } else if (id == "r") {
        fetch('rehab.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            appendData(data);
        })
        .catch(function (err) {
            console.log('error: ' + err);
        });
    }


    
   
    function appendData(data) {
   
      
        var PointsOfInterest= [];
        let flag = false;
        for(var x in data)
        {
            if(x.localeCompare("atms")==0)
                flag=true;
            if(flag)
              PointsOfInterest.push(x);    
        }

    

      for(let i=0;i<PointsOfInterest.length;i++){
        var mainContainer = document.getElementById(PointsOfInterest[i]);
        //   for (var i = 0; i < data.length; i++) {
               var div = document.createElement("div");
               
               div.innerHTML = (data[PointsOfInterest[i]]).length;
               mainContainer.innerHTML=div.innerHTML;
       //    }
      }
    }



}


/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}