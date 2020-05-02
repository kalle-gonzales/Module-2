const btn_cookbook = document.getElementById("cookbook" ),
      btn_main     = document.getElementById("haupt"     ),
      btn_first    = document.getElementById("first"    ),
      btn_dessert  = document.getElementById("dessert"  ),
      btn_drink    = document.getElementById("drink"    ),
      btn_Alle     = document.getElementById("Alle"     ),
      btnAlleRezepte  = document.querySelectorAll(".rezept"),
      heart_full_class  = 'fa like fa-heart',
      heart_empty_class = 'fa like fa-heart-o',
      logged_in_user    = JSON.parse(localStorage.getItem("logged_in_user")),
      user_cookbook     = JSON.parse(localStorage.getItem("users"))[logged_in_user].liked_recipes;

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
      rezeptAuswahl = user_cookbook;
    } else if (targetId === "Alle") {
      rezeptAuswahl = Object.keys(JSON.parse(localStorage.getItem("recipes")));
    } else {
        rezeptAuswahl = JSON.parse(localStorage.getItem(targetId))
    }
    for (var i=0; i<rezeptAuswahl.length; i++){
        var newDiv    = document.createElement("div"),
            recipe    = alleRezepte[rezeptAuswahl[i]],
            foodImage = recipe.picture,
            h3        = document.createElement("H3"),
            foodName  = document.createTextNode(recipe.name),
            heart     = document.createElement("i"); // for liking the recipe
        newDiv.style.backgroundImage = 'url("' + foodImage   + '")';
        newDiv.style.backgroundSize = "cover";
        newDiv.style.backgroundPosition = "center center";
        newDiv.id = recipe.id;
        newDiv.className = "rezept";
        newDiv.setAttribute("data-kathegorie", recipe.type);
        if(user_cookbook.includes(recipe.id)){
          heart.setAttribute("class", heart_full_class);
        } else {
          heart.setAttribute("class", heart_empty_class);
        }
        heart.setAttribute("id", recipe.id);
        h3.appendChild(foodName)
        h3.appendChild(heart);
        newDiv.appendChild(h3);

        var p_preview = document.createElement("p");
        p_preview.id = "p" + recipe.id ;
        p_preview.className = "preview_alleRezepte";        
        newDiv.appendChild(p_preview);
        // linkref= "window.location.href = 'Rezept.html#";
        // num_ref = i.toString();
        // linkref.concat(num_ref)
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
        num_half_stars  = 5 - num_full_stars - num_empty_stars,
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

if (logged_in_user) {
  let local_users   = JSON.parse(localStorage.getItem("users")),
      user          = local_users[logged_in_user];
      console.log(user);
  // [...document.querySelectorAll("like")].forEach(function(item) {
  Array.from(document.getElementsByClassName("like")).forEach(function(item) {
    item.onclick = function(event){
      let recipe_id = parseInt(item.id),
          index = user_cookbook.indexOf(recipe_id);
      event.stopPropagation();
      item.classList.toggle("fa-heart");
      item.classList.toggle("fa-heart-o");

      if (index >= 0) {
        user_cookbook.splice(index, 1);
        // no need to store notes for a not more liked recipe
        if (Object.keys(user["notes"]).includes(recipe_id)) {
          let notes = user["notes"];
          delete notes[recipe_id];
          local_users[logged_in_user]["notes"] = notes;
        }
      } else {
        user_cookbook.push(recipe_id);
      }
      // user_cookbook was updated and needs to be written to local_users
      local_users[logged_in_user]["liked_recipes"] = user_cookbook;
      localStorage.setItem("users", JSON.stringify(local_users));
    };
  });
}



