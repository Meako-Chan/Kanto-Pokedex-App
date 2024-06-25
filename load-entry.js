import {createAndAppendElement, setTypeBackgroundColor} from "./styling.js";

let currentPokemonId = null;

export function displayPokemonDetails(pokemon) {
    const { name, id, types, weight, height, abilities, stats } = pokemon;
    const capitalizePokemonName = capitalizeFirstLetter(name);
  
    document.querySelector("title").textContent = capitalizePokemonName;
  
    const detailMainElement = document.querySelector(".detail-main");
    detailMainElement.classList.add(name.toLowerCase());
  
    document.querySelector(".name-wrap .name").textContent =
      capitalizePokemonName;
  
    document.querySelector(
      ".pokemon-id-wrap .body2-fonts"
    ).textContent = `#${String(id).padStart(3, "0")}`;
  
    const imageElement = document.querySelector(".detail-img-wrapper img");
    imageElement.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
    imageElement.alt = name;
  
    const typeWrapper = document.querySelector(".power-wrapper");
    typeWrapper.innerHTML = "";
    types.forEach(({ type }) => {
      createAndAppendElement(typeWrapper, "p", {
        className: `body3-fonts type ${type.name}`,
        textContent: type.name,
      });
    });
  
    document.querySelector(
      ".pokemon-detail-wrap .pokemon-detail p.body3-fonts.weight"
    ).textContent = `${weight / 10}kg`;
    document.querySelector(
      ".pokemon-detail-wrap .pokemon-detail p.body3-fonts.height"
    ).textContent = `${height / 10}m`;
  
    const abilitiesWrapper = document.querySelector(
      ".pokemon-detail-wrap .pokemon-detail.move"
    );
    abilities.forEach(({ ability }) => {
      createAndAppendElement(abilitiesWrapper, "p", {
        className: "body3-fonts",
        textContent: ability.name,
      });
    });
  
    const statsWrapper = document.querySelector(".stats-wrapper");
    statsWrapper.innerHTML = "";
  
    const statNameMapping = {
      hp: "HP",
      attack: "ATK",
      defense: "DEF",
      "special-attack": "SP.ATK",
      "special-defense": "SP.DEF",
      speed: "SPD",
    };
  
    stats.forEach(({ stat, base_stat }) => {
      const statDiv = document.createElement("div");
      statDiv.className = "stats-wrap";
      statsWrapper.appendChild(statDiv);
  
      createAndAppendElement(statDiv, "p", {
        className: "body3-fonts stats",
        textContent: statNameMapping[stat.name],
      });
  
      createAndAppendElement(statDiv, "p", {
        className: "body3-fonts",
        textContent: String(base_stat).padStart(3, "0"),
      });
  
      createAndAppendElement(statDiv, "progress", {
        className: "progress-bar",
        value: base_stat,
        max: 100,
      });
    });
  
    setTypeBackgroundColor(pokemon);
  }


export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

export function getEnglishFlavorText(pokemonSpecies) {
    for (let entry of pokemonSpecies.flavor_text_entries) {
      if (entry.language.name === "en") {
        let flavor = entry.flavor_text.replace(/\f/g, " ");
        return flavor;
      }
    }
    return "";
  }