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

document.addEventListener("keydown", function(event) {
  if (event.key == "0") {
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