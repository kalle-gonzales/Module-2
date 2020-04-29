//get the actual recipes from local Storage 
var fillin = JSON.parse(localStorage.getItem('recipes'));

//die richtige ID des richtigen ReZepts übergeben 
let url1 =  window.location.href
if (url1.includes("?")) {
  var r_IDa = url1.split("?")[1]; // is empty when there only is a # at the end of the url, which should not be happing, however we are safe anyways.
}


//fill in the edit form 
var name = fillin["0"].name;
document.getElementById('name').value = name;
var type = fillin["0"].type;
document.getElementById('type').value = type;
var severity = fillin["0"].severity;
document.getElementById('severity').value = severity;
var base = fillin["0"].base;
document.getElementById('base').value = base;
prep_time
var prep_time = fillin["0"].time;
document.getElementById('prep_time').value = prep_time;
var ingredients = fillin["0"].ingredients;
document.getElementById('ingredient_0').value = ingredients;
var description = fillin["0"].description;
document.getElementById('step_0').value = description;


const add_btn            = document.getElementById("add_btn"),
      add_ingredient_btn_0 = document.getElementById("add_ingredient_btn_0"),
      ingredient_limit   = 30,
      step_limit         = 100;
var   readout            = JSON.parse(localStorage.getItem("recipes")),
      recipes            = readout ? readout : [],
      ingredient_counter = 0;

add_btn.addEventListener("click", function(event){
  event.preventDefault();
  let input                = [],
      ingredients          = [],
      instructions         = [],
      ingredients_to_push  = false,
      instructions_to_push = false;

  Array.from(document.forms["new_recipe"]).forEach(function(element){
    if (element.classList.contains("ingredient")) {
      ingredients_to_push = true;
      ingredients.push(element.value);
    } else if (element.classList.contains("instruction")) {
      instructions_to_push = true;
      instructions.push(element.value);
    } else {
      if (ingredients_to_push){
        input.push(JSON.stringify(ingredients));
        ingredients_to_push = false;
      } else if (instructions_to_push) {
        input.push(JSON.stringify(instructions));
        instructions_to_push = false;
      };
      input.push(element.value);
    }
  });
  recipes.push(input);
  window.localStorage.setItem("recipes", JSON.stringify(input));
})


addEventListeners(
  document.getElementById("ingredient_add_btn_0"),
  "ingredient_",
  "Zutat ",
  1,
  ingredient_limit,
  "So viel Zeug brauchst Du nicht, Paul Bucouse!"
);

addEventListeners(
  document.getElementById("step_add_btn_0"),
  "step_",
  "Schritt ",
  1,
  step_limit,
  "Das wird zu kompliziert..."
);

function addEventListeners(dom, category, text, counter, limit, limit_text){
  dom.addEventListener("click", function(){
    if (counter <= limit) {
      var div   = document.getElementById("input_box_" + category + (counter-1).toString()),
          clone = div.cloneNode(true);
      clone.id = "input_box_" + category + counter;
      clone.childNodes[1].innerHTML = text + (counter+1);
      clone.childNodes[3].id        = category + counter;
      clone.childNodes[5].id        = category + "add_btn_" + counter;
      clone.childNodes[7].id        = category + "remove_btn_" + counter;


      div.parentNode.insertBefore(clone, div.nextSibling);

      addEventListeners(clone.childNodes[5], category, text, counter + 1, limit, limit_text);

      let remove = document.getElementById(category + "remove_btn_" + (counter-1).toString());
      remove.classList.remove("fa_hidden");

      remove.addEventListener("click", function(){
        this.parentElement.remove();
        // todo: adjust numbers...
      })
    } else {
      alert(limit_text);
    }
    this.style.display = "none";
  });
};

localStorage.setItem('recipes', JSON.stringify(recipes));



