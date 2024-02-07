<template>
	<canvas-container-component :src="canvasIMG">
		<template #canvas-content>
			<v-container fluid class="pa-4 fill-height" style="border: 2px solid black">
				<v-row dense class="d-flex justify-center" style="border: 2px solid purple">
					<v-col cols="12" md="8" style="border: 2px solid orange">
						<card-container-component variant="flat" style="background-color: rgba(0, 0, 0, 0.3)">
							<template #card-headings>
								<v-card-item class="pa-4">
									<v-card-title class="text-wrap" style="border: 2px solid green">
										<h1>
											Where Beauty Radiates With Delicacy
										</h1>
									</v-card-title>
									<v-card-subtitle class="text-wrap" style="border: 2px solid blue">
										<h3>
											Transform your look with our non-invasive treatments for the face & body.
										</h3>
									</v-card-subtitle>
								</v-card-item>
							</template>	
							<template #card-actions>
								<v-card-actions class="pa-4" style="border: 2px solid red">
									<v-spacer></v-spacer>
									<v-btn variant="flat" size="large" color="accent" text="Book now"></v-btn>
								</v-card-actions>
							</template>
						</card-container-component>
					</v-col>
				</v-row>
			</v-container>
		</template>
	</canvas-container-component>
	<v-container fluid class="bg-accent" style="border: 4px solid red">
		<v-row dense style="border: 4px solid green">
			<v-col cols="12" style="border: 4px solid blue">
				<h2 style="border: 4px solid purple">
					Letting Beauty Take Flight So You Don't Have To
				</h2>
				<card-container-component variant="flat" class="mx-auto" style="border: 4px solid yellow">
					<template #card-img>
						<v-container fluid style="border: 4px solid red">
							<v-row dense style="border: 4px solid green">
								<v-col cols="12" md="4" class="ga-2 d-flex flex-column justify-start align-center">
									<v-card class="clickable" to="treatments" image="temp_portfolio_2.jpg" width="100%" height="300"></v-card>
									<v-card class="clickable" to="treatments" image="temp_portfolio_5.jpg" width="100%" height="800"></v-card>
									<v-card class="clickable" to="treatments" image="temp_portfolio_1.jpg" width="100%" height="300"></v-card>
									<v-card class="clickable" to="treatments" image="temp_portfolio_1.jpg" width="100%" height="800"></v-card>
								</v-col>
								<v-col cols="12" md="4" class="ga-2 d-flex flex-column justify-start align-center">
									<v-card class="clickable" to="treatments" image="temp_portfolio_3.jpg" width="100%" height="800"></v-card>
									<v-card class="clickable" to="treatments" image="temp_portfolio_4.jpg" width="100%" height="300"></v-card>
									<v-card class="clickable" to="treatments" image="temp_portfolio_1.jpg" width="100%" height="800"></v-card>
									<v-card class="clickable" to="treatments" image="temp_portfolio_1.jpg" width="100%" height="300"></v-card>
								</v-col>
								<v-col cols="12" md="4" class="ga-2 d-flex flex-column justify-start align-center">
									<v-card class="clickable" to="treatments" image="temp_portfolio_5.jpg" width="100%" height="300"></v-card>
									<v-card class="clickable" to="treatments" image="temp_portfolio_1.jpg" width="100%" height="800"></v-card>
									<v-card class="clickable" to="treatments" image="temp_portfolio_3.jpg" width="100%" height="300"></v-card>
									<v-card class="clickable" to="treatments" image="temp_portfolio_3.jpg" width="100%" height="800"></v-card>
								</v-col>
							</v-row>
						</v-container>
					</template>
				</card-container-component>
			</v-col>
		</v-row>
	</v-container>
	<h1>Heading 1</h1>
	<h2>Heading 2</h2>
	<h3>Heading 3</h3>
	<h4>Heading 4</h4>
	<h5>Heading 5</h5>
	<h6>Heading 6</h6>
	<p>p</p>
	<span>span</span>
	<div>div</div>
</template>

<script lang="ts">
/*
<div class="d-flex flex-wrap justify-space-evenly ga-auto" style="border: 4px solid black">
	<v-img cover src="temp_portfolio_1.jpg" min-width="400" max-width="400" min-height="600" max-height="600" style="border: 4px solid orange"></v-img>
	<v-img cover src="temp_portfolio_2.jpg" min-width="400" max-width="400" min-height="300" max-height="300" style="border: 4px solid orange"></v-img>
	<v-img cover src="temp_portfolio_3.jpg" min-width="400" max-width="400" min-height="300" max-height="800" style="border: 4px solid orange"></v-img>
	<v-img cover src="temp_portfolio_4.jpg" min-width="400" max-width="400" min-height="300" max-height="800" style="border: 4px solid orange"></v-img>
	<v-img cover src="temp_portfolio_5.jpg" min-width="400" max-width="400" min-height="300" max-height="800" style="border: 4px solid orange"></v-img>
	<v-img cover src="temp_portfolio_5.jpg" min-width="400" max-width="400" min-height="300" max-height="800" style="border: 4px solid orange"></v-img>
</div>
*/
import { defineComponent } from "vue";

// Components
import CanvasContainerComp from "@components/common/canvas/common-canvas.vue";
import CardContainerComp from "@components/common/card/common-card.vue";

// IMGs
import CanvasPNG from "@assets/jpg/temp.jpg";

export default defineComponent({
	name: "home-page-component",
	components: {
		"canvas-container-component": CanvasContainerComp,
		"card-container-component": CardContainerComp,
	},
	computed: {
		/* IMGs */
		canvasIMG(): string {
			return CanvasPNG;
		},
	},
});
</script>
