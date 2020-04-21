var showing_menu = false
let menu_items = ["add_recipe", "cookbook", "drinks", "main", "first"]
// let menu_items = ["add_recipe"]//, "menu_cookbook"]//, "menu_drinks"]//, "menu_main"]//, "menu_first"]
// let menu_items = ["menu_first"]//, "menu_main"]//, "menu_first"]

document.getElementById("burger_menu").onclick = function(){
  showing_menu = !showing_menu;
  console.log(showing_menu);
  document.getElementById("menu").classList.toggle("show");
  if (showing_menu) {
    menu_items.forEach(function (item) {
      document.getElementById(item).classList.add("slidein_" + item);
    });
  } else {
    menu_items.forEach(function (item) {
      document.getElementById(item).classList.remove("slidein_" + item);
    });
  }
};

document.getElementById("login").onclick = function(){
  this.style.display = "none";
  document.getElementById("logout").style.display = "inline";
};

document.getElementById("logout").onclick = function(){
  this.style.display = "none";
  document.getElementById("login").style.display = "inline";
};

document.getElementById("search").addEventListener("mouseover", function(){
  document.getElementById("search_text").style.display = "inline";
  document.getElementById("search_icon").style.display = "none";
});

document.getElementById("search").addEventListener("mouseout", function(){
  document.getElementById("search_text").style.display = "none";
  document.getElementById("search_icon").style.display = "inline";

});

// add listeners for hover and de-hover events to all menu_item
menu_items.forEach(function (item) {
  add_hover_listeners(item);
});

["login", "logout"].forEach(function (item) {
  add_hover_listeners_login_logout(item);
});

function add_hover_listeners(element) {
  document.getElementById(element).addEventListener("mouseover", function(){
    document.getElementById("menu_item_text_" + element).style.display = "inline";
    document.getElementById("menu_item_icon_" + element).style.color   = "var(--color_hover_nav_text)";
  });
  document.getElementById(element).addEventListener("mouseout", function(){
  document.getElementById("menu_item_text_" + element).style.display = "none";
  document.getElementById("menu_item_icon_" + element).style.color   = "var(--color_normal_nav_text)";
  });
}

function add_hover_listeners_login_logout(element) {
  document.getElementById(element).addEventListener("mouseover", function(){
    document.getElementById(element + "_text").style.display = "inline";
  });

  document.getElementById(element).addEventListener("mouseout", function(){
    document.getElementById(element + "_text").style.display = "none";
  });
}