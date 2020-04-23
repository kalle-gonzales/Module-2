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


var recipe = JSON.parse(localStorage.getItem('recipes'));
var name = recipe["0"].name;
document.getElementById('name').value = name;
var type = recipe["0"].type;
document.getElementById('type').value = type;
var severity = recipe["0"].severity;
document.getElementById('severity').value = severity;
var ingrediants = recipe["0"].ingrediants;
document.getElementById('ingrediants').value = ingrediants;
var description = recipe["0"].description;
document.getElementById('description').value = description;


//var edit = [];

const addRecipe = (ev)=>{
    ev.preventDefault(); //stop the form submitting
    let add = {
        name: document.getElementById('name').value,
        type: document.getElementById('type').value,
        severity: document.getElementById('severity').value,
        ingrediants: document.getElementById('ingrediants').value,
        description: document.getElementById('description').value
    }
    recipes["0"]=add;
    localStorage.setItem('recipes', JSON.stringify(recipes));
   

    
}


document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('btn').addEventListener('click', addRecipe);
    
}); 





