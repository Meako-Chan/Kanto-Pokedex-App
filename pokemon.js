import { handleSearch, clearSearch, displayPokemon, redirectToPokemon} from "./search.js";      

//Constant for max pokemon retrieved from API 
const MAX_POKEMON = 493;
const listWrapper = document.querySelector(".list-wrapper");

//Search and filters
let searchInput = document.querySelector("#search-input");
let numberFilter = document.querySelector("#number");
let nameFilter = document.querySelector("#name");
let notFoundMessage = document.querySelector("#not-found-message");


let pokemon_data = [];
// Fetch first 493 pokemon
fetch(`https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}`)
.then((response) => response.json())
.then((data) =>{
    //Save all 493 pokemon to pokemon_data
    pokemon_data = data.results;
    displayPokemon(pokemon_data);
})


                     
searchInput.addEventListener("keyup", handleSearch);


const closeButton = document.querySelector(".search-close-icon");
closeButton.addEventListener("click", clearSearch);

