const btncookbok = document.getElementById("cookbook");
const btnHauptspeise = document.getElementById("main");
const btnVorspeise = document.getElementById("first");
const btnDessert = document.getElementById("dessert");
const btnDrink = document.getElementById("drink");

const alleRezepte = document.querySelectorAll(".rezept");

btncookbok.addEventListener("click", foodFilter);
btnHauptspeise.addEventListener("click", foodFilter);
btnVorspeise.addEventListener("click", foodFilter);
btnDessert.addEventListener("click", foodFilter);
btnDrink.addEventListener("click", foodFilter);

//LOAD.addEventlistener("onload", foodFilter);

let targetId = localStorage.getItem("food_filter_id_from_index");

// function foodFilter_from_index(){
//     console.log(targetId);
//     if (!targetId) {
//         alleRezepte.forEach(function(rezept) {
//             if (targetId === "Alle"){
//                 rezept.style.display = "block";
//             } else if (rezept.dataset.kathegorie != targetId) {
//                 rezept.style.display = "none";
//             } else {
//                 rezept.style.display = "block";
//             }
//         });
//     }
// }

// foodFilter(window.onload)

function foodFilter(event) {
    if (!targetId){
        targetId = localStorage.getItem("food_filter_id_from_index");
        console.log(targetId)
    } else {
        //console.log(event.target);
        targetId = event.target.dataset.kathegorie;
        //console.log(targetId)
        localStorage.setItem("food_filter_id_from_index", targetId);
        //console.log(alleRezepte)
        //console.log

        alleRezepte.forEach(function(rezept) {
        if (targetId === "cookbook"){
            rezept.style.display = "block";
        } else if (rezept.dataset.kathegorie !== targetId) {
            rezept.style.display = "none";
        } else {
            rezept.style.display = "block";
        }
        });
    }
}



// if (!localStorage.getItem("food_filter_id_from_index")):
//     targetId = localStorage.getItem("food_filter_id_from_index")