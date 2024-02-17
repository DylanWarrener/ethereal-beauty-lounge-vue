<template>
	<v-footer class="d-flex flex-column bg-accent" style="border: 2px solid black">
		<v-container fluid style="border: 2px solid red">
			<v-row dense style="border: 2px solid green">
				<v-col style="border: 2px solid blue">
					<p>Get connected with us on social networks!</p>
				</v-col>
				<v-col class="d-flex flex-row justify-space-evenly align-center	" style="border: 2px solid yellow">
					<v-btn class="footer_socials_icon" :icon="icon_facebook" color="transparent"></v-btn>
				</v-col>
			</v-row>
		</v-container>
	</v-footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// Components
import useFooterStore from '@stores/store-footer.js';

// SVGs
import FacebookSVG from "@assets/svg/socials/facebook.svg";
import InstagramSVG from "@assets/svg/socials/instagram.svg";
import TikTokSVG from "@assets/svg/socials/tiktok.svg";

export default defineComponent({
	name: 'footer-component',
	computed: {
		/* Icons */
		icon_facebook(): string {
			return FacebookSVG;
		},
		icon_instagram(): string {
			return InstagramSVG;
		},
		icon_tiktok(): string {
			return TikTokSVG;
		}
	},
	setup() {
		const storeHeader = useFooterStore();
		return { storeHeader };
	},
});
</script>

<style lang="scss">
.footer_socials_icon {
	.v-btn {
		.v-btn__content {
			.v-icon {
				.v-icon__svg {
					//color: rgb(var(--v-theme-inverted));
					fill: rgb(var(--v-theme-default));
					//background: rgb(var(--v-theme-accent));
				}
			}
		}
	}
}
</style>
