document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}`;

    try {
        const response = await fetch(URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const pokemon = await response.json();

        // Mostrar información del Pokémon
        document.getElementById('pokemon-name').textContent = pokemon.name;
        document.getElementById('pokemon-image').src = pokemon.sprites.other["official-artwork"].front_default;
        document.getElementById('pokemon-id').textContent = `${pokemon.id}`;
        document.getElementById('pokemon-types').innerHTML = pokemon.types.map(type => `<p class="${type.type.name} tipo">${type.type.name}</p>`).join('');
        document.getElementById('pokemon-height').textContent = `${pokemon.height / 10} m`;
        document.getElementById('pokemon-weight').textContent = `${pokemon.weight / 10} kg`;
        document.getElementById('pokemon-abilities').innerHTML = pokemon.abilities.map(ability => `<p>${ability.ability.name}</p>`).join('');
        document.getElementById('pokemon-base-stats').innerHTML = pokemon.stats.map(stat => `<p>${stat.stat.name}: ${stat.base_stat}</p>`).join('');
        document.getElementById('pokemon-moves').innerHTML = pokemon.moves.map(move => `<p>${move.move.name}</p>`).join('');
        document.getElementById('pokemon-sprites').innerHTML = `
            <img src="${pokemon.sprites.front_default}" alt="Front Default">
            <img src="${pokemon.sprites.back_default}" alt="Back Default">
            <img src="${pokemon.sprites.front_shiny}" alt="Front Shiny">
            <img src="${pokemon.sprites.back_shiny}" alt="Back Shiny">
        `;
    } catch (error) {
        console.error("Failed to fetch Pokémon data: ", error);
    }

    // Añadir evento al botón "Volver"
    document.getElementById('volver').addEventListener('click', () => {
        window.open('indice.html', '_blank'); 
        window.close(); 
    });
});