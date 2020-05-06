
//get the actual recipes from local Storage
var fillin = JSON.parse(localStorage.getItem('recipes'));

//die richtige ID des richtigen ReZepts übergeben 
let url1 =  window.location.href
if (url1.includes("?")) {
  var r_IDa = url1.split("?")[1]; // is empty when there only is a # at the end of the url, which should not be happing, however we are safe anyways.
}


//fill in the edit form 
var name        = fillin[r_IDa].name,
    type        = fillin[r_IDa].type,
    severity    = fillin[r_IDa].severity,
    base        = fillin[r_IDa].base,
    prep_time   = fillin[r_IDa].time,
    ingredients = fillin[r_IDa].ingredients;

document.getElementById('name'     ).value = name;
document.getElementById('type'     ).value = type;
document.getElementById('severity' ).value = severity;
document.getElementById('base'     ).value = base;
document.getElementById('prep_time').value = prep_time;


//Zutaten zählen und Parameter festlegen
var ingredients_i = fillin[r_IDa].ingredients;

//Zutatenboxen ausfüllen 
function fill_i(number_of_ingredients) {
  for(var i = 1; i < number_of_ingredients; i++) {
    var div   = document.getElementById("input_box_ingredient_" + parseInt(i - 1));
    var clone = div.cloneNode(true);
    clone.id = "input_box_ingredient_" + parseInt(i);
    
    div.childNodes.forEach(child => {
      if(child.id) {
        let sub_strings = child.id.split("_");
        sub_strings[sub_strings.length - 1] = i;
        child.id = sub_strings.join("_");
      }
    })

    div.parentNode.insertBefore(clone, div.nextSibling);
    document.getElementById('ingredient_'+ i).value = ingredients[i - 1];

    document.getElementById("ingredient_remove_btn_" + parseInt(i)).addEventListener("click", function(){
      this.parentElement.remove();
    })
  }
}

// last element needs to be added by hand, because we don't want an other clone
document.getElementById("ingredient_remove_btn_0").addEventListener("click", function(){
  this.parentElement.remove();
})

document.getElementById('ingredient_0').value = ingredients[ingredients.length - 1];


fill_i(ingredients_i.length);


//Steps zählen und Parameter festlegen
var step_f = fillin[r_IDa].description;

//Stepboxen ausfüllen 
function fill_s(step_counter) {
  for(var s = 1; s < step_counter; s++) {
    var div   = document.getElementById("input_box_step_" + parseInt(s - 1)),
        clone = div.cloneNode(true);
    clone.id = "input_box_step_" + parseInt(s);
    
    div.childNodes.forEach(child => {
      if(child.id) {
        let sub_strings = child.id.split("_")
        sub_strings[sub_strings.length - 1] = s
        child.id = sub_strings.join("_");
      }
    })

    div.parentNode.insertBefore(clone, div.nextSibling);
    document.getElementById('step_' + s).value = step_f[s - 1];

    document.getElementById("step_remove_btn_" + parseInt(s)).addEventListener("click", function(){
      this.parentElement.remove();
    })
  }
}

document.getElementById("step_remove_btn_0").addEventListener("click", function(){
  this.parentElement.remove();
})

document.getElementById('step_0').value = step_f[step_f.length - 1];

fill_s(step_f.length);


const add_btn            = document.getElementById("add_btn"),
      add_ingredient_btn_0 = document.getElementById("add_ingredient_btn_0"),
      ingredient_limit   = 30,
      step_limit         = 100;
var   readout            = JSON.parse(localStorage.getItem("recipes")),
      recipes            = readout ? readout : [];

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
  recipe["description"] = [];


  Array.from(input).forEach(function(element){
    if(element.id.includes("ingredient")) {
      recipe["ingredients"].push(element.value);
    } else if(element.id.includes("step")) {
      recipe["description"].push(element.value);
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

var ingredient_counter = ingredients_i.length,
    step_counter       = step_f.length;
addEventListeners(
  document.getElementById("ingredient_add_btn"),
  "ingredient_",
  ingredient_counter,
  ingredient_limit,
  "So viel Zeug brauchst Du nicht, Paul Bucouse!"
);

addEventListeners(
  document.getElementById("step_add_btn"),
  "step_",
  step_counter,
  step_limit,
  "Das wird zu kompliziert..."
);

function addEventListeners(dom, category, counter, limit, limit_text){
  dom.addEventListener("click", function(){
    if (counter < limit) {
      var div   = document.getElementsByClassName("ingredient_input_box")[counter-1],
          clone = div.cloneNode(true);
      clone.id                  = "input_box_" + category + counter;
      clone.childNodes[1].id    = category + counter;
      clone.childNodes[1].value = ""
      clone.childNodes[3].id    = category + "remove_btn_" + counter;

      div.parentNode.insertBefore(clone, dom);

      clone.childNodes[1].focus();

      let remove = document.getElementById(category + "remove_btn_" + counter);
      remove.classList.remove("fa_hidden");
      console.log(remove);

      remove.addEventListener("click", function(){
        this.parentElement.remove();
      })
      counter++;
      console.log(counter);
    } else {
      alert(limit_text);
    }
  });
};