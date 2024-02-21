<template>
	<v-footer class="d-flex flex-column bg-accent">
		<v-container fluid>
			<v-row dense>
				<!-- Socials -->
				<v-col cols="12" style="border: 2px solid black">
					<v-row dense style="border: 2px solid orange">
						<v-col cols="12" md="6" class="d-flex justify-center align-center" style="border: 2px solid blue">
							<p>Get connected with us on social networks!</p>
						</v-col>
						<v-col cols="12" md="6" class="footer_socials d-flex flex-row justify-space-evenly align-center" style="border: 2px solid yellow">
							<v-btn icon :key="index" v-for="(svg, index) in socials">
								<v-icon size="x-large">
									<template #default>
										<v-img :src="svg"></v-img>
									</template>
								</v-icon>
							</v-btn>
						</v-col>
					</v-row>
				</v-col>

				<!-- Middle -->
				<v-col cols="12" style="border: 2px solid black">
					<v-row dense style="border: 2px solid orange">
						<v-col cols="12" class="d-flex flex-row justify-space-evenly align-center" style="border: 2px solid blue">
							<v-btn variant="flat" class="bg-transparent" :key="index" v-for="(item, index) in navigation">{{ item }}</v-btn>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
		</v-container>
	</v-footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// SVGs
import FacebookSVG from "@assets/svg/socials/facebook.svg";
import InstagramSVG from "@assets/svg/socials/instagram.svg";
import TikTokSVG from "@assets/svg/socials/tiktok.svg";

export default defineComponent({
	name: 'footer-component',
	data() {
		return {
			socials: [
				FacebookSVG,
				InstagramSVG,
				TikTokSVG
			],
			navigation: [
				"Home",
				"Treatments",
				"Store",
				"Contact",
				"Reviews",
				"About"
			]
		}
	}
});
</script>

<style lang="scss">
.footer_socials {
	.v-btn {
		.v-btn__content {
			.v-icon {
				.v-img {
					.v-img__img {
						filter: invert(52%) sepia(44%) saturate(320%) hue-rotate(285deg) brightness(94%) contrast(95%);
					}
				}
			}
		}
	}
}
</style>
