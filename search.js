
const MAX_POKEMON = 493;
const listWrapper = document.querySelector(".list-wrapper");
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


export function handleSearch(){
    const searchValue = searchInput.value.toLowerCase();
    let filteredPokemon;

    if(numberFilter.checked) {
        filteredPokemon = pokemon_data.filter((pokemon) =>{
            const pokemonID = pokemon.url.split("/")[6];
            return pokemonID.startsWith(searchValue)
        });
    } else if(nameFilter.checked) {
        filteredPokemon = pokemon_data.filter((pokemon) =>
            pokemon.name.toLowerCase().startsWith(searchValue)
        );
    }else{
        filteredPokemon = pokemon_data;
    }
    displayPokemon(filteredPokemon);
    if(filteredPokemon.length === 0){
        notFoundMessage.style.display = "block";
    }else{
        notFoundMessage.style.display = "none";
    }
}

export function clearSearch(){
    searchInput.value = "";  
    displayPokemon(pokemon_data);
    notFoundMessage.style.display = 'none';
} 

export function displayPokemon(pokemon) {
    //Clear inner HTML to avoid duplicates on page
    listWrapper.innerHTML= ""; 

    pokemon.forEach((pokemon) => {
        const pokemonID = pokemon.url.split("/")[6];
        const listItem = document.createElement('div');
        listItem.className = 'list-item';
        listItem.innerHTML = `
        <div class="number-wrap">
            <p class="caption-fonts">#${pokemonID}</p>
        </div>
        <div class="img-wrap">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonID}.png" 
            alt="${pokemon.name}" />
        </div>
        <div class="name-wrap">
            <p> ${pokemon.name}</p>
        </div>
        `
        listItem.addEventListener("click", async () => {
           const success = await redirectToPokemon(pokemonID);
           if(success){
                window.location.href =  `./entry.html?id=${pokemonID}`;
           } 
        });
        //Append list item to listWrapper
        listWrapper.appendChild(listItem);
    })
}

export async function redirectToPokemon(id){
    try{
        const[pokemon,pokemonSpecies] = await Promise
        .all([fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => 
            res.json()
        ),
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => 
            res.json()
        ),
    ])
    return true;
    }catch (error){
        console.error("Failed to redirect to Pokemon!");
    }
}