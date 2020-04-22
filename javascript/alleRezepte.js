const btnAlle = document.getElementById("Alle");
const btnHauptspeise = document.getElementById("Hauptspeise");
const btnVorspeise = document.getElementById("Vorspeise");
const btnDessert = document.getElementById("Dessert");
const btnDrink = document.getElementById("Drink");

const alleRezepte = document.querySelectorAll(".rezept");

btnAlle.addEventListener("click", foodFilter);
btnHauptspeise.addEventListener("click", foodFilter);
btnVorspeise.addEventListener("click", foodFilter);
btnDessert.addEventListener("click", foodFilter);
btnDrink.addEventListener("click", foodFilter);


function foodFilter(event) {
    //console.log(event.target);
    const targetId = event.target.id;

    //console.log(alleRezepte)


    alleRezepte.forEach(function(rezept) {
        if (targetId === "Alle"){
            rezept.style.display = "block";
        } else if (rezept.dataset.kathegorie !== targetId) {
            rezept.style.display = "none";
        } else {
            rezept.style.display = "block";
        }
    });
    
}

recipes = [
    { 
      "name": "Spagehtthi Bollo",
      "base": "Noodles",
      "type": "Hauptspeise",
      "severity": 3.8,
      "ingrediants": ["Spagetthi", "Tomaten"],
      "description": "First you have to..."
    },
    {
      "name": "Mushroom Risotto",
      "base": "Rice",
      "type": "Hauptspeise",
      "severity": 4.5,
      "ingredients": ["Pilze", "Reis"],
      "description": "First you have to..."
    },
    {
      "name": "Vodka Martini",
      "base": "Vodka",
      "type": "Drink",
      "severity": 4.5,
      "ingredients": ["Vodka", "Martini"],
      "description": "First you have to..."
    },
    {
      "name": "Tomatensuppe",
      "base": "Tomaten",
      "type": "Vorspeise",
      "severity": 4.5,
      "ingredients": ["Tomaten", "Wasser"],
      "description": "First you have to..."
    },
    {
      "name": "Spargelsuppe",
      "base": "Spargel",
      "type": "Vorspeise",
      "severity": 4.5,
      "ingredients": ["Spargel", "Wasser"],
      "description": "First you have to..."
    },
    {
      "name": "Bier",
      "base": "Bier",
      "type": "Drink",
      "severity": 4.5,
      "ingredients": ["Hefe", "Wasser", "Hopfen"],
      "description": "First you have to..."
    },
    {
      "name": "Mamorkuchen",
      "base": "Teig",
      "type": "Dessert",
      "severity": 4.5,
      "ingredients": ["Hefe", "Wasser", "Schoko"],
      "description": "First you have to..."
    },
    {
      "name": "Teramisu",
      "base": "Teig",
      "type": "Dessert",
      "severity": 4.5,
      "ingredients": ["Hefe", "Wasser", "KaFFEE"],
      "description": "First you have to..."
    }
  ]

localStorage.setItem('recipes', JSON.stringify(recipes));

const deleteRecipe = (ev)=>{
   
  let recipe = JSON.parse(localStorage.getItem('recipes'));
  recipe.splice(7,1);
  localStorage.setItem('recipes', JSON.stringify(recipe));


   
  
}


document.addEventListener('DOMContentLoaded', ()=>{
   document.getElementsByClassName('delete').addEventListener('click', deleteRecipe);
   
}); 
