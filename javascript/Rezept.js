//Rezepte aus dem Local Storage laden
//var i = 1;
var allrecipes = JSON.parse(localStorage.getItem("recipes"));
var actual = allrecipes [i];

document.getElementById("name_r").textContent = actual.name;
document.getElementById("sev").textContent = actual.severity;
document.getElementById("base").textContent = actual.base;
document.getElementById("ing").textContent = actual.ingrediants;
document.getElementById("instructions").textContent = actual.description;

