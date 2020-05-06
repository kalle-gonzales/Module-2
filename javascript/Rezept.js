let url1 =  window.location.href
if (url1.includes("?")) {
  var r_ID = url1.split("?")[1]; // is empty when there only is a # at the end of the url, which should not be happing, however we are safe anyways.
}

//Rezepte aus dem Local Storage laden
var allrecipes = JSON.parse(localStorage.getItem("recipes"));
var actual = allrecipes [r_ID];
var ing = actual.ingredients;
var ins = actual.description;
let numCallbackRuns = 0;


document.getElementById("name_r").textContent = actual.name;
document.getElementById("base").textContent = actual.base;
document.getElementById("sev").textContent = actual.severity;
document.getElementById("instructions").textContent = actual.description;
document.getElementById("time").textContent = actual.time;
document.getElementById("rating").textContent = actual.rating;

ing.forEach((element) => {
  document.getElementById("ing").textContent = ing;
  numCallbackRuns++
})

ins.forEach((element) => {
  document.getElementById("instructions").textContent = ins;
  numCallbackRuns++
})

document.getElementById('edit_r').href = "../html/edit.html?" + r_ID;
document.getElementById('delete_r').href = "../html/edit.html?" + r_ID;

const deleterecipe = (ev) => {
  delete allrecipes [r_ID];
  localStorage.setItem("recipes", JSON.stringify(allrecipes));
}

document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('delete_r').addEventListener('click', deleterecipe);
  //var actual = JSON.parse(localStorage.getItem(recipes));
}); 
