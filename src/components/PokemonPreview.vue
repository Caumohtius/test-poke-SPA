<template>
	<div class="pokemon-preview">
		<img
			v-if="currentPokemon && currentPokemon.sprites"
			class="pokemon-preview__image"
			:src="currentPokemon.sprites.front_default"
			:alt="pokemonName"
		>
		<div v-else class="pokemon-preview__image-placeholder"/>

		<div class="pokemon-preview__name">
			{{ pokemonName }}
		</div>

		<div
			class="pokemon-preview__button button__primary"
			@click="goToDetails"
		>
			подробнее
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
	name: 'pokemon-preview',
	props: {
		pokemonName: String,
	},
	data: () => ({
		currentPokemon: null
	}),
	created() {
		this.FETCH_POKEMON_BY_NAME(this.pokemonName)
			.then((response) => {
				const pokemon = response.data;
				this.currentPokemon = pokemon;
			})
			.catch(err => console.log(err))
	},
	mounted() {

	},
	methods: {
		...mapActions([
			'FETCH_POKEMON_BY_NAME'
		]),
		goToDetails() {
			this.$router.push({ name: 'page-details', params: { name: this.pokemonName } })
		}
	},
	computed: {

	},
}
</script>

<style lang="scss">
@import "@/assets/variables";

.pokemon-preview {
	display: flex;
	flex-direction: column;
	padding: 8px;
	width: 100%;
	min-height: 180px;
	background-color: $color-white;
	border-radius: $border-rounded;
	box-shadow: $box-shadow-primary;
	text-align: center;
	&__image {
		display: block;
		margin: 0 auto;
		width: 96px;
		height: 96px;
		&-placeholder {
			width: 96px;
			height: 96px;
		}
	}
	&__name {
		margin-bottom: 1rem;
		max-height: 2.3em;
		font-weight: 500;
		font-size: 1rem;
		text-align: center;
		text-transform: capitalize;
		overflow: hidden;
	}
	&__button {
		margin-top: auto;
		margin-bottom: 16px;
	}
}

</style>