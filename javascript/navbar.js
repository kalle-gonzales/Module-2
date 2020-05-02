const body            = document.getElementById("body"),
      login_modal     = document.getElementById("login_modal"),
      logout_modal    = document.getElementById("logout_modal"),
      welcome_modal   = document.getElementById("welcome_modal"),
      register_modal  = document.getElementById("register_modal"),
      nav_login       = document.getElementById("nav_login"),
      nav_login_text  = document.getElementById("nav_login_text"),
      nav_login_icon  = document.getElementById("nav_login_icon"),
      nav_logout      = document.getElementById("nav_logout"),
      nav_logout_text = document.getElementById("nav_logout_text"),
      nav_logout_icon = document.getElementById("nav_logout_icon"),
      nav_search      = document.getElementById("nav_search"),
      nav_search_text = document.getElementById("nav_search_text"),
      nav_search_icon = document.getElementById("nav_search_icon"),
      page_wrapper    = document.getElementById("page_wrapper"),
      username_taken  = document.getElementById("username_taken"),
      users           = JSON.parse(localStorage.getItem("users")),
      user_names      = Object.keys(users);

var showing_menu = false
let menu_items = ["add_recipe", "cookbook", "drink", "dessert", "haupt", "first"]

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

["nav_login", "nav_logout"].forEach(add_hover_listeners_login_logout);

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
  document.getElementById("login_btn").onclick = function() {
    // event.preventDefault();
    let input    = document.forms["login"],
        user     = input[1].value,
        password = input[2].value;
    if (user_names.includes(user) && users[user].password === password) {
      handle_login(user, users[user].admin);
    } else {
      document.getElementById("no_match").style.display = "block";
    }
  }

  document.getElementById("register_btn").onclick = () => {
    showModal(register_modal, "register_modal_close");
    let user_name_login    = document.getElementById("user_name_login").value,
        user_name_register = document.getElementById("register_username"),
        password           = document.getElementById("password_login").value;
    login_modal.style.display = "none";
    if (user_name_login != "") {
      user_name_register.value = user_name_login;
    };
    if (password != "") {
      document.getElementById("register_password").value = password;
    };

    user_name_register.oninput = () => {
      if (user_names.includes(user_name_register.value)) {
        username_taken.style.display = "inline-block";
      } else {
        username_taken.style.display = "none";
      }
    }
  };
});

nav_logout.addEventListener("click", function(){
  showModal(logout_modal, "logout_modal_close");
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == login_modal) {
    hideModal(login_modal);
  } else if (event.target == logout_modal) {
    hideModal(logout_modal);
  }
};

function handle_login(user, is_admin) {
  localStorage.setItem("logged_in_user",          JSON.stringify(user)    );
  localStorage.setItem("logged_in_user_is_admin", JSON.stringify(is_admin));
  show_welcome(user);
  nav_login.style.display  = "none";
  nav_logout.style.display = "inline";
}

function handle_logout() {
  localStorage.setItem("logged_in_user",          JSON.stringify(nil)    );
  localStorage.setItem("logged_in_user_is_admin", JSON.stringify(false));
  hideModal(logout_modal);
  nav_login.style.display  = "inline";
  nav_logout.style.display = "none";
}

function show_welcome(user) {
  hideModal(login_modal);
  document.getElementById("welcome_user").innerHTML  = user;
  showModal(welcome_modal, "welcome_modal_close");
  setTimeout(function() {hideModal(welcome_modal)}, 1000);
};

document.getElementById("yes").onclick = function() {
  handle_logout()
};

document.getElementById("no").onclick = function() {
  hideModal(logout_modal);
};

function showModal(modal, close_dom_id) {
  modal.style.display = "inline";
  page_wrapper.classList.add("grey_out");
  document.getElementById(close_dom_id).onclick = function() {
    hideModal(modal);
  };
}

function hideModal(modal) {
  modal.style.display = "none";
  page_wrapper.classList.remove("grey_out"); 
}

document.getElementById("register_form_btn").onclick = () => {
  let user     = {},
      name     = document.getElementById("register_username").value;
  if (!user_names.includes(name)) {
    user["name"]          = name;
    user["liked_recipes"] = [];
    user["notes"]         = [];
    user["email"]         = document.getElementById("register_email"   ).value;
    user["password"]      = document.getElementById("register_password").value;
    users[name] = user;
    localStorage.setItem("users", JSON.stringify(users));
    hideModal(register_modal);
    document.getElementById("welcome_user").innerHTML  = name;
    showModal(welcome_modal, "welcome_modal_close");
    setTimeout(function() {hideModal(welcome_modal)}, 1000);
    nav_login.style.display  = "none";
    nav_logout.style.display = "inline";
  }
}

/***********
 * preview *
 ***********/
// [...document.querySelectorAll("rezept_des_tages")].forEach(function (item) {
  Array.from(document.getElementsByClassName("rezept_des_tages")).forEach(function(item) {
    preview_add_hover_listeners(item);
});

function preview_add_hover_listeners(element) {
  element.addEventListener("mouseover", function(){
    document.getElementById("preview_" + element.id).style.visibility = "visible";
  });

  element.addEventListener("mouseout", function(){
    document.getElementById("preview_" + element.id).style.visibility = "hidden";
  });
}
