<template>
	<div class="page-home container">
		<div class="page-home__search">
			<input
				v-model="search"
				class="page-home__search-input"
				type="text"
				placeholder="Введите имя покемона"
			/>
			<div v-if="search" class="page-home__search-box">
				<div
					class="page-home__search-box-item"
					v-for="(item, i) in pokemonsByName"
					:key="i"
					@click="$router.push({ name: 'page-details', params: { name: item.name } })"
				>
					{{ item.name }}
				</div>
			</div>
		</div>
		
		<div class="page-home__list">
			<template v-for="(pokemon, i) in GET_CURRENT_POKEMONS">
				<pokemon-preview
					v-if="i < GET_POKEMONS_COUNT"
					:key="i"
					:pokemonName="pokemon.name"
				/>
			</template>
		</div>
	</div>
</template>

<script>
import PokemonPreview from '@/components/PokemonPreview.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
	name: "page-home",
	components: { PokemonPreview },
	data: () => ({
		currentCount: 20,
		search: '',
	}),
	computed: {
		...mapGetters([
			'GET_ALL_POKEMONS',
			'GET_CURRENT_POKEMONS',
			'GET_POKEMONS_COUNT'
		]),
		pokemonsByName() {
			return this.GET_ALL_POKEMONS.filter(item => item.name.indexOf(this.search) !== -1)
		}
	},
	methods: {
		...mapActions([
			'ALL_POKEMONS_LINKS',
			'POKEMONS_BY_PAGE'
		]),
		addPokemons () {
			this.currentCount += 10
		},
		onWindowScroll () {
			let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
			if (bottomOfWindow && this.currentCount < this.GET_POKEMONS_COUNT) {
				this.addPokemons();
			}
		},
	},
	created () {
		this.ALL_POKEMONS_LINKS()
	},
	mounted () {
		if (!this.GET_CURRENT_POKEMONS.length) {
			this.POKEMONS_BY_PAGE([20, 0]);
		} else {
			this.currentCount = this.GET_CURRENT_POKEMONS.length
		}
		window.addEventListener("scroll", this.onWindowScroll, {passive: true});
	},
	destroyed () {
		window.removeEventListener('scroll', this.onWindowScroll, {passive: true});
	},
	watch: {
		currentCount: {
			handler (count) {
				if (count !== this.GET_CURRENT_POKEMONS.length && count < this.GET_POKEMONS_COUNT) {
					this.POKEMONS_BY_PAGE([count === 20 ? 20 : 10, count === 20 ? 0 : count - 10])
				}
			},
		}
	}
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables";

.page-home {
	&__list {
		margin-top: 3rem;
		margin-bottom: 1rem;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(112px, 1fr));
		gap: 16px;
	}
	&__search {
		position: relative;
		margin-top: 4rem;
		&-input {
			width: 100%;
			padding: 0.8125rem 1.5rem;
			font-family: $font-roboto;
			font-size: 0.75rem;
			line-height: 0.875;
			border: none;
			outline: none;
			border-radius: $border-rounded;
			box-shadow: $box-shadow-primary;
		}
		&-box {
			position: absolute;
			top: calc(100% + 0.2rem);
			left: 0;
			padding: 0.8125rem 0;
			width: 100%;
			background-color: $color-white;
			border-radius: $border-rounded;
			box-shadow: $box-shadow-primary;
			z-index: 2;
			&-item {
				padding: 0.25rem 1.5rem;
				cursor: pointer;
				&:hover {
					background-color: $button-primary-bg;
				}
			}
		}
	}
}

</style>