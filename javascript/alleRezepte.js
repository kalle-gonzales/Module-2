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