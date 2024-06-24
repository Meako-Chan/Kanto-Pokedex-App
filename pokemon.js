//Constant for max pokemon retrieved from API 
const MAX_POKEMON = 151;
const listWrapper = document.querySelector(".list-wrapper");

//Search and filters
let searchInput = document.querySelector("#search-input");
let numberFilter = document.querySelector("#number");
let nameFilter = document.querySelector("#name");
let notFoundMessage = document.querySelector("#not-found-message");

let pokemon_data = [];
// Fetch first 151 pokemon
fetch(`https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}`)
.then((response) => response.json())
.then((data) =>{
    //Save all 151 pokemon to pokemon_data
    pokemon_data = data.results;
    console.log(pokemon_data)
})