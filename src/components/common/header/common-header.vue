<template>
	<v-app-bar elevation="0" color="accent" scroll-behavior="hide">
		<img-container-component></img-container-component>
		<tooltip-container-component
			location="bottom"
			:id="IDAppbarMenuBtn"
			:icon="appBarIcons.menu.icon"
			:tooltip="appBarIcons.menu.tooltip"
			:tooltip-opened="appBarIcons.menu.showTooltip"
			@toggle-drawer="menuDrawer = !menuDrawer"
		></tooltip-container-component>
		<v-app-bar-title class="text-capitalize">{{ appBarTitle }}</v-app-bar-title>

		<tooltip-container-component
			location="bottom"
			:id="IDAppbarSearchBtn"
			:icon="appBarIcons.search.icon"
			:tooltip="appBarIcons.search.tooltip"
			:tooltip-opened="appBarIcons.search.showTooltip"
			@toggle-drawer="searchDrawer = !searchDrawer"
		></tooltip-container-component>
		<tooltip-container-component
			location="bottom"
			:id="IDAppbarBasketBtn"
			:icon="appBarIcons.basket.icon"
			:tooltip="appBarIcons.basket.tooltip"
			:tooltip-opened="appBarIcons.basket.showTooltip"
			@toggle-drawer="basketDrawer = !basketDrawer"
		></tooltip-container-component>
		<v-divider vertical inset class="mx-2 border-opacity-75"></v-divider>
		<tooltip-container-component
			location="bottom"
			:id="IDAppbarLoginBtn"
			:icon="appBarIcons.login.icon"
			:tooltip="appBarIcons.login.tooltip"
			:tooltip-opened="appBarIcons.login.showTooltip"
			@toggle-drawer="loginDrawer = !loginDrawer"
		></tooltip-container-component>
	</v-app-bar>
	<navigation-drawer-menu-component></navigation-drawer-menu-component>
	<navigation-drawer-profile-component></navigation-drawer-profile-component>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RouteRecordName } from 'vue-router';

// Stores
import useHeaderStore from '@stores/store-header.js';

// Components
import ImgComp from '@components/common/img/common-img.vue';
import TooltipComp from '@components/common/tooltip/common-tooltip.vue';
import NavigationDrawerMenuComp from '@components/uncommon/header/uncommon-header-navigation-menu.vue';
import NavigationDrawerProfileComp from '@components/uncommon/header/uncommon-header-navigation-profile.vue';

// Interfaces
import { IHeaderAppbarIconsState } from '@declarations/common/header/interfaces/appbar/common-interface-header-appbar.js';

// Enums
import { ElementIDs } from '@enums/enums.js';

export default defineComponent({
	name: 'header-component',
	components: {
		'img-container-component': ImgComp,
		'tooltip-container-component': TooltipComp,
		'navigation-drawer-menu-component': NavigationDrawerMenuComp,
		'navigation-drawer-profile-component': NavigationDrawerProfileComp,
	},
	computed: {
		// IDs
		IDAppbarMenuBtn(): string {
			return ElementIDs.APPBAR_MENU_BTN;
		},
		IDAppbarSearchBtn(): string {
			return ElementIDs.APPBAR_SEARCH_BTN;
		},
		IDAppbarBasketBtn(): string {
			return ElementIDs.APPBAR_BASKET_BTN;
		},
		IDAppbarLoginBtn(): string {
			return ElementIDs.APPBAR_LOGIN_BTN;
		},

		// Text
		appBarTitle(): string {
			let retVal: string = '';
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
		menuDrawer: {
			get(): boolean {
				debugger;
				return this.storeHeader.getAppBarMenuDrawer;
			},
			set(newValue: boolean): void {
				debugger;
				this.storeHeader.setAppBarMenuDrawer(newValue);
			},
		},
		searchDrawer: {
			get(): boolean {
				return this.storeHeader.getAppBarSearchDrawer;
			},
			set(newValue: boolean): void {
				this.storeHeader.setAppBarSearchDrawer(newValue);
			},
		},
		basketDrawer: {
			get(): boolean {
				return this.storeHeader.getAppBarBasketDrawer;
			},
			set(newValue: boolean): void {
				this.storeHeader.setAppBarBasketDrawer(newValue);
			},
		},
		loginDrawer: {
			get(): boolean {
				return this.storeHeader.getAppBarLoginDrawer;
			},
			set(newValue: boolean): void {
				this.storeHeader.setAppBarLoginDrawer(newValue);
			},
		},
	},
	setup() {
		const storeHeader = useHeaderStore();
		return { storeHeader };
	},
});
</script>
