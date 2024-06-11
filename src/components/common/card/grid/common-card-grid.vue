<template>
	<common-card-container-component variant="flat" class="mx-auto">
		<template #card-img>
			<v-container fluid>
				<v-row dense class="image_grid">
					<v-col cols="12" md="4" class="ga-2 d-flex flex-column justify-start align-center" :key="index" v-for="(column, index) in grid.items">
						<template :key="index" v-for="(row, index) in column">
							<v-hover v-slot="{ isHovering, props }">
								<common-card-container-component
									hover
									class="d-flex justify-center align-center clickable"
									to="treatments"
									width="100%"
									:class="{ 'on-hover': isHovering }"
									:elevation="isHovering ? 6 : 2"
									:height="row.height"
									:image="row.image"
									v-bind="props"
								>
									<template #card-content>
										<v-expand-transition>
											<div class="d-flex transition-fast-in-fast-out v-card--reveal" v-if="isHovering">
												<common-btn-container-component 
													variant="flat" 
													:btn-text="grid.card.actions.buttons.seeTreatments.text">
												</common-btn-container-component>
											</div>
										</v-expand-transition>
									</template>
								</common-card-container-component>
							</v-hover>
						</template>
					</v-col>
				</v-row>
			</v-container>
		</template>
	</common-card-container-component>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import CardContainerComp from "@components/common/card/common-card.vue";
import BtnContainerComp from "@components/common/button/common-btn.vue";

export default defineComponent({
	name: "card-grid-container-component",
	components: {
		"common-card-container-component": CardContainerComp,
		"common-btn-container-component": BtnContainerComp
	},
	data() {
		return {
			grid: {
				items: [
					[ // First column in grid
						{ image: "temp_portfolio_2.jpg", height: 300 },
						{ image: "temp_portfolio_5.jpg", height: 800 },
						{ image: "temp_portfolio_1.jpg", height: 300 },
						{ image: "temp_portfolio_1.jpg", height: 800 }
					],
					[ // Second column in grid
						{ image: "temp_portfolio_3.jpg", height: 800 },
						{ image: "temp_portfolio_4.jpg", height: 300 },
						{ image: "temp_portfolio_1.jpg", height: 800 },
						{ image: "temp_portfolio_1.jpg", height: 300 }
					],
					[ // Third column in grid
						{ image: "temp_portfolio_5.jpg", height: 300 },
						{ image: "temp_portfolio_1.jpg", height: 800 },
						{ image: "temp_portfolio_3.jpg", height: 300 },
						{ image: "temp_portfolio_3.jpg", height: 800 }
					]
				],
				card: {
					actions: {
						buttons: {
							seeTreatments: {
								text: "See treatments?"
							}
						}
					}
				}
			}
		};
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
