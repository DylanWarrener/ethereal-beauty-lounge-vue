<template>
	<card-container-component variant="flat" class="mx-auto">
		<template #card-img>
			<v-container fluid>
				<v-row dense class="image_grid">
					<v-col cols="12" md="4" class="ga-2 d-flex flex-column justify-start align-center">
						<v-hover v-slot="{ isHovering, props }">
							<v-card
								hover
								class="d-flex justify-center align-center clickable"
								to="treatments"
								image="temp_portfolio_2.jpg"
								width="100%"
								height="300"
								:class="{ 'on-hover': isHovering }"
								:elevation="isHovering ? 12 : 2"
								v-bind="props"
							>
								<v-expand-transition>
									<div class="d-flex transition-fast-in-fast-out v-card--reveal" v-if="isHovering">
										<v-btn variant="flat" size="large" color="accent" text="See treatments"></v-btn>
									</div>
								</v-expand-transition>
							</v-card>
						</v-hover>
						<v-hover v-slot="{ isHovering, props }">
							<v-card
								hover
								class="d-flex justify-center align-center clickable"
								to="treatments"
								image="temp_portfolio_5.jpg"
								width="100%"
								height="800"
								:class="{ 'on-hover': isHovering }"
								:elevation="isHovering ? 12 : 2"
								v-bind="props"
							>
								<v-expand-transition>
									<div class="d-flex transition-fast-in-fast-out v-card--reveal" v-if="isHovering">
										<v-btn variant="flat" size="large" color="accent" text="See treatments"></v-btn>
									</div>
								</v-expand-transition>
							</v-card>
						</v-hover>
						<v-hover v-slot="{ isHovering, props }">
							<v-card
								hover
								class="d-flex justify-center align-center clickable"
								to="treatments"
								image="temp_portfolio_1.jpg"
								width="100%"
								height="300"
								:class="{ 'on-hover': isHovering }"
								:elevation="isHovering ? 12 : 2"
								v-bind="props"
							>
								<v-expand-transition>
									<div class="d-flex transition-fast-in-fast-out v-card--reveal" v-if="isHovering">
										<v-btn variant="flat" size="large" color="accent" text="See treatments"></v-btn>
									</div>
								</v-expand-transition>
							</v-card>
						</v-hover>
						<v-hover v-slot="{ isHovering, props }">
							<v-card
								hover
								class="d-flex justify-center align-center clickable"
								to="treatments"
								image="temp_portfolio_1.jpg"
								width="100%"
								height="800"
								:class="{ 'on-hover': isHovering }"
								:elevation="isHovering ? 12 : 2"
								v-bind="props"
							>
								<v-expand-transition>
									<div class="d-flex transition-fast-in-fast-out v-card--reveal" v-if="isHovering">
										<v-btn variant="flat" size="large" color="accent" text="See treatments"></v-btn>
									</div>
								</v-expand-transition>
							</v-card>
						</v-hover>
					</v-col>
					<v-col cols="12" md="4" class="ga-2 d-flex flex-column justify-start align-center">
						<v-hover v-slot="{ isHovering, props }">
							<v-card
								hover
								class="d-flex justify-center align-center clickable"
								to="treatments"
								image="temp_portfolio_3.jpg"
								width="100%"
								height="800"
								:class="{ 'on-hover': isHovering }"
								:elevation="isHovering ? 12 : 2"
								v-bind="props"
							>
								<v-expand-transition>
									<div class="d-flex transition-fast-in-fast-out v-card--reveal" v-if="isHovering">
										<v-btn variant="flat" size="large" color="accent" text="See treatments"></v-btn>
									</div>
								</v-expand-transition>
							</v-card>
						</v-hover>
						<v-hover v-slot="{ isHovering, props }">
							<v-card
								hover
								class="d-flex justify-center align-center clickable"
								to="treatments"
								image="temp_portfolio_4.jpg"
								width="100%"
								height="300"
								:class="{ 'on-hover': isHovering }"
								:elevation="isHovering ? 12 : 2"
								v-bind="props"
							>
								<v-expand-transition>
									<div class="d-flex transition-fast-in-fast-out v-card--reveal" v-if="isHovering">
										<v-btn variant="flat" size="large" color="accent" text="See treatments"></v-btn>
									</div>
								</v-expand-transition>
							</v-card>
						</v-hover>
						<v-hover v-slot="{ isHovering, props }">
							<v-card
								hover
								class="d-flex justify-center align-center clickable"
								to="treatments"
								image="temp_portfolio_1.jpg"
								width="100%"
								height="800"
								:class="{ 'on-hover': isHovering }"
								:elevation="isHovering ? 12 : 2"
								v-bind="props"
							>
								<v-expand-transition>
									<div class="d-flex transition-fast-in-fast-out v-card--reveal" v-if="isHovering">
										<v-btn variant="flat" size="large" color="accent" text="See treatments"></v-btn>
									</div>
								</v-expand-transition>
							</v-card>
						</v-hover>
						<v-hover v-slot="{ isHovering, props }">
							<v-card
								hover
								class="d-flex justify-center align-center clickable"
								to="treatments"
								image="temp_portfolio_1.jpg"
								width="100%"
								height="300"
								:class="{ 'on-hover': isHovering }"
								:elevation="isHovering ? 12 : 2"
								v-bind="props"
							>
								<v-expand-transition>
									<div class="d-flex transition-fast-in-fast-out v-card--reveal" v-if="isHovering">
										<v-btn variant="flat" size="large" color="accent" text="See treatments"></v-btn>
									</div>
								</v-expand-transition>
							</v-card>
						</v-hover>
					</v-col>
					<v-col cols="12" md="4" class="ga-2 d-flex flex-column justify-start align-center">
						<v-hover v-slot="{ isHovering, props }">
							<v-card
								hover
								class="d-flex justify-center align-center clickable"
								to="treatments"
								image="temp_portfolio_5.jpg"
								width="100%"
								height="300"
								:class="{ 'on-hover': isHovering }"
								:elevation="isHovering ? 12 : 2"
								v-bind="props"
							>
								<v-expand-transition>
									<div class="d-flex transition-fast-in-fast-out v-card--reveal" v-if="isHovering">
										<v-btn variant="flat" size="large" color="accent" text="See treatments"></v-btn>
									</div>
								</v-expand-transition>
							</v-card>
						</v-hover>
						<v-hover v-slot="{ isHovering, props }">
							<v-card
								hover
								class="d-flex justify-center align-center clickable"
								to="treatments"
								image="temp_portfolio_1.jpg"
								width="100%"
								height="800"
								:class="{ 'on-hover': isHovering }"
								:elevation="isHovering ? 12 : 2"
								v-bind="props"
							>
								<v-expand-transition>
									<div class="d-flex transition-fast-in-fast-out v-card--reveal" v-if="isHovering">
										<v-btn variant="flat" size="large" color="accent" text="See treatments"></v-btn>
									</div>
								</v-expand-transition>
							</v-card>
						</v-hover>
						<v-hover v-slot="{ isHovering, props }">
							<v-card
								hover
								class="d-flex justify-center align-center clickable"
								to="treatments"
								image="temp_portfolio_3.jpg"
								width="100%"
								height="300"
								:class="{ 'on-hover': isHovering }"
								:elevation="isHovering ? 12 : 2"
								v-bind="props"
							>
								<v-expand-transition>
									<div class="d-flex transition-fast-in-fast-out v-card--reveal" v-if="isHovering">
										<v-btn variant="flat" size="large" color="accent" text="See treatments"></v-btn>
									</div>
								</v-expand-transition>
							</v-card>
						</v-hover>
						<v-hover v-slot="{ isHovering, props }">
							<v-card
								hover
								class="d-flex justify-center align-center clickable"
								to="treatments"
								image="temp_portfolio_3.jpg"
								width="100%"
								height="800"
								:class="{ 'on-hover': isHovering }"
								:elevation="isHovering ? 12 : 2"
								v-bind="props"
							>
								<v-expand-transition>
									<div class="d-flex transition-fast-in-fast-out v-card--reveal" v-if="isHovering">
										<v-btn variant="flat" size="large" color="accent" text="See treatments"></v-btn>
									</div>
								</v-expand-transition>
							</v-card>
						</v-hover>
					</v-col>
				</v-row>
			</v-container>
		</template>
	</card-container-component>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import CardContainerComp from "@components/common/card/common-card.vue";

export default defineComponent({
	name: "card-grid-container-component",
	components: {
		"card-container-component": CardContainerComp,
	},
	data() {
		return {};
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
