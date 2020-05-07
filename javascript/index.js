let icon_half_star    = '<i class="fa fa-star-half-o"  aria-hidden="true"></i>',
    icon_full_star    = '<i class="fa fa-star"         aria-hidden="true"></i>',
    icon_empty_star   = '<i class="fa fa-star-o"       aria-hidden="true"></i>',
    heart_empty_class = 'class="fa like fa-heart-o"',
    heart_full_class  = 'class="fa like fa-heart"',
    logged_in_user    = JSON.parse(localStorage.getItem("logged_in_user")),
    [first,   first_heart  ] = getRandomRecipe("first"  ),
    [haupt,   haupt_heart  ] = getRandomRecipe("haupt"  ),
    [dessert, dessert_heart] = getRandomRecipe("dessert"),
    [drink,   drink_heart  ] = getRandomRecipe("drink"  ),
    preview_first   = document.getElementById("preview_first_daily"  ),
    preview_haupt   = document.getElementById("preview_haupt_daily"  ),
    preview_dessert = document.getElementById("preview_dessert_daily"),
    preview_drink   = document.getElementById("preview_drink_daily"  );


document.getElementById("text_daily_first"  ).innerHTML = "Vorspeise: "   + first["name"  ] + first_heart;
document.getElementById("text_daily_haupt"  ).innerHTML = "Hauptspeise: " + haupt["name"  ] + haupt_heart;
document.getElementById("text_daily_dessert").innerHTML = "Dessert: "     + dessert["name"] + dessert_heart;
document.getElementById("text_daily_drink"  ).innerHTML = "Drink: "       + drink["name"  ] + drink_heart;

document.getElementById("daily_first"  ).style.backgroundImage = `url("${first.picture}  ")`;
document.getElementById("daily_haupt"  ).style.backgroundImage = `url("${haupt.picture}  ")`;
document.getElementById("daily_dessert").style.backgroundImage = `url("${dessert.picture}")`;
document.getElementById("daily_drink"  ).style.backgroundImage = `url("${drink.picture}  ")`;

getPreview(first["rating"],   first["time"],   preview_first);
getPreview(haupt["rating"],   haupt["time"],   preview_haupt);
getPreview(dessert["rating"], dessert["time"], preview_dessert);
getPreview(drink["rating"],   drink["time"],   preview_drink);

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
      random_id       = ids_in_category[Math.floor(Math.random() * ids_in_category.length)], //random returns a number x with 0 <= x < 1, so we need to adjust downward to stay within array range
      heart_html;
  if(logged_in_user && JSON.parse(localStorage.getItem("users"))[logged_in_user]["liked_recipes"].includes(random_id)) {
    heart_html = heart_full_class;
  } else {
    heart_html = heart_empty_class;
  }
  return [JSON.parse(localStorage.getItem("recipes"))[random_id], `<i ${heart_html} id='${random_id}' aria-hidden="true"></i>`];
}


if (logged_in_user) {
  let local_users   = JSON.parse(localStorage.getItem("users")),
      user          = local_users[logged_in_user],
      liked_recipes = user["liked_recipes"];
  // [...document.querySelectorAll("like")].forEach(function(item) {
  Array.from(document.getElementsByClassName("like")).forEach(function(item) {
    item.onclick = function(event){
      let recipe_id = parseInt(item.id),
          index = liked_recipes.indexOf(recipe_id);
      event.stopPropagation();
      item.classList.toggle("fa-heart");
      item.classList.toggle("fa-heart-o");

      if (index >= 0) {
        liked_recipes.splice(index, 1);
        if (Object.keys(user["notes"]).includes(recipe_id)) {
          let notes = user["notes"];
          delete notes[recipe_id];
          local_users[JSON.parse(localStorage.getItem("logged_in_user"))]["notes"] = notes;
        }
      } else {
        liked_recipes.push(recipe_id);
      }
      // liked_recipes was updated and needs to be written to local_users
      local_users[JSON.parse(localStorage.getItem("logged_in_user"))]["liked_recipes"] = liked_recipes;
      localStorage.setItem("users", JSON.stringify(local_users));
    };
  });
}