 
// var neeu = [];
// const addRecipe = (ev)=>{
//     ev.preventDefault(); //stop the form submitting
//     let add = {
//         name: document.getElementById('name').value,
//         type: document.getElementById('type').value,
//         severity: document.getElementById('severity').value,
//         ingrediants: document.getElementById('ingrediants').value,
//         description: document.getElementById('description').value
//     }
//     neeu.push(add)
//     document.forms[0].reset(); //clear form for next entries   
//     localStorage.setItem(1, JSON.stringify(neeu));
    
// }

// document.addEventListener('DOMContentLoaded', ()=>{
//     document.getElementById('btn').addEventListener('click', addRecipe);   
// }); 

// localStorage.setItem('Spagehtthi Bollo', JSON.stringify(Spagehtthi_Bollo));
// localStorage.setItem('Pilz', JSON.stringify(Spagehtthi_Bollo));
// localStorage.setItem('Pizza', JSON.stringify(Pizza));


function loadRecipe(){
    return fetch("/JSON_files/recipes.json")
    .then(function(response) {
        //console.log(response)
        return response.json()
    }).then(function(json) {
        //console.log('parsed json', json);
        return json;
    }).catch(function(ex) {
        //console.log('parsing failed', ex)
    })
}

async function getRecipes(){
    const recipes = await loadRecipe();
    return recipes

    //console.log(recipes)
    // localStorage.setItem('Recipes', JSON.stringify(recipes));
}

getRecipes()


const addRecipe = async (ev) => {
    ev.preventDefault(); //stop the form submitting
    const recipes = await getRecipes()
    let add = {
        name: document.getElementById('name').value,
        type: document.getElementById('type').value,
        severity: document.getElementById('severity').value,
        ingrediants: document.getElementById('ingrediants').value,
        description: document.getElementById('description').value
    }
    //var name_k = document.getElementById('name').value;

    //console.log(add)

    recipes.push(add)
    document.forms[0].reset(); //clear form for next entries   
    localStorage.setItem('recipes', JSON.stringify(recipes));
    
    var actual = JSON.parse(localStorage.getItem("recipes"));
    console.log(actual)  
}

document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('btn').addEventListener('click', addRecipe);
    //var actual = JSON.parse(localStorage.getItem(recipes));
}); 




//     var recipes =
// [
//   { 
//     "name": "Spagehtthi Bollo",
//     "base": "Noodles",
//     "type": "Hauptspeise",
//     "severity": 3.8,
//     "ingrediants": ["Spagetthi", "Tomaten"],
//     "description": "First you have to..."
//   },
//   {
//     "name": "Mushroom Risotto",
//     "base": "Rice",
//     "type": "Hauptspeise",
//     "severity": 4.5,
//     "ingredients": ["Pilze", "Reis"],
//     "description": "First you have to..."
//   },
//   {
//     "name": "Vodka Martini",
//     "base": "Vodka",
//     "type": "Drink",
//     "severity": 4.5,
//     "ingredients": ["Vodka", "Martini"],
//     "description": "First you have to..."
//   },
//   {
//     "name": "Tomatensuppe",
//     "base": "Tomaten",
//     "type": "Vorspeise",
//     "severity": 4.5,
//     "ingredients": ["Tomaten", "Wasser"],
//     "description": "First you have to..."
//   },
//   {
//     "name": "Spargelsuppe",
//     "base": "Spargel",
//     "type": "Vorspeise",
//     "severity": 4.5,
//     "ingredients": ["Spargel", "Wasser"],
//     "description": "First you have to..."
//   },
//   {
//     "name": "Bier",
//     "base": "Bier",
//     "type": "Drink",
//     "severity": 4.5,
//     "ingredients": ["Hefe", "Wasser", "Hopfen"],
//     "description": "First you have to..."
//   },
//   {
//     "name": "Mamorkuchen",
//     "base": "Teig",
//     "type": "Dessert",
//     "severity": 4.5,
//     "ingredients": ["Hefe", "Wasser", "Schoko"],
//     "description": "First you have to..."
//   },
//   {
//     "name": "Teramisu",
//     "base": "Teig",
//     "type": "Dessert",
//     "severity": 4.5,
//     "ingredients": ["Hefe", "Wasser", "KaFFEE"],
//     "description": "First you have to..."
//   }
// ];