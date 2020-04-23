const btn_cookbook = document.getElementById("cookbook" ),
      btn_main     = document.getElementById("main"     ),
      btn_first    = document.getElementById("first"    ),
      btn_dessert  = document.getElementById("dessert"  ),
      btn_drink    = document.getElementById("drink"    ),
      alleRezepte  = document.querySelectorAll(".rezept");

btn_cookbook.addEventListener("click", foodFilter);
btn_main.    addEventListener("click", foodFilter);
btn_first.   addEventListener("click", foodFilter);
btn_dessert. addEventListener("click", foodFilter);
btn_drink.   addEventListener("click", foodFilter);

//LOAD.addEventlistener("onload", foodFilter);

let url =  window.location.href
if (url.includes("#")) {
  let filter = url.split("#")[1]; // is empty when there only is a # at the end of the url, which should not be happing, however we are safe anyways.
  alleRezepte.forEach(function(rezept) {
    if (filter === "cookbook"){
        rezept.style.display = "block";
    } else if (rezept.dataset.kathegorie !== filter) {
        rezept.style.display = "none";
    } else {
        rezept.style.display = "block";
    }
  });
}

// btn_cookbook.click();

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
    // if (!targetId){
        // targetId = localStorage.getItem("food_filter_id_from_index");
        // console.log(targetId)
    // } else {
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
    // }
}



// if (!localStorage.getItem("food_filter_id_from_index")):
//     targetId = localStorage.getItem("food_filter_id_from_index")