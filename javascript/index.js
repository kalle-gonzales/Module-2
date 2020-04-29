let first   = getRandomRecipe("first"  ),
    haupt   = getRandomRecipe("haupt"  ),
    dessert = getRandomRecipe("dessert"),
    drink   = getRandomRecipe("drink"  ),
    preview_first   = document.getElementById("preview_first_daily"  ),
    preview_haupt    = document.getElementById("preview_haupt_daily"   ),
    preview_dessert = document.getElementById("preview_dessert_daily"),
    preview_drink   = document.getElementById("preview_drink_daily"  ),
    icon_full_star  = '<i class="fa fa-star" aria-hidden="true"></i>',
    icon_half_star  = '<i class="fa fa-star-half-o" aria-hidden="true"></i>',
    icon_empty_star = '<i class="fa fa-star-o" aria-hidden="true"></i>';

document.getElementById("text_daily_first"  ).innerHTML = "Vorspeise: "   + first["name"];
document.getElementById("text_daily_haupt"   ).innerHTML = "Hauptspeise: " + haupt["name"]
document.getElementById("text_daily_dessert").innerHTML = "Dessert: "     + dessert["name"]
document.getElementById("text_daily_drink"  ).innerHTML = "Drink: "       + drink["name"]

document.getElementById("daily_first"  ).style.backgroundImage = 'url("' + first.picture   + '")';
document.getElementById("daily_haupt"   ).style.backgroundImage = 'url("' + haupt.picture    + '")';
document.getElementById("daily_dessert").style.backgroundImage = 'url("' + dessert.picture + '")';
document.getElementById("daily_drink"  ).style.backgroundImage = 'url("' + drink.picture   + '")';

getPreview(first["rating"], first["time"], preview_first);
getPreview(haupt["rating"], haupt["time"], preview_haupt);
getPreview(dessert["rating"], dessert["time"], preview_dessert);
getPreview(drink["rating"], drink["time"], preview_drink);

function getPreview(rating, time, preview_dom) {
  let num_full_stars  = Math.floor(rating),
      num_empty_stars = 5 - Math.ceil(rating),
      num_half_stars  = 5 - num_full_stars - num_empty_stars;

  preview_dom.innerHTML = icon_full_star.repeat(num_full_stars)   +
                          icon_half_star.repeat(num_half_stars)   +
                          icon_empty_star.repeat(num_empty_stars) +
                          '<i class="fa fa-clock-o" aria-hidden="true"></i>' + time;
}

function getRandomRecipe(category) {
  let ids_in_category = JSON.parse(localStorage.getItem(category)),
      random_id       = ids_in_category[Math.floor(Math.random() * ids_in_category.length)]; //random returns a number x with 0 <= x < 1, so we need to adjust downward to stay within array range
  return JSON.parse(localStorage.getItem("recipes"))[random_id];
}
