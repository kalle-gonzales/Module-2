const btn_cookbook = document.getElementById("cookbook" ),
      btn_main     = document.getElementById("haupt"     ),
      btn_first    = document.getElementById("first"    ),
      btn_dessert  = document.getElementById("dessert"  ),
      btn_drink    = document.getElementById("drink"    ),
      btnAlleRezepte  = document.querySelectorAll(".rezept");

btn_cookbook.addEventListener("click", foodFilter);
btn_main.    addEventListener("click", foodFilter);
btn_first.   addEventListener("click", foodFilter);
btn_dessert. addEventListener("click", foodFilter);
btn_drink.   addEventListener("click", foodFilter);

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
    console.log(targetId) ;
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
    //var existingDivs = document.getElementById("id").getElementsByTagName("div")
    //console.log(existingDivs)
    //existingDivs.removeChild()
    //existingDivs.parentNode.removeChild(existingDivs)
     HTMLCollection.prototype.remove = function() {
     [...document.querySelectorAll("rezept")].forEach(item => {
       if(item.parentElement) {
           item.parentElement.removeChild(item);
       };
     });
    }
}

function addElement(){
    var alleRezepte = JSON.parse(localStorage.getItem("recipes"))
    var rezeptArray = JSON.parse(localStorage.getItem(targetId))


    
    //console.log(alleRezepte[0].type)
    //console.log(targetId)
    console.log(rezeptArray)
    
    for (var i=0; i<rezeptArray.length; i++){
        //console.log(alleRezepte[rezeptArray[i]])
        var newDiv = document.createElement("div");
        //var anchor = document.createElement("a");
        var foodImage = alleRezepte[rezeptArray[i]].picture;
        Name = alleRezepte[rezeptArray[i]].name;
        newDiv.style.backgroundImage = 'url("' + foodImage   + '")';
        newDiv.id = alleRezepte[rezeptArray[i]].id;
        newDiv.className = "rezept";
        newDiv.setAttribute("data-kathegorie", alleRezepte[rezeptArray[i]].type)
        var foodName = document.createTextNode(Name)
        newDiv.appendChild(foodName);

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



