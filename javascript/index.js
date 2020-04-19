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
        const data = await loadRecipe();
        console.log(data[0]["ingrediants"]);
        numberRezepte = data.length;

        // const Liste_Hauptspeisen = 
        // const Liste_Vorspeise =
        // Liste_Dessert =
        // Liste_Drink =

        const output_Hauptspeise_otd = document.getElementById("output_Hauptspeise_otd")
        const output_Vorspeise_otd = document.getElementById("output_Vorspeise_otd")
        const output_Dessert_otd = document.getElementById("output_Dessert_otd")
        const output_Drink_otd = document.getElementById("output_Drink_otd")


        output_Hauptspeise_otd.innerHTML = data[0]["name"]
        output_Vorspeise_otd.innerHTML = data[3]["name"]
        output_Dessert_otd.innerHTML = data[6]["name"]
        output_Drink_otd.innerHTML = data[2]["name"]

    }

    getRecipes();



// const output_Hauptspeise_otd = document.getElementById("output_Hauptspeise_otd")
// const output_Vorspeise_otd = document.getElementById("output_Vorspeise_otd")
// const output_Dessert_otd = document.getElementById("output_Dessert_otd")
// const output_Drink_otd = document.getElementById("output_Drink_otd")


// output_Hauptspeise_otd.innerHTML = recipes.name
// output_Vorspeise_otd.innerHTML = recipes.name
// output_Dessert_otd.innerHTML = recipes.name
// output_Drink_otd.innerHTML = recipes.name




