<template>
	<v-footer class="d-flex flex-column bg-accent">
		<v-container fluid>
			<v-row dense>
				<!-- Google map -->
				<v-col cols="12" id="section-contact-map" style="border: 4px solid red">
					This is where the google map goes
				</v-col>

				<!-- Socials -->
				<v-col cols="12" sm="6" class="d-flex" style="height: 75px">
					<p class="w-100 align-self-center text-center">Get connected with us on our social networks!</p>
				</v-col>
				<v-divider v-if="isDeviceSmall"></v-divider>
				<v-divider vertical v-else></v-divider>
				<v-col cols="12" sm="6" class="d-flex" style="height: 75px">
					<div class="footer_socials w-100 d-flex flex-row justify-space-evenly align-center">
						<v-btn icon variant="flat" class="bg-accent" :key="index" v-for="(svg, index) in socials">
							<v-icon size="x-large">
								<template #default>
									<v-img :src="svg"></v-img>
								</template>
							</v-icon>
						</v-btn>
					</div>
				</v-col>
				<v-divider></v-divider>

				<!-- Navigation -->
				<v-col cols="12" class="d-flex" style="min-height: 75px">
					<div class="w-100 d-flex justify-space-evenly align-center" :class="flexDirection">
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
				<v-divider></v-divider>

				<!-- Information -->
				<v-col cols="12" md="6" class="d-flex align-center" style="height: 75px">
					<small class="w-100 text-center">
						48 Papyrus Road, Peterborough, Cambridgeshire, PE4 5BH, UK
					</small>
				</v-col>
				<v-divider v-if="isDeviceMedium"></v-divider>
				<v-divider vertical v-else></v-divider>
				<v-col cols="12" md="6" class="d-flex align-center" style="height: 75px">
					<small class="w-100 text-center">
						Copyright © 2024 Ethereal Beauty Lounge - All Rights Reserved.
					</small>
				</v-col>
			</v-row>
		</v-container>
	</v-footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Constants
import { txtRouteNames, txtRouteLinks } from "@constants/common/objects/common-constants-objects.js";

// SVGs
import FacebookSVG from "@assets/svg/socials/facebook.svg";
import InstagramSVG from "@assets/svg/socials/instagram.svg";
import TikTokSVG from "@assets/svg/socials/tiktok.svg";

export default defineComponent({
	name: "footer-component",
	data() {
		return {
			socials: [FacebookSVG, InstagramSVG, TikTokSVG],
			navigation: [
				{
					text: txtRouteNames.home,
					link: txtRouteLinks.home,
				},
				{
					text: txtRouteNames.treatments,
					link: txtRouteLinks.treatments,
				},
				{
					text: txtRouteNames.store,
					link: txtRouteLinks.store,
				},
				{
					text: txtRouteNames.contact,
					link: txtRouteLinks.contact,
				},
				{
					text: txtRouteNames.reviews,
					link: txtRouteLinks.reviews,
				},
				{
					text: txtRouteNames.about,
					link: txtRouteLinks.about,
				},
			],
		};
	},
	computed: {
		/* CSS */
		flexDirection(): string {
			let retVal: string = "flex-column";
			if (this.$vuetify.display.mdAndUp) retVal = "flex-row";
			return retVal;
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
});
</script>

<style lang="scss">
.footer_socials {
	.v-btn {
		.v-btn__content {
			.v-icon {
				.v-img {
					.v-img__img {
						filter: invert(100%) sepia(78%) saturate(0%) hue-rotate(209deg) brightness(106%) contrast(101%);
					}
				}
			}
		}
	}
}
</style>
