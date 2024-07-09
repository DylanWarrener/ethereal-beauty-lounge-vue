<template>
	<v-footer tag="footer" class="pa-0 d-flex flex-column bg-primary">
		<v-container fluid class="pa-0">
			<v-row dense>
				<!-- Socials -->
				<v-col cols="12" sm="6" class="d-flex">
					<p class="w-100 align-self-center text-center">Get connected with us on our social networks!</p>
				</v-col>
				<v-divider color="default" v-if="isDeviceSmall"></v-divider>
				<v-divider color="default" vertical v-else></v-divider>
				<v-col cols="12" sm="6" class="d-flex" style="height: 75px">
					<div class="footer_socials w-100 d-flex flex-row justify-space-evenly align-center">
						<container-btn 
							target="_blank"
							class="bg-accent"
							:href="svg.link"
							:key="index"
							v-for="(svg, index) in socials">
							<template #custom-svg="{ class: componentClass }">
								<component :is="footer.socials.selectedComponent" :class="componentClass"></component>
							</template>
						</container-btn>
					</div>
				</v-col>

				<v-divider color="default"></v-divider>

				<!-- Navigation -->
				<v-col cols="12" class="d-flex" style="min-height: 75px">
					<div :class="computed_css_navigation_class">
						<v-btn
							variant="flat"
							class="bg-transparent"
							:class="navigationBtnWidth"
							:to="item.link"
							:key="index"
							v-for="(item, index) in navigation"
						>
							{{ item.text }}
						</v-btn>
					</div>
				</v-col>
				<v-divider color="default"></v-divider>

				<!-- Information -->
				<v-col cols="12" md="6" class="d-flex align-center" style="height: 75px">
					<small class="w-100 text-center"> 48 Papyrus Road, Peterborough, Cambridgeshire, PE4 5BH, UK </small>
				</v-col>
				<v-divider color="default" v-if="isDeviceMedium"></v-divider>
				<v-divider color="default" vertical v-else></v-divider>
				<v-col cols="12" md="6" class="d-flex align-center" style="height: 75px">
					<small class="w-100 text-center"> Copyright © 2024 Ethereal Beauty Lounge - All Rights Reserved. </small>
				</v-col>
			</v-row>
		</v-container>
	</v-footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Constants
import { CONST_OBJECT_TEXT_PAGES, CONST_OBJECT_LINKS_PAGES } from "@constants/common/objects/common-constants-objects.js";

// SVGs
import FacebookSVG from "@assets/svg/socials/facebook.svg";
import InstagramSVG from "@assets/svg/socials/instagram.svg";
import TikTokSVG from "@assets/svg/socials/tiktok.svg";

export default defineComponent({
	name: "footer-container-component",
	// components: {
	// 	'svg-facebook': FacebookSVG,
	// 	'svg-instagram': InstagramSVG,
	// 	'svg-tiktok': TikTokSVG,
	// },
	data() {
		return {
			footer: {
				socials: {
					selectedComponent: ""
				}
			},
			socials: {
				facebook: {
					icon: FacebookSVG,
					alt: "Facebook logo icon",
					link: "https://www.facebook.com/profile.php?id=61551908105553",
				},
				instagram: {
					icon: InstagramSVG,
					alt: "Instagram logo icon",
					link: "https://www.instagram.com/etherealbeautylounge_?igsh=MTBpMmVzZWd1Nzh6OQ%3D%3D&utm_source=qr",
				},
				tiktok: {
					icon: TikTokSVG,
					alt: "TickTok logo icon",
					link: "https://www.tiktok.com/@etherealbeautylounge_?_t=8k5mo2SiR4S&_r=1",
				},
			},
			//[FacebookSVG, InstagramSVG, TikTokSVG],
			navigation: [
				{
					text: CONST_OBJECT_TEXT_PAGES.home,
					link: CONST_OBJECT_LINKS_PAGES.home,
				},
				{
					text: CONST_OBJECT_TEXT_PAGES.treatments,
					link: CONST_OBJECT_LINKS_PAGES.treatments,
				},
				{
					text: CONST_OBJECT_TEXT_PAGES.store,
					link: CONST_OBJECT_LINKS_PAGES.store,
				},
				{
					text: CONST_OBJECT_TEXT_PAGES.contact,
					link: CONST_OBJECT_LINKS_PAGES.contact,
				},
				{
					text: CONST_OBJECT_TEXT_PAGES.reviews,
					link: CONST_OBJECT_LINKS_PAGES.reviews,
				},
				{
					text: CONST_OBJECT_TEXT_PAGES.about,
					link: CONST_OBJECT_LINKS_PAGES.about,
				},
			],
		};
	},
	computed: {
		computed_css_navigation_class(): string[] {
			let retval: string[] = ["d-flex", "w-100",  "d-flex",  "justify-space-evenly",  "align-center"];
			retval.push(this.$vuetify.display.mdAndUp ? "flex-row" : "flex-column");
			return retval;
		},
		navigationBtnWidth(): string {
			let retVal: string = "w-100";
			if (this.$vuetify.display.mdAndUp) retVal = "";
			return retVal;
		},

		/* Data */
		isDeviceSmall(): boolean {
			let retVal: boolean = true;
			if (this.$vuetify.display.smAndUp) retVal = false;
			return retVal;
		},
		isDeviceMedium(): boolean {
			let retVal: boolean = true;
			if (this.$vuetify.display.mdAndUp) retVal = false;
			return retVal;
		},
	},
	methods: {
		openSocial(): void {},
	},
});
</script>

<style lang="scss">
.footer_socials {
	.v-btn {
		.v-btn__content {
			.v-icon {
				.v-img {
					.v-img__img {
						//filter: invert(100%) sepia(78%) saturate(0%) hue-rotate(209deg) brightness(106%) contrast(101%);
					}
				}
			}

			.v-img {
				.v-img__img {
					//filter: invert(100%);
					//fill: red;
					filter: invert(100%) sepia(78%) saturate(0%) hue-rotate(209deg) brightness(106%) contrast(101%);
				}
			}
		}
	}
}
</style>
