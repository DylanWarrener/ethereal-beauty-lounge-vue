<template>
	<v-app-bar elevation="0" color="accent" scroll-behavior="hide">
		<img-container-component></img-container-component>
		<tooltip-container-component
			location="bottom"
			:id="appbarMenuBtn"
			:icon="appBarIcons.menu.icon"
			:tooltip="appBarIcons.menu.tooltip"
			:toggled-tooltip="appBarIcons.menu.showTooltip"
			@toggle-drawer="linkDrawer = !linkDrawer"
		></tooltip-container-component>
		<v-app-bar-title class="text-capitalize">{{ appBarTitle }}</v-app-bar-title>
		<v-btn variant="text" :icon="appBarIcons.search.icon"></v-btn>
		<v-btn variant="text" :icon="appBarIcons.basket.icon"></v-btn>
		<v-divider vertical inset class="mx-2 border-opacity-75"></v-divider>
		<v-btn variant="text" :icon="appBarIcons.login.icon"></v-btn>
	</v-app-bar>
	<navigation-drawer-links-component></navigation-drawer-links-component>
	<navigation-drawer-profile-component></navigation-drawer-profile-component>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RouteRecordName } from "vue-router";

// Stores
import useHeaderStore from "@stores/store-header.js";

// Components
import ImgComp from "@components/common/img/common-img.vue";
import TooltipComp from "@components/common/tooltip/common-tooltip.vue";
import NavigationDrawerLinksComp from "@components/uncommon/header/uncommon-header-navigation-links.vue";
import NavigationDrawerProfileComp from "@components/uncommon/header/uncommon-header-navigation-profile.vue";

// Interfaces
import { IHeaderAppbarIconsState } from "@declarations/common/header/interfaces/appbar/common-interface-header-appbar.js";

// Enums
import { ElementIDs } from "@enums/enums.js";

export default defineComponent({
	name: "header-component",
	components: {
		"img-container-component": ImgComp,
		"tooltip-container-component": TooltipComp,
		"navigation-drawer-links-component": NavigationDrawerLinksComp,
		"navigation-drawer-profile-component": NavigationDrawerProfileComp,
	},
	computed: {
		// IDs
		appbarMenuBtn(): string {
			return ElementIDs.APPBAR_MENU_BTN;
		},

		// Text
		appBarTitle(): string {
			let retVal: string = "";
			if (this.$route.name) {
				const currentPageName: RouteRecordName = this.$route.name;
				retVal = currentPageName.toString();
			}
			return retVal;
		},

		// Data
		appBarIcons(): IHeaderAppbarIconsState {
			return this.storeHeader.getAppBarIcons;
		},

		// Conditional
		linkDrawer: {
			get(): boolean {
				return this.storeHeader.getNavigationLinksDrawer;
			},
			set(newValue: boolean): void {
				this.storeHeader.setNavigationLinksDrawer(newValue);
			},
		},
	},
	setup() {
		const storeHeader = useHeaderStore();
		return { storeHeader };
	},
});
</script>
