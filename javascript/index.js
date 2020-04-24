let first   = getRandomRecipe("first"  ),
    main    = getRandomRecipe("main"   ),
    dessert = getRandomRecipe("dessert"),
    drink   = getRandomRecipe("drink"  ),
    output_Hauptspeise_otd = document.getElementById("text_daily_main"   ),
    output_Vorspeise_otd   = document.getElementById("text_daily_first"  ),
    output_Dessert_otd     = document.getElementById("text_daily_dessert"),
    output_Drink_otd       = document.getElementById("text_daily_drink"  );

output_Vorspeise_otd.innerHTML   = "Vorspeise: "   + first["name"];
output_Hauptspeise_otd.innerHTML = "Hauptspeise: " + main["name"]
output_Dessert_otd.innerHTML     = "Dessert: "     + dessert["name"]
output_Drink_otd.innerHTML       = "Drink: "       + drink["name"]

document.getElementById("daily_first"  ).style.backgroundImage = 'url("' + first.picture   + '")';
document.getElementById("daily_main"   ).style.backgroundImage = 'url("' + main.picture    + '")';
document.getElementById("daily_dessert").style.backgroundImage = 'url("' + dessert.picture + '")';
document.getElementById("daily_drink"  ).style.backgroundImage = 'url("' + drink.picture   + '")';

function getRandomRecipe(category) {
  let ids_in_category = JSON.parse(localStorage.getItem(category)),
      random_id       = ids_in_category[Math.floor(Math.random() * ids_in_category.length)]; //random returns a number x with 0 <= x < 1, so we need to adjust downward to stay within array range
  return JSON.parse(localStorage.getItem("recipes"))[random_id];
}