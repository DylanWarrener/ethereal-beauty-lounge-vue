<template>
	<v-container fluid>
		<v-row dense class="image_grid">
			<v-col
				cols="12"
				md="4"
				class="ga-2 d-flex flex-column justify-start align-center"
				:key="index"
				v-for="(column, index) in grid.items"
				style="border: 2px solid blue"
			>
				<template :key="index" v-for="(row, index) in column">
					<v-hover #default="{ isHovering, props }">
						<container-card
							class="d-flex justify-center align-center"
							width="100%"
							:is-hovering="isHovering"
							:elevation="isHovering ? 6 : 2"
							:height="row.height"
							:image="row.image"
							v-bind="props"
						>
							<template #card-information>
								<v-expand-transition>
									<div
										class="w-100 d-flex justify-center align-center transition-fast-in-fast-out v-card--reveal"
										v-if="isHovering"
									>
										<container-btn
											variant="flat"
											:text="computed_text_section_card_actions_btnSeeTreatments"
										></container-btn>
									</div>
								</v-expand-transition>
							</template>
						</container-card>
					</v-hover>
				</template>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Constants
import { CONST_OBJECT_IDS_SECTION_BUTTONS } from "@constants/common/objects/common-constants-objects.js";

export default defineComponent({
	name: "card-grid-container-component",
	data() {
		return {
			grid: {
				items: [
					[
						// First column in grid
						{ image: "temp_portfolio_2.jpg", height: 300 },
						{ image: "temp_portfolio_5.jpg", height: 800 },
						{ image: "temp_portfolio_1.jpg", height: 300 },
						{ image: "temp_portfolio_1.jpg", height: 800 },
					],
					[
						// Second column in grid
						{ image: "temp_portfolio_3.jpg", height: 800 },
						{ image: "temp_portfolio_4.jpg", height: 300 },
						{ image: "temp_portfolio_1.jpg", height: 800 },
						{ image: "temp_portfolio_1.jpg", height: 300 },
					],
					[
						// Third column in grid
						{ image: "temp_portfolio_5.jpg", height: 300 },
						{ image: "temp_portfolio_1.jpg", height: 800 },
						{ image: "temp_portfolio_3.jpg", height: 300 },
						{ image: "temp_portfolio_3.jpg", height: 800 },
					],
				],
				card: {
					actions: {
						buttons: {
							seeTreatments: {
								text: "See treatments?",
							},
						},
					},
				},
			},
		};
	},
	computed: {
		computed_text_section_card_actions_btnSeeTreatments(): string {
			return this.grid.card.actions.buttons.seeTreatments.text;
		},
	},
});
</script>

<style scoped lang="scss">
.image_grid {
	.v-card {
		transition: opacity 0.4s ease-in-out;
	}

	.v-card:not(.on-hover) {
		opacity: 0.6;
	}
}
</style>
