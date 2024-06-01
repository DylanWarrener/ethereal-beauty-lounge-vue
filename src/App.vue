<template>
	<v-layout id="layout">
		<header-container-component></header-container-component>

		<!-- Snackbar -->
		<user-feedback-container-component></user-feedback-container-component>

		<!-- Navigation menus -->
		<navigation-pages-mobile-menu></navigation-pages-mobile-menu>
		<user-account-navigation-component></user-account-navigation-component>

		<!-- Pages -->
		<v-main style="--v-layout-top: 0">
			<router-view></router-view>
		</v-main>

		<footer-container-component id="footer"></footer-container-component>

		<v-btn icon class="whatsapp" v-if="showWhatsappChatbot">
			<v-icon>
				<template #default>
					<v-img :src="computed_icon_whatsapp"></v-img>
				</template>
			</v-icon>
		</v-btn>
	</v-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Services
import { auth } from "@plugins/firebase/firebase.js";

// Stores
import useFirebaseStore from "@stores/store-firebase.js";

// Components
import HeaderComp from "@components/common/header/common-header.vue";
import UserFeedbackComp from "@components/common/feedback/common-feedback.vue";
import UserAccountNavComp from "@components/uncommon/navigation/uncommon-navigation-user-account.vue";
import NavigationPagesMobileMenu from "@components/uncommon/navigation/pages/mobile-menu/uncommon-navigation-pages-mobile-menu.vue";
import FooterComp from "@components/common/footer/common-footer.vue";

// SVGs
import WhatsAppSVG from "@assets/svg/socials/whatsapp_outline.svg";

export default defineComponent({
	name: "app-component",
	components: {
		"header-container-component": HeaderComp,
		"user-feedback-container-component": UserFeedbackComp,
		"navigation-pages-mobile-menu": NavigationPagesMobileMenu,
		"user-account-navigation-component": UserAccountNavComp,
		"footer-container-component": FooterComp,
	},
	data(): { targetElement: HTMLElement | null; showWhatsappChatbot: boolean } {
		return {
			targetElement: null,
			showWhatsappChatbot: false,
		};
	},
	computed: {
		computed_icon_whatsapp(): string {
			return WhatsAppSVG;
		},
	},
	methods: {
		method_utils_monitorTargetElement(targetElement: string): void {
			window.addEventListener(
				"load",
				() => {
					this.targetElement = document.querySelector(targetElement) as HTMLElement;
					this.method_utils_createObserver();
				},
				false
			);
		},
		method_utils_createObserver(): void {
			let observer;
			let options = {
				root: null,
				rootMargin: "0px",
				threshold: 0,
			};

			observer = new IntersectionObserver(this.method_utils_handleIntersect, options);
			observer.observe(this.targetElement!);
		},
		method_utils_handleIntersect(entries: any): void {
			this.showWhatsappChatbot = entries[0].isIntersecting;
		},
	},
	created(): void {
		this.storeFirebase.monitor_userAuth_state({ auth }).then(() => this.storeFirebase.get_userFirestore_user());
	},
	mounted(): void {
		this.method_utils_monitorTargetElement("#footer");
	},
	setup() {
		const storeFirebase = useFirebaseStore();
		return { storeFirebase };
	},
});
</script>

<style lang="scss">
#layout {
	.whatsapp {
		position: fixed;
		bottom: 0;
		left: 0;
		margin-left: 10px;
		margin-bottom: 10px;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		width: 75px;
		height: 75px;
		background-color: rgba(37, 211, 102, 1);

		.v-icon {
			font-size: 48px;
			filter: invert(100%) sepia(78%) saturate(0%) hue-rotate(209deg) brightness(106%) contrast(101%);
		}
	}
}
</style>
