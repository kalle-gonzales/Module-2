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
if (url.includes("#") && counter == 0)  {
    targetId = url.split("#")[1];
    counter +=1;
    document.body.onload = addElement();
}

// Foodfilter Funktion die beim Klicken einer Auswahl durchläuft
function foodFilter(event) {
    clearDivs()
    targetId = event.target.dataset.kathegorie; 
    addElement(targetId)
}

// Löscht alle bestehenden Divs in dem alle_rezepte Div aka id="div1"
function clearDivs(){
    var existingDivs = document.getElementById("div1");
    while(existingDivs.firstChild){
        existingDivs.removeChild(existingDivs.firstChild)
        }
}

// Fügt Divs je nach Filterauswahl aus dem localStorage hinzu
function addElement(){
    var alleRezepte = JSON.parse(localStorage.getItem("recipes"))

    // Für den Button Alle Rezepte muss neuer Array mit allen Indizies erstellt werden. Ansonsten gilt targetId aus der foodFilter Funktion
    if(targetId == "Alle"){
        rezeptAuswahl = [];
        for(i=0;i<alleRezepte.length;i++){
            rezeptAuswahl.push(i)
        } 
    } else {
        var rezeptAuswahl = JSON.parse(localStorage.getItem(targetId))
    }
    
    for (var i=0; i<rezeptAuswahl.length; i++){
        var newDiv = document.createElement("div");        
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
        // linkref= "window.location.href = 'Rezept.html#";
        // num_ref = i.toString();
        // console.log(i)
        // linkref.concat(num_ref)

        // console.log(linkref)
        newDiv.setAttribute("onclick", "window.location.href = 'Rezept.html'") //works as well

        //var anchor = document.createElement("a");
        //anchor.className = "rezept";
        //anchor.setAttribute("href", "../html/Rezept.html?ab=2")
        //anchor.style.background = "none"
        //newDiv.appendChild(anchor);
        //console.log(newDiv)

        document.getElementById("div1").appendChild(newDiv);
    }
}




