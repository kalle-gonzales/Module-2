//get the actual recipes from local Storage 
var fillin = JSON.parse(localStorage.getItem('recipes'));

//die richtige ID des richtigen ReZepts übergeben 
let url1 =  window.location.href
if (url1.includes("?")) {
  var r_IDa = url1.split("?")[1]; // is empty when there only is a # at the end of the url, which should not be happing, however we are safe anyways.
}


//fill in the edit form 
var name = fillin[r_IDa].name;
document.getElementById('name').value = name;
var type = fillin[r_IDa].type;
document.getElementById('type').value = type;
var severity = fillin[r_IDa].severity;
document.getElementById('severity').value = severity;
var base = fillin[r_IDa].base;
document.getElementById('base').value = base;
prep_time
var prep_time = fillin[r_IDa].time;
document.getElementById('prep_time').value = prep_time;
var ingredients = fillin[r_IDa].ingredients;
document.getElementById('ingredient_0').value = ingredients;
var description = fillin[r_IDa].description;
document.getElementById('step_0').value = description;


//veränderte Einträge abspeichern 

const add_btn            = document.getElementById("add_btn"),
      add_ingredient_btn_0 = document.getElementById("add_ingredient_btn_0"),
      ingredient_limit   = 30,
      step_limit         = 100;
var   readout            = JSON.parse(localStorage.getItem("recipes")),
      recipes            = readout ? readout : [],
      ingredient_counter = 0;

add_btn.addEventListener("click", function(event){
  event.preventDefault();
  let input                 = document.forms["new_recipe"],
      bases                 = JSON.parse(localStorage.getItem("base")),
      types                 = JSON.parse(localStorage.getItem(input[1].value)),
      recipe                = {},
      id                    = r_IDa,
      base                  = input[3].value;

  recipe["id"]          = id;
  recipe["rating"]      = 0;
  recipe["ingredients"] = [];
  recipe["descirption"] = [];


  Array.from(input).forEach(function(element){
    if(element.id.includes("ingredient")) {
      recipe["ingredients"].push(element.value);
    } else if(element.id.includes("step")) {
      recipe["descirption"].push(element.value);
    } else if (element.value === "Einreichen"){
      return;  // no need to get the submit button in the recipes
    } else {
      recipe[element.id] = element.value;
    }
  })

  if (Object.keys(bases).includes(recipe.base)) {
    bases[base].push(id);
  } else {
    bases[base] = [id];
  }
  localStorage.setItem("base", JSON.stringify(bases));
  recipes.splice(r_IDa, 1, recipe);
  //recipes.push(recipe);
  types.push(id);
  localStorage.setItem(type, JSON.stringify(types));
  localStorage.setItem("recipes", JSON.stringify(recipes));
})


addEventListeners(
  document.getElementById("ingredient_add_btn_0"),
  "ingredient_",
  0,
  ingredient_limit,
  "So viel Zeug brauchst Du nicht, Paul Bucouse!"
);

addEventListeners(
  document.getElementById("step_add_btn_0"),
  "step_",
  0,
  step_limit,
  "Das wird zu kompliziert..."
);

function addEventListeners(dom, category, counter, limit, limit_text){
  dom.addEventListener("click", function(){
    if (counter < limit) {
      var div   = document.getElementById("input_box_" + category + counter),
          clone = div.cloneNode(true);
      clone.id                  = "input_box_" + category + (counter + 1);
      clone.childNodes[1].id    = category + (counter + 1);
      clone.childNodes[1].value = ""
      clone.childNodes[3].id    = category + "add_btn_" + (counter + 1);
      clone.childNodes[5].id    = category + "remove_btn_" + (counter + 1);

      div.parentNode.insertBefore(clone, div.nextSibling);

      addEventListeners(clone.childNodes[3], category, counter + 1, limit, limit_text);

      let remove = document.getElementById(category + "remove_btn_" + counter);
      remove.classList.remove("fa_hidden");

      remove.addEventListener("click", function(){
        this.parentElement.remove();
      })
    } else {
      alert(limit_text);
    }
    this.style.display = "none";
  });
};

document.addEventListener("keydown", function(event) {
  if (event.ctrlKey && event.key == "0") {
    let rawFile = new XMLHttpRequest();
    rawFile.open("GET", "../JSON_files/recipes_2.json", false);
    rawFile.onreadystatechange = function () {
      if(rawFile.readyState === 4) {
        if(rawFile.status === 200 || rawFile.status == 0) {
          let recipes_raw = JSON.parse(rawFile.responseText),
              recipes     = {"Vorspeise": [], "Hauptspeise": [], "Dessert": [], "Drink": []},
              base        = {},
              raw_recipe  = {},
              id;
          recipes_raw.forEach(function(recipe) {
            id = recipe.id;
            recipes[recipe.type].push(id);
            raw_recipe[id] = recipe;
            if (Object.keys(base).includes(recipe.base)) {
              base[recipe.base].push(id);
            } else {
              base[recipe.base] = [id];
            };
          });
          localStorage.setItem("recipes", JSON.stringify(recipes_raw)           );
          localStorage.setItem("first",   JSON.stringify(recipes["Vorspeise"])  );
          localStorage.setItem("main",    JSON.stringify(recipes["Hauptspeise"]));
          localStorage.setItem("dessert", JSON.stringify(recipes["Dessert"])    );
          localStorage.setItem("drink",   JSON.stringify(recipes["Drink"])      );
          localStorage.setItem("base",    JSON.stringify(base)                  );
        };
      };
    };
    rawFile.send(null);
  };
});