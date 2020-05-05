
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


//Zutaten zählen und Parameter festlegen
var ingredients_i = fillin[r_IDa].ingredients,
    ingred_counter = ingredients_i.length,
    counterbox_i = 0,
    i = 0;
    i_r = 0; 

//Zutatenboxen ausfüllen 
function fill_i(ingred_counter, counterbox_i, i, i_r) {
  if (ingred_counter > 1) {
    for(i; i < ingred_counter; i++, i_r++) {
      var div   = document.getElementById("input_box_ingredient_0"),
          clone = div.cloneNode(true);
          //test  = ingredients[1];
      clone.id                  = "ingredient_" + (counterbox_i + 1);
      //clone.value = "";

      var ingredients = fillin[r_IDa].ingredients;
      document.getElementById('ingredient_'+ counterbox_i).value = ingredients[i_r];

      div.parentNode.insertBefore(clone, div.nextSibling);
      console.log(ingredients[i_r]);

    }
  }
}
  
fill_i(ingred_counter, counterbox_i, i, i_r,);


//Steps zählen und Parameter festlegen
var step_f = fillin[r_IDa].description,
    step_counter = step_f.length,
    counterbox_s = 0,
    s = 0;
    i_s = 0;

//Stepboxen ausfüllen 
function fill_s(step_counter, counterbox_s, s, i_s) {
  if (ingred_counter > 1) {
    for(s; s < step_counter; i++, i_s++) {
      var div   = document.getElementById("step_0"),
          clone = div.cloneNode(true);
          
      clone.id                  = "step_" + (counterbox_s + 1);
      
      var steps = fillin[r_IDa].description;
      document.getElementById('ingredient_'+ counterbox_s).value = steps[i_r];

      div.parentNode.insertBefore(clone, div.nextSibling);
      console.log(steps[i_r]);

    }
  }
}

fill_s(step_counter, counterbox_s, s, i_s);



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
      id                    = recipes.length,
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
  recipes.push(recipe);
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