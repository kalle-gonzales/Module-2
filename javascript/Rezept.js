let url1 =  window.location.href
if (url1.includes("?")) {
  var save = url1.split("?")[1]; // is empty when there only is a # at the end of the url, which should not be happing, however we are safe anyways.
}

//Rezepte aus dem Local Storage laden
var allrecipes = JSON.parse(localStorage.getItem("recipes"));
var actual = allrecipes [ab];

document.getElementById("name_r").textContent = actual.name;
document.getElementById("base").textContent = actual.base;
document.getElementById("sev").textContent = actual.severity;
document.getElementById("ing").textContent = actual.ingrediants;
document.getElementById("instructions").textContent = actual.description;


