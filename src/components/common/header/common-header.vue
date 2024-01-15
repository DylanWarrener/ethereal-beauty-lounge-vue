<template>
	<v-app-bar elevation="0" scroll-behavior="hide" color="accent">
		<v-tooltip location="bottom" v-model="appBarIcons.menu.showTooltip">
			<v-img :src="Logo"></v-img>
			<template #activator="{ props }">
				<v-btn
					variant="flat"
					:icon="appBarIcons.menu.icon"
					v-bind="props"
					@click.stop="linkDrawer.open = !linkDrawer.open"
				></v-btn>
			</template>
			<span>{{ appBarIcons.menu.tooltip }}</span>
		</v-tooltip>
		<v-app-bar-title class="text-capitalize">{{ appBarTitle }}</v-app-bar-title>
	</v-app-bar>
	<navigation-drawer-links-component></navigation-drawer-links-component>
	<navigation-drawer-profile-component></navigation-drawer-profile-component>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RouteRecordName } from "vue-router";

// Stores
import useHeaderStore from "@stores/store-header.js";

// Interfaces
import { IHeaderAppBarIcons } from "@declarations/common/header/interfaces/appbar/common-interface-header-appbar.js";
import { IHeaderNavigationLinksDrawerState } from "@declarations/common/header/interfaces/navigation/common-interface-header-navigation.js";

// IMGs
const Logo = new URL("./assets/png/logo/logo-transparent.png", import.meta.url).href;

export default defineComponent({
	name: "header-component",
	computed: {
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
		appBarIcons(): IHeaderAppBarIcons {
			return this.storeHeader.getAppBarIcons;
		},

		// Conditional
		linkDrawer(): IHeaderNavigationLinksDrawerState {
			return this.storeHeader.getNavigationLinkDrawer;
		},
	},
	setup() {
		const storeHeader = useHeaderStore();
		return { storeHeader };
	},
});
</script>
