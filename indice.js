const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll('.nav-item');
const barraBuscar = document.querySelector(".barraBuscar");
const URL = "https://pokeapi.co/api/v2/pokemon/";

let allPokemon = []; // Variable para almacenar todos los Pokémon

const fetchPokemon = async () => {
    const pokemonPromises = [];

    for (let i = 1; i <= 1025; i++) {
        pokemonPromises.push(fetch(URL + i).then(response => response.json()));
    }

    allPokemon = await Promise.all(pokemonPromises);
    allPokemon.sort((a, b) => a.id - b.id); // Ordenar por ID
    return allPokemon;
}

const mostrarPokemon = (poke) => {
    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <p class="pokemon-id-back">#${pokeId}</p>
        <div class="pokemon-imagen">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${tipos}
            </div>
            <div class="pokemon-stats">
            </div>
        </div>
    `;

    // Añadir evento de clic al div
    div.addEventListener("click", () => {
        window.open(`datosPokemon.html?id=${poke.id}`, '_blank');
        window.close(); // Cerrar la ventana actual
    });

    listaPokemon.append(div);
}

const initializePokemon = async () => {
    await fetchPokemon();
    allPokemon.forEach(pokemon => mostrarPokemon(pokemon));
}

const filterPokemon = (criteria) => {
    listaPokemon.innerHTML = "";
    const filteredPokemon = allPokemon.filter(pokemon => {
        const tipos = pokemon.types.map(type => type.type.name);
        return tipos.some(tipo => tipo.includes(criteria));
    });
    filteredPokemon.forEach(pokemon => mostrarPokemon(pokemon));
}

const searchPokemon = (query) => {
    listaPokemon.innerHTML = "";
    const filteredPokemon = allPokemon.filter(pokemon => pokemon.name.toLowerCase().includes(query.toLowerCase()));
    filteredPokemon.forEach(pokemon => mostrarPokemon(pokemon));
}

initializePokemon();

botonesHeader.forEach(boton => boton.addEventListener("click", async (event) => {
    const botonClass = event.currentTarget.querySelector("button").className;
    if (botonClass === "ver-todos") {
        listaPokemon.innerHTML = "";
        allPokemon.forEach(pokemon => mostrarPokemon(pokemon));
    } else {
        filterPokemon(botonClass);
    }
}));

barraBuscar.addEventListener("input", (event) => {
    const query = event.target.value;
    searchPokemon(query);
});