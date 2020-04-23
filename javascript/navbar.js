const body            = document.getElementById("body"),
      login_modal     = document.getElementById("login_modal" ),
      logout_modal    = document.getElementById("logout_modal"),
      nav_login       = document.getElementById("nav_login"),
      nav_login_text  = document.getElementById("nav_login_text"),
      nav_login_icon  = document.getElementById("nav_login_icon"),
      nav_logout      = document.getElementById("nav_logout"),
      nav_logout_text = document.getElementById("nav_logout_text"),
      nav_logout_icon = document.getElementById("nav_logout_icon"),
      nav_search      = document.getElementById("nav_search"),
      nav_search_text = document.getElementById("nav_search_text"),
      nav_search_icon = document.getElementById("nav_search_icon"),
      page_wrapper    = document.getElementById("page_wrapper");

var showing_menu = false
let menu_items = ["add_recipe", "cookbook", "drink", "dessert", "main", "first"]

document.getElementById("burger_menu").onclick = function(){
  showing_menu = !showing_menu;
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

nav_search.addEventListener("mouseover", function(){
  nav_search_icon.style.display = "none";
  nav_search_text.style.display = "inline";
});

nav_search.addEventListener("mouseout", function(){
  nav_search_icon.style.display = "inline";
  nav_search_text.style.display = "none";
});

// add listeners for hover and de-hover events to all menu_item
menu_items.forEach(function (item) {
  add_hover_listeners(item);
});

["nav_login", "nav_logout"].forEach(function (item) {
  add_hover_listeners_login_logout(item);
});

function add_hover_listeners(element) {
  document.getElementById(element).addEventListener("mouseover", function(){
    document.getElementById("menu_item_text_" + element).style.display = "inline";
    document.getElementById("menu_item_icon_" + element).style.color   = "var(--color_hover_nav_icon)";
  });
  document.getElementById(element).addEventListener("mouseout", function(){
    document.getElementById("menu_item_text_" + element).style.display = "none";
    document.getElementById("menu_item_icon_" + element).style.color   = "var(--color_normal_nav_icon)";
  });
}

function add_hover_listeners_login_logout(element) {
  document.getElementById(element).addEventListener("mouseover", function(){
    document.getElementById(element + "_text").style.display = "inline";
    document.getElementById(element + "_icon").style.color   = "var(--color_hover_nav_icon)";
  });

  document.getElementById(element).addEventListener("mouseout", function(){
    document.getElementById(element + "_text").style.display = "none";
    document.getElementById(element + "_icon").style.color   = "var(--color_normal_nav_icon)";

  });
}

/**********
 * modals *
 **********/

nav_login.addEventListener("click", function(){
  showModal(login_modal, "login_modal_close");
})
nav_logout.addEventListener("click", function(){
  showModal(logout_modal, "logout_modal_close");
})

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == login_modal) {
    hideModal(login_modal);
  } else if (event.target == logout_modal) {
    hideModal(logout_modal);
  }
}

Array.from(document.getElementsByClassName("submit_button")).forEach(function (item) {
  item.onclick = function() {
    hideModal(login_modal);
    nav_login.style.display = "none";
    nav_logout.style.display = "inline";
  }
})

document.getElementById("yes").onclick = function() {
  hideModal(logout_modal);
  nav_logout.style.display = "none";
  nav_login.style.display = "inline";
}

document.getElementById("no").onclick = function() {
  hideModal(logout_modal);
}

function showModal(modal, close_dom) {
  modal.style.display = "inline";
  page_wrapper.classList.add("grey_out");
  document.getElementById(close_dom).onclick = function() {
    hideModal(modal);
  };
}

function hideModal(modal) {
  modal.style.display = "none";
  page_wrapper.classList.remove("grey_out"); 
}



/***********
 * preview *
 ***********/

Array.from(document.getElementsByClassName("daily")).forEach(function (item) {
  preview_add_hover_listeners(item);
});

function preview_add_hover_listeners(element) {
  console.log(element)
  element.addEventListener("mouseover", function(){
    document.getElementById("preview_first").style.visibility = "visible";
  });

  element.addEventListener("mouseout", function(){
    document.getElementById("preview_first").style.visibility = "hidden";
  });
}
