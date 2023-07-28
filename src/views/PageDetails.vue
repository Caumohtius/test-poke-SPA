<template>
	<div class="page-details container">
		<div
			class="page-details__button button__primary"
			@click="$router.push({ name: 'page-home' })"
		>
			Назад
		</div>

		<div
			v-if="pokemon"
			class="page-details__card"
		>
			<img
				v-if="pokemon.sprites"
				:src="pokemon.sprites.front_default"
				:alt="pokemon.name"
				class="page-details__card-image"
			>
			<div v-else class="page-details__card-image-placeholder" />

			<div class="page-details__card-info">
				<div class="page-details__card-info-cell page-details__card-info-cell-1">
					<div class="page-details__card-caption">
						name
					</div>
					<div class="page-details__card-value">
						{{ pokemon.name }}
					</div>
				</div>
				<div
					v-for="(item, i) in pokemon.stats"
					:key="`${item.stat.name} + ${i}`"
					:class="`page-details__card-info-cell page-details__card-info-cell-${i+2}`"
				>
					<div class="page-details__card-caption">
						{{ item.stat.name }}
					</div>
					<div class="page-details__card-value">
						{{ item.base_stat }}
					</div>
				</div>
				<div v-if="pokemon.abilities" class="page-details__card-info-cell page-details__card-info-cell-8">
					<div class="page-details__card-caption">
						abilities
					</div>
					<div class="page-details__card-abilities">
						<div
							v-for="(item, i) in pokemon.abilities"
							:key="i"
							class="page-details__card-ability button__primary"
						>{{ item.ability.name }}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
	name: 'page-details',
	data: () => ({
		pokemon: null
	}),
	methods: {
		...mapActions([
			'FETCH_POKEMON_BY_NAME'
		])
	},
	created() {
		this.FETCH_POKEMON_BY_NAME(this.$route.params.name)
			.then((response) => {
				const pokemon = response.data;
				this.pokemon = pokemon;
			})
			.catch(err => console.log(err))
	},
	mounted() {
		
	}
}

</script>

<style lang="scss">
@import '@/assets/variables';

.page-details {
	&__button {
		margin-top: 4rem;
		width: 96px;
		text-align: center;
	}
	&__card {
		display: flex;
		align-items: flex-start;
		padding: 1.5rem 1rem;
		margin-top: 2rem;
		width: 100%;
		border-radius: $border-rounded;
		box-shadow: $box-shadow-primary;
		background-color: $color-white;
		&-image {
			display: block;
			width: 40%;
			min-width: 96px;
			margin-right: 1.5rem;
			flex-shrink: 0;
			&-placeholder {
				width: 40%;
				margin-right: 1.5rem;
				&::after {
					content: '';
					display: block;
					width: 100%;
					padding-top: 100%;
				}
			}
		}
		&-info {
			display: grid;
			flex-grow: 1;
			gap: 1rem;
			grid-auto-flow: dense;
			&-cell {
				width: auto;
				align-self: start;
				&-1 { grid-area: 1 / 1 / 2 / 4; }
				&-2 { grid-area: 2 / 1 / 3 / 2; }
				&-3 { grid-area: 3 / 1 / 4 / 2; } 
				&-4 { grid-area: 2 / 2 / 3 / 3; }
				&-5 { grid-area: 2 / 3 / 3 / 4; }
				&-6 { grid-area: 3 / 2 / 4 / 3; }
				&-7 { grid-area: 3 / 3 / 4 / 4; }
				&-8 { grid-area: 4 / 1 / 5 / 4; }
			}
		}
		&-caption {
			margin-bottom: 0.125rem;
			font-size: 0.75rem;
			font-weight: 500;
			color: $text-gray;
		}
		&-value {
			font-size: 1.3125rem;
			font-weight: 700;
			color: $text-dark;
			text-transform: capitalize;
		}
		&-abilities {
			display: flex;
			flex-wrap: wrap;
			margin: -0.25rem;
		}
		&-ability {
			margin: 0.25rem;
			pointer-events: none;
		}
	}
	@media (max-width: 485px) {
		&__card {
			flex-direction: column;
			&-image {
				align-self: center;
				width: 80%;
				margin-right: 0;
			}
		}
	}
}

</style>