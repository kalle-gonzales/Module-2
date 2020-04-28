const btn_cookbook = document.getElementById("cookbook" ),
      btn_main     = document.getElementById("haupt"     ),
      btn_first    = document.getElementById("first"    ),
      btn_dessert  = document.getElementById("dessert"  ),
      btn_drink    = document.getElementById("drink"    ),
      btn_Alle     = document.getElementById("Alle"     ),
      btnAlleRezepte  = document.querySelectorAll(".rezept");

btn_cookbook.addEventListener("click", foodFilter);
btn_main.    addEventListener("click", foodFilter);
btn_first.   addEventListener("click", foodFilter);
btn_dessert. addEventListener("click", foodFilter);
btn_drink.   addEventListener("click", foodFilter);
btn_Alle.    addEventListener("click", foodFilter);

//LOAD.addEventlistener("onload", foodFilter);

// let url =  window.location.href
// if (url.includes("#")) {
//   let filter = url.split("#")[1]; // is empty when there only is a # at the end of the url, which should not be happing, however we are safe anyways.
//   alleRezepte.forEach(function(rezept) {
//     if (filter === "cookbook"){
//         rezept.style.display = "block";
//     } else if (rezept.dataset.kathegorie !== filter) {
//         rezept.style.display = "none";
//     } else {
//         rezept.style.display = "block";
//     }
//   });
// }

// btn_cookbook.click();

//let targetId = localStorage.getItem("food_filter_id_from_index");

// function foodFilter_from_index(){
//     console.log(targetId);
//     if (!targetId) {
//         alleRezepte.forEach(function(rezept) {
//             if (targetId === "Alle"){
//                 rezept.style.display = "block";
//             } else if (rezept.dataset.kathegorie != targetId) {
//                 rezept.style.display = "none";
//             } else {
//                 rezept.style.display = "block";
//             }
//         });
//     }
// }

// foodFilter(window.onload)

//var rezeptArray = JSON.parse(localStorage.getItem("recipes"))
//console.log(rezeptArray[0].type)



let url =  window.location.href;
let targetId;
let counter = 0;

if (url.includes("#") && counter == 0)  {
    targetId = url.split("#")[1];
    //console.log(targetId) ;
    counter +=1;
    document.body.onload = addElement();
}





function foodFilter(event) {
    clearDivs()
    targetId = event.target.dataset.kathegorie; 
    //console.log(targetId)
    addElement(targetId)
}

function clearDivs(){
    var existingDivs = document.getElementById("div1");
    while(existingDivs.firstChild){
        existingDivs.removeChild(existingDivs.firstChild)
    }

    
    //var existingDivs = document.getElementsByClassName("rezept")
    //var existingDivs2 = document.querySelector("rezept")
    //console.log(existingDivs)
    //console.log(existingDivs.length)
    //console.log(existingDivs[0])
    //delete existingDivs;

    //for (var i=0; i=existingDivs.length; i++){
        //existingDivs[i].parentNode.removeChild(existingDivs)
        //delete existingDivs[i];
        
    //}
        
    //existingDivs.removeChild()
    //existingDivs.parentNode.removeChild(existingDivs)
    // HTMLCollection.prototype.remove = function() {
    // [...document.querySelectorAll("rezept")].forEach(item => {
    // if(item.parentElement) {
    //     item.parentElement.removeChild(item);
    // };
    // });
    // }
}

function addElement(){
    var alleRezepte = JSON.parse(localStorage.getItem("recipes"))

    if(targetId == "Alle"){
        rezeptAuswahl = [];
        for(i=0;i<alleRezepte.length;i++){
            rezeptAuswahl.push(i)
        }
    } else {
        var rezeptAuswahl = JSON.parse(localStorage.getItem(targetId))
    }
    


    for (var i=0; i<rezeptAuswahl.length; i++){
        //console.log(alleRezepte[rezeptAuswahl[i]])
        var newDiv = document.createElement("div");
        //var anchor = document.createElement("a");
        var foodImage = alleRezepte[rezeptAuswahl[i]].picture;
        Name = alleRezepte[rezeptAuswahl[i]].name;
        newDiv.style.backgroundImage = 'url("' + foodImage   + '")';
        newDiv.style.backgroundSize = "cover";
        newDiv.style.backgroundPosition = "center center";
        newDiv.id = alleRezepte[rezeptAuswahl[i]].id;
        newDiv.className = "rezept";
        newDiv.setAttribute("data-kathegorie", alleRezepte[rezeptAuswahl[i]].type)
        var h3 = document.createElement("H3")
        var foodName = document.createTextNode(Name)
        h3.appendChild(foodName)
        newDiv.appendChild(h3);

        //anchor.className = "rezept";
        //anchor.setAttribute("href", "../html/Rezept.html?ab=2")
        //anchor.style.background = "none"
        //newDiv.appendChild(anchor);
        //console.log(newDiv)

        document.getElementById("div1").appendChild(newDiv);

        //var currentDiv = document.getElementById("div1");
        //document.body.insertBefore(newDiv, currentDiv)
    }
}

//document.getElementsByClassName("rezept").setAttribute('onclick', 'location.href = /html/Rezept.html');

//document.addEventListener("click", function(){
//  getElementsByClassName("rezept") = link("/html/Rezept.html");
//  });



