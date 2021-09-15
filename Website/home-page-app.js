
/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav(id) {
    document.getElementById("mySidenav").style.width = "500px";
    document.getElementById("main").style.marginLeft = "0px";

    if (id == "t") {
        fetch('sample.txt')
            .then(res => res.text())
            .then(data => {
                document.getElementById('data').innerHTML = data
            });

    } else if (id == "r") {
        fetch('atms.json')
            .then(res => res.json())
            .then(data => {
                let output = ` 
                        `;
                data.forEach(element => {
                    output += `
                    <ul>
                        <li>name: ${element.name}</li>
                        <li>address: ${element.address}</li>
                    </ul>
           `;
                });
                document.getElementById('Financial Services').innerHTML = output
            });
    }
}


/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}