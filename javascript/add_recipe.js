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
      type                  = input[1].value,
      recipes               = JSON.parse(localStorage.getItem("recipes")),
      bases                 = JSON.parse(localStorage.getItem("base")),
      types                 = JSON.parse(localStorage.getItem(type)),
      recipe                = {},
      id                    = recipes.length,
      base                  = input[3].value;

  recipe["id"]          = id;
  recipe["name"]        = input[0].value;
  recipe["base"]        = base;
  recipe["type"]        = type;
  recipe["rating"]      = 0;
  recipe["time"]        = input[6].value;
  recipe["servings"]    = input[4].value;
  recipe["severity"]    = input[2].value;
  recipe["picture"]     = input[8].value;

  Array.from(input[5]).forEach(function(element){
    recipe["ingredients"].push(element.value);
  })

  Array.from(input[7]).forEach(function(element){
    recipe["descirption"].push(element.value);
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
      clone.id               = "input_box_" + category + (counter + 1);
      clone.childNodes[1].id = category + (counter + 1);
      clone.childNodes[3].id = category + "add_btn_" + (counter + 1);
      clone.childNodes[5].id = category + "remove_btn_" + (counter + 1);

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