<template>
	<v-layout id="layout" class="d-flex flex-column" style="border: 4px solid red">
		<header-container-component></header-container-component>

		<!-- Snackbar feedback -->
		<user-feedback-container-component></user-feedback-container-component>

		<user-account-navigation-component></user-account-navigation-component>

		<!-- Pages -->
		<v-main class="d-flex flex-column w-100" style="border: 4px solid black">
			<router-view></router-view>
		</v-main>

		<footer-container-component id="footer"></footer-container-component>

		<!-- Whatsapp -->
		<!-- <v-btn icon class="whatsapp" v-if="showWhatsappChatbot">
			<v-icon>
				<template #default>
					<v-img :src="computed_icon_whatsapp"></v-img>
				</template>
			</v-icon>
		</v-btn> -->
	</v-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Services
import { auth } from "@plugins/firebase/firebase.js";

// Stores
import useCommonStore from "@stores/store-common.js";
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
	data(): any {
		return {
			targetElement: null,
			showWhatsappChatbot: false,
		};
	},
	computed: {
		computed_icon_whatsapp(): string {
			return WhatsAppSVG;
		},

		computed_data_show_state: {
			get(): boolean {
				return this.storeCommon.getSnackbar_show_state;
			},
			set(newValue: boolean): void {
				this.storeCommon.setSnackbar_show_state(newValue);
			},
		}
	},
	methods: {
		// method_utils_monitorTargetElement(targetElement: string): void {
		// 	window.addEventListener(
		// 		"load",
		// 		() => {
		// 			this.targetElement = document.querySelector(targetElement) as HTMLElement;
		// 			this.method_utils_createObserver();
		// 		},
		// 		false
		// 	);
		// },
		// method_utils_createObserver(): void {
		// 	let observer;
		// 	let options = {
		// 		root: null,
		// 		rootMargin: "0px",
		// 		threshold: 0,
		// 	};

		// 	observer = new IntersectionObserver(this.method_utils_handleIntersect, options);
		// 	observer.observe(this.targetElement!);
		// },
		// method_utils_handleIntersect(entries: any): void {
		// 	this.showWhatsappChatbot = entries[0].isIntersecting;
		// },
	},
	created(): void {
		//this.storeFirebase.monitor_userAuth_state({ auth }).then(() => this.storeFirebase.get_userFirestore_user());
	},
	mounted(): void {
		// this.method_utils_monitorTargetElement("#footer");
	},
	setup() {
		const storeFirebase = useFirebaseStore();
		const storeCommon = useCommonStore();
		return { storeCommon, storeFirebase };
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
