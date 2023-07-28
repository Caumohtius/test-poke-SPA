import Vue from "vue";
import Vuex from "vuex";
import axiosInstance from '@/api/index'
import { POKEMONS, POKEMONS_ON_PAGE, POKEMON_BY_NAME,  } from '@/api/routes'

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		allPokemonUrls: [],
		pokemonUrls: [],
		pokemonCount: 0,
	},
	getters: {
		GET_CURRENT_POKEMONS(state) {
			const currentPokemons = state.pokemonUrls;
			if (currentPokemons) {
				return currentPokemons
			}
			return null
		},
		GET_ALL_POKEMONS(state) {
			const currentPokemons = state.allPokemonUrls;
			if (currentPokemons) {
				return currentPokemons
			}
			return null
		},
		GET_POKEMONS_COUNT(state) {
			return state.pokemonCount
		},
	},
	mutations: {
		SET_POKEMONS(state, { pokemons }) {
			Vue.set(state.pokemonUrls, pokemons);
			state.allPokemonUrls = pokemons;
		},
		SET_POKEMONS_COUNT(state, { count }) {
			state.pokemonCount = count;
		},
		ADD_POKEMONS_URLS(state, { pokemons }) {
			if (state.pokemonCount > state.pokemonUrls.length) {
				state.pokemonUrls.push(...pokemons);
			}
		},
	},
	actions: {
		ALL_POKEMONS_LINKS({commit}) {
			return axiosInstance.get(POKEMONS)
				.then(({data}) => {
					const { results } = data;
					commit('SET_POKEMONS', { pokemons: results })
					return data
				})
				.catch(err => console.log(err))
		},
		POKEMONS_BY_PAGE({commit}, [ limit, offset ]) {
			return axiosInstance.get(POKEMONS_ON_PAGE(limit, offset))
				.then((response) => {
					const { results } = response.data;
					commit('SET_POKEMONS_COUNT', { count: response.data.count });
					commit('ADD_POKEMONS_URLS', { pokemons: results });
					return response.data
				})
				.catch(err => console.log(err))
		},
		FETCH_POKEMON_BY_NAME(_, name) {
			return axiosInstance.get(POKEMON_BY_NAME(name))
		}
	},
	modules: {},
});
