export const POKEMONS = 'pokemon?limit=100000&offset=0';
export const POKEMONS_ON_PAGE = (limit, offset) => `pokemon?limit=${limit}&offset=${offset}`;
export const POKEMON_BY_NAME = (name) => `pokemon/${name}`;