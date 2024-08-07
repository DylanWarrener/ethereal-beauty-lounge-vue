<template>
	<container-canvas :src="computed_img_canvas">
		<template #canvas-content>
			<v-container fluid class="pa-4 fill-height">
				<v-row dense class="d-flex justify-center">
					<v-col cols="12" md="8">
						<container-card 
							variant="flat" 
							:style="computed_css_canvas_cardBackgroundOpacity"
							:card-title="computed_text_canvas_cardTitle"
							:card-subtitle="computed_text_canvas_cardSubtitle">
							<template #card-actions>
								<v-spacer></v-spacer>
								<container-btn
									variant="flat"
									:text="computed_text_canvasCard_btn"
									@click="method_event_scrollToElement('section-about')"
								></container-btn>
							</template>
						</container-card>
					</v-col>
				</v-row>
			</v-container>
		</template>
	</container-canvas>

	<container-divider></container-divider>

	<container-section id="section-about" title-class="text-inverted" :title="computed_text_section_title">
		<template #section-content>
			<v-container fluid class="text-inverted">
				<v-row dense class="d-flex ga-4">
					<!-- Our mission -->
					<v-col cols="12">
						<v-row dense>
							<v-col cols="12" md="6" class="pa-4 d-flex flex-column justify-center align-center">
								<h3 class="text-accent" v-text="computed_text_section_ourMission_title"></h3>
								<p class="text-inverted text-center" v-text="computed_text_section_ourMission_message"></p>
							</v-col>
							<v-col cols="12" md="6" style="max-height: 500px">
								<v-img cover :src="computed_img_canvas"></v-img>
							</v-col>
						</v-row>
					</v-col>

					<container-divider></container-divider>

					<!-- Our services -->
					<v-col cols="12">
						<v-row dense>
							<v-col
								cols="12"
								md="6"
								class="pa-4 d-flex flex-column justify-center align-center"
								:class="$vuetify.display.mdAndUp ? 'order-2' : 'order-1'"
							>
								<h3 class="text-accent" v-text="computed_text_section_ourServices_title"></h3>
								<p class="text-inverted text-center" v-text="computed_text_section_ourServices_message"></p>
							</v-col>
							<v-col
								cols="12"
								md="6"
								:class="$vuetify.display.mdAndUp ? 'order-1' : 'order-2'"
								style="max-height: 500px"
							>
								<v-img cover :src="computed_img_canvas"></v-img>
							</v-col>
						</v-row>
					</v-col>

					<container-divider></container-divider>

					<!-- Our team -->
					<v-col cols="12">
						<v-row dense>
							<v-col cols="12" md="6" class="pa-4 d-flex flex-column justify-center align-center">
								<h3 class="text-accent" v-text="computed_text_section_ourTeam_title"></h3>
								<p class="text-inverted text-center" v-text="computed_text_section_ourTeam_message"></p>
							</v-col>
							<v-col cols="12" md="6" style="max-height: 500px">
								<v-img cover :src="computed_img_canvas"></v-img>
							</v-col>
						</v-row>
					</v-col>
				</v-row>
			</v-container>
		</template>
	</container-section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Constants
import { CONST_OBJECT_IDS_SECTION_BUTTONS } from "@constants/common/objects/common-constants-objects.js";

// IMGs
import CanvasPNG from "@assets/jpg/temp.jpg";

export default defineComponent({
	name: "about-page-container-component",
	data() {
		return {
			aboutPage: {
				canvas: {
					card: {
						headings: {
							title: "About us",
							subtitle: "Where Timeless Beauty Meets Professional Expertise",
						},
						actions: {
							buttons: {
								seeWhoWeAre: {
									text: "See who we are?",
								},
							},
						},
					},
				},
				section: {
					title: "",
					content: {
						ourMission: {
							title: "Our Mission",
							message: `At Ethereal Beauty Lounge, we are committed to providing our clients with the best beauty
								services that will suit all lifestyles & ensure affordability is met for all. We promise
								to leave clients feeling confident, radiant and reborn. We strive to create an authentic
								and welcoming environment where our clients can relax and enjoy their beauty treatments
								forgetting the worries of life.`,
						},
						ourServices: {
							title: "Our Services",
							message: `From facials and dermaplaning to non surgical tummy tucks and skin tightening, we offer a
								wide range of beauty services to meet the needs of our clients. Our services are
								authentic to each individual, ensuring that they receive the best possible care for their
								desired image.`,
						},
						ourTeam: {
							title: "Our Team",
							message: `Our team of experienced and skilled beauty professionals are dedicated to providing
								top-notch services to our clients. We take pride in staying up-to-date with the latest
								beauty trends and techniques to ensure that our clients receive the best possible care.`,
						},
					},
				},
			},
		};
	},
	computed: {
		computed_text_canvas_cardTitle(): string {
			return this.aboutPage.canvas.card.headings.title;
		},
		computed_text_canvas_cardSubtitle(): string {
			return this.aboutPage.canvas.card.headings.subtitle;
		},
		computed_text_canvasCard_btn(): string {
			return this.aboutPage.canvas.card.actions.buttons.seeWhoWeAre.text;
		},
		computed_text_section_title(): string {
			return this.aboutPage.section.title;
		},
		computed_text_section_ourMission_title(): string {
			return this.aboutPage.section.content.ourMission.title;
		},
		computed_text_section_ourMission_message(): string {
			return this.aboutPage.section.content.ourMission.message;
		},
		computed_text_section_ourServices_title(): string {
			return this.aboutPage.section.content.ourServices.title;
		},
		computed_text_section_ourServices_message(): string {
			return this.aboutPage.section.content.ourServices.message;
		},
		computed_text_section_ourTeam_title(): string {
			return this.aboutPage.section.content.ourTeam.title;
		},
		computed_text_section_ourTeam_message(): string {
			return this.aboutPage.section.content.ourTeam.message;
		},

		computed_img_canvas(): string {
			return CanvasPNG;
		},

		computed_css_canvas_cardBackgroundOpacity(): string {
			return "background-color: rgba(0, 0, 0, 0.3)";
		},
	},
	methods: {
		method_event_scrollToElement(targetElement: string): void {
			const targetElementID: HTMLDivElement = document.getElementById(targetElement) as HTMLDivElement;

			if (targetElementID) {
				window.scrollTo({
					top: targetElementID!.offsetTop,
					behavior: "smooth",
				});
			}
		},
	},
});
</script>
