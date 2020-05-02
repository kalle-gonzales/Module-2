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

let url =  window.location.href;
let targetId;
let counter = 0;

// Läd die gefilterte Auswahl von der Index Seite
if (url.includes("?") && counter == 0)  {
    targetId = url.split("?")[1];
    counter +=1;
    addElement(targetId);
    addPreview();
}

// Foodfilter Funktion die beim Klicken einer Auswahl durchläuft
function foodFilter(event) {
    clearDivs()
    targetId = event.target.dataset.kathegorie; 
    addElement(targetId);
    addPreview();
}

// Löscht alle bestehenden Divs in dem alle_rezepte Div aka id="div1"
function clearDivs(){
    var existingDivs = document.getElementById("div1");
    while(existingDivs.firstChild){
        existingDivs.removeChild(existingDivs.firstChild)
        }
}

// Fügt Divs je nach Filterauswahl aus dem localStorage hinzu
function addElement(targetId){
  console.log(targetId);
    var alleRezepte = JSON.parse(localStorage.getItem("recipes")),
        rezeptAuswahl;

    // Für den Button Alle Rezepte muss neuer Array mit allen Indizies erstellt werden. Ansonsten gilt targetId aus der foodFilter Funktion
    if(targetId == "cookbook"){
      rezeptAuswahl = JSON.parse(localStorage.getItem("users"))[JSON.parse(localStorage.getItem("logged_in_user"))].liked_recipes
    } else if (targetId === "Alle") {
      rezeptAuswahl = Object.keys(JSON.parse(localStorage.getItem("recipes")));
    } else {
        rezeptAuswahl = JSON.parse(localStorage.getItem(targetId))
    }
    for (var i=0; i<rezeptAuswahl.length; i++){
        var newDiv = document.createElement("div");        
        var foodImage = alleRezepte[rezeptAuswahl[i]].picture;
        var ID = alleRezepte[rezeptAuswahl[i]].id;
        newDiv.style.backgroundImage = 'url("' + foodImage   + '")';
        newDiv.style.backgroundSize = "cover";
        newDiv.style.backgroundPosition = "center center";
        newDiv.id = alleRezepte[rezeptAuswahl[i]].id;
        newDiv.className = "rezept";
        newDiv.setAttribute("data-kathegorie", alleRezepte[rezeptAuswahl[i]].type)
        var h3 = document.createElement("H3")
        var foodName = document.createTextNode(alleRezepte[rezeptAuswahl[i]].name)
        h3.appendChild(foodName)
        newDiv.appendChild(h3);

        var p_preview = document.createElement("p");
        p_preview.id = "p" + alleRezepte[rezeptAuswahl[i]].id ;
        p_preview.className = "preview_alleRezepte";        
        newDiv.appendChild(p_preview);
        newDiv.setAttribute("onclick", `window.location.href = 'Rezept.html?${ID}'`) 

        document.getElementById("div1").appendChild(newDiv);
    }
}


function addPreview(){
    filteredDivs = [];
    var alleRezepte = JSON.parse(localStorage.getItem("recipes"))
    var allDivs = document.getElementsByClassName("rezept")

    for (var i=0; i<allDivs.length; i++){
        var p_preview = document.getElementById("p" + allDivs[i].id)
        getPreview(alleRezepte[allDivs[i].id]["rating"], alleRezepte[allDivs[i].id]["time"], p_preview);
    }
    

    function getPreview(rating, time, preview_dom) {
    let num_full_stars  = Math.floor(rating),
        num_empty_stars = 5 - Math.ceil(rating),
        num_half_stars  = 5 - num_full_stars - num_empty_stars;
        icon_full_star  = '<i class="fa fa-star" aria-hidden="true"></i>',
        icon_half_star  = '<i class="fa fa-star-half-o" aria-hidden="true"></i>',
        icon_empty_star = '<i class="fa fa-star-o" aria-hidden="true"></i>';

    preview_dom.innerHTML = icon_full_star.repeat(num_full_stars)   +
                            icon_half_star.repeat(num_half_stars)   +
                            icon_empty_star.repeat(num_empty_stars) +
                            '<i class="fa fa-clock-o" aria-hidden="true"></i>' + time;
    }

    Array.from(document.getElementsByClassName("rezept")).forEach(function (item) {
        preview_add_hover_listeners(item);
      });
      
      function preview_add_hover_listeners(element) {
        element.addEventListener("mouseover", function(){
          document.getElementById("p" + element.id).style.visibility = "visible";
        });
      
        element.addEventListener("mouseout", function(){
          document.getElementById("p" + element.id).style.visibility = "hidden";
        });
      }
}





