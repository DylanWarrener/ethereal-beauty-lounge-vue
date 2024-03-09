<template>
	<v-layout id="layout">
		<dialog-login-component></dialog-login-component>
		<!-- <dialog-create-account-component></dialog-create-account-component> -->
		<header-container-component></header-container-component>
		<user-account-navigation-component></user-account-navigation-component>
		<v-main>
			<router-view></router-view>
		</v-main>
		<footer-container-component></footer-container-component>
		<v-btn icon id="whatsapp">
			<v-icon>
				<template #default>
					<v-img :src="icon_whatsapp"></v-img>
				</template>
			</v-icon>
		</v-btn>
	</v-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Stores
import { useCommonStore } from "@plugins/pinia/pinia.js";

// Components
import DialogLoginComp from "@components/uncommon/dialog/uncommon-dialog-login.vue";
//import DialogCreateAccountComp from "@components/uncommon/dialog/uncommon-dialog-create-account.vue";
import HeaderComp from "@components/common/header/common-header.vue";
import UserAccountNavComp from "@components/uncommon/navigation/uncommon-navigation-user-account.vue";
import FooterComp from "@components/common/footer/common-footer.vue";

// SVGs
import WhatsAppSVG from "@assets/svg/socials/whatsapp_outline.svg";

export default defineComponent({
	name: "app-component",
	components: {
		"dialog-login-component": DialogLoginComp,
		//"dialog-create-account-component": DialogCreateAccountComp,
		"header-container-component": HeaderComp,
		"user-account-navigation-component": UserAccountNavComp,
		"footer-container-component": FooterComp,
	},
	data(): { userData: any } {
		return {
			userData: null
		}
	},
	computed: {
		/* Icons */
		icon_whatsapp(): string {
			return WhatsAppSVG;
		},
	},
	created(): void {
		this.storeCommon.monitorAuthState();
	},
	setup() {
		const storeCommon = useCommonStore();
		return { storeCommon };
	}
});
</script>

<style lang="scss">
#layout {
	position: relative;
}
#whatsapp {
	position: fixed;
	bottom: 0;
	right: 0;
	margin-right: 25px;
	margin-bottom: 25px;
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
</style>
