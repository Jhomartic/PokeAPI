const listaPokemon = document.querySelector("#listaPokemon");
let POKEAPI_URL = "https://pokeapi.co/api/v2/pokemon/";
let TOTAL_POKEMONS = 150;
const botonesTipos = document.querySelectorAll('.btn');


async function ObtenerPokemon(id) {
    try {
        const response = await fetch(POKEAPI_URL + id);
        const data = await response.json();
        return data

    } catch (error) {
        console.error(`Error al obtener el Pokémon con id ${id}`, error);
    }
}

function mostrarPokemon(pokemon) {
    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
    <p class="pokemon-id-back">#${pokemon.id}</p>
        <div class="pokemon-imagen">
            <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokemon.id}</p>
                <p class="pokemon-nombre">${pokemon.name}</p>
            </div>
            <div class="pokemon-tipos">
            ${pokemon.types.map(type => `<p class="${type.type.name} tipo">${type.type.name.toUpperCase()}</p>`).join('')}
            </div>
            <div class="pokemon-stats">
                 <div class="stat">${pokemon.height}m</div>
                <div class="stat">${pokemon.weight}kg</div>
            </div>
        </div>
    `;
    listaPokemon.append(div);
}


async function cargarPokemons(filtroTipo = "ver-todos") {
    listaPokemon.innerHTML = ``;

    for(let i = 1; i < TOTAL_POKEMONS; i++){
        const pokemon = await ObtenerPokemon(i)
        const types = pokemon.types.map(type => type.type.name);

        if(filtroTipo === "ver-todos" || types.includes(filtroTipo)){
            mostrarPokemon(pokemon)
        }
    }
}

botonesTipos.forEach(btn => btn.addEventListener('click', (e) => {
    const botonId = e.currentTarget.id;
    cargarPokemons(botonId);
}))

cargarPokemons();
