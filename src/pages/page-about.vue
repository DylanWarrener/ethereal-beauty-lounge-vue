<template>
	<canvas-container-component :src="img_canvas">
		<template #canvas-content>
			<v-container fluid class="pa-4 fill-height">
				<v-row dense class="d-flex justify-center">
					<v-col cols="12" md="8">
						<card-container-component variant="flat" style="background-color: rgba(0, 0, 0, 0.3)">
							<template #card-headings>
								<v-card-item class="pa-4">
									<v-card-title class="text-wrap">
										<h1>About us</h1>
									</v-card-title>
									<v-card-subtitle class="text-wrap">
										<h3>Where Timeless Beauty Meets Professional Expertise</h3>
									</v-card-subtitle>
								</v-card-item>
							</template>
							<template #card-actions>
								<v-card-actions class="pa-4">
									<v-spacer></v-spacer>
									<v-btn
										variant="flat"
										size="large"
										color="accent"
										text="See who we are?"
										@click="scrollToElement('section-about')"
									></v-btn>
								</v-card-actions>
							</template>
						</card-container-component>
					</v-col>
				</v-row>
			</v-container>
		</template>
	</canvas-container-component>
	<v-divider color="accent" thickness="4" style="opacity: 1"></v-divider>

	<section-container-component
		id="section-about"
		class="bg-default"
		class_title="text-inverted"
		title="Ethereal Beauty Lounge"
	>
		<template #section-content>
			<v-container fluid class="text-inverted">
				<v-row dense>
					<!-- Our mission -->
					<v-col cols="12">
						<v-row dense>
							<v-col cols="12" md="6" class="pa-4 d-flex flex-column justify-center align-center">
								<h3 class="text-inverted">Our Mission</h3>
								<p class="text-inverted text-center">
									At Ethereal Beauty Lounge, we are committed to providing our clients with the best beauty
									services that will suit all lifestyles & ensure affordability is met for all. We promise
									to leave clients feeling confident, radiant and reborn. We strive to create an authentic
									and welcoming environment where our clients can relax and enjoy their beauty treatments
									forgetting the worries of life.
								</p>
							</v-col>
							<v-col cols="12" md="6" style="max-height: 500px">
								<v-img cover :src="img_canvas"></v-img>
							</v-col>
						</v-row>
					</v-col>

					<!-- Our services -->
					<v-col cols="12">
						<v-row dense>
							<v-col
								cols="12"
								md="6"
								class="pa-4 d-flex flex-column justify-center align-center"
								:class="$vuetify.display.mdAndUp ? 'order-2' : 'order-1'"
							>
								<h3 class="text-inverted">Our Services</h3>
								<p class="text-inverted text-center">
									From facials and dermaplaning to non surgical tummy tucks and skin tightening, we offer a
									wide range of beauty services to meet the needs of our clients. Our services are
									authentic to each individual, ensuring that they receive the best possible care for their
									desired image.
								</p>
							</v-col>
							<v-col
								cols="12"
								md="6"
								:class="$vuetify.display.mdAndUp ? 'order-1' : 'order-2'"
								style="max-height: 500px"
							>
								<v-img cover :src="img_canvas"></v-img>
							</v-col>
						</v-row>
					</v-col>

					<!-- Our team -->
					<v-col cols="12">
						<v-row dense>
							<v-col cols="12" md="6" class="pa-4 d-flex flex-column justify-center align-center">
								<h3 class="text-inverted">Our Team</h3>
								<p class="text-inverted text-center">
									Our team of experienced and skilled beauty professionals are dedicated to providing
									top-notch services to our clients. We take pride in staying up-to-date with the latest
									beauty trends and techniques to ensure that our clients receive the best possible care.
								</p>
							</v-col>
							<v-col cols="12" md="6" style="max-height: 500px">
								<v-img cover :src="img_canvas"></v-img>
							</v-col>
						</v-row>
					</v-col>
				</v-row>
			</v-container>
		</template>
	</section-container-component>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Stores
import useCommonStore from "@stores/store-common.js";
import useAboutStore from "@stores/store-about.js";

// Components
import CanvasContainerComp from "@components/common/canvas/common-canvas.vue";
import CardContainerComp from "@components/common/card/common-card.vue";
import SectionContainerComp from "@components/common/section/common-section.vue";

// IMGs
import CanvasPNG from "@assets/jpg/temp.jpg";

export default defineComponent({
	name: "about-page-container-component",
	components: {
		"canvas-container-component": CanvasContainerComp,
		"card-container-component": CardContainerComp,
		"section-container-component": SectionContainerComp,
	},
	computed: {
		/* IMGs */
		img_canvas(): string {
			return CanvasPNG;
		},

		/* Data */
		data_appBarHeight(): number {
			return this.storeCommon.getAppBarHeight;
		},
		data_isAppBarActive(): boolean {
			return this.storeCommon.getAppBarDrawer;
		},
	},
	methods: {
		/* Utils */
		scrollToElement(targetElement: string): void {
			const targetElementID: HTMLDivElement = document.getElementById(targetElement) as HTMLDivElement;

			if (targetElementID) {
				if (this.data_isAppBarActive) {
					window.scrollTo({
						top: targetElementID!.offsetTop - this.data_appBarHeight,
						behavior: "smooth",
					});
				} else {
					window.scrollTo({
						top: targetElementID!.offsetTop,
						behavior: "smooth",
					});
				}
			}
		},
	},
	setup() {
		const storeCommon = useCommonStore();
		const storeAbout = useAboutStore();
		return { storeCommon, storeAbout };
	},
});
</script>
