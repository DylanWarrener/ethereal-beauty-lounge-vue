<template>
	<v-app-bar elevation="0" color="accent" scroll-behavior="hide">
		<!-- APP BAR LEFT -->
		<img-container-component></img-container-component>
		<tooltip-container-component
			location="bottom"
			class-btn="d-md-none"
			:id="IDAppbarMenuBtn"
			:icon="appBarIcons.menu.icon"
			:tooltip="appBarIcons.menu.tooltip"
			:tooltip-opened="appBarIcons.menu.showTooltip"
			@toggle-drawer="menuDrawer = !menuDrawer"
		></tooltip-container-component>
		<tooltip-container-component
			location="bottom"
			:id="IDAppbarSearchBtn"
			:icon="appBarIcons.search.icon"
			:tooltip="appBarIcons.search.tooltip"
			:tooltip-opened="appBarIcons.search.showTooltip"
			@toggle-drawer="searchDrawer = !searchDrawer"
		></tooltip-container-component>
		<v-app-bar-title class="d-none d-md-flex text-capitalize">{{ appBarTitle }}</v-app-bar-title>
		<v-spacer></v-spacer>

		<!-- APP BAR MIDDLE -->
		<v-btn
			class="d-none d-md-flex"
			:append-icon="outerItem.icon"
			:key="index"
			v-for="(outerItem, index) in navigationNonMobileMenu"
			@click="navigatePage(outerItem.title)"
		>
			{{ outerItem.title }}
			<v-menu
				open-on-hover
				location="bottom"
				transition="slide-y-transition"
				activator="parent"
				v-if="outerItem.items"
			>
				<v-list>
					<v-list-item
						color="accent"
						:title="innerItem.title.toUpperCase()"
						:to="innerItem.link"
						:key="index"
						v-for="(innerItem, index) in outerItem.items"
					>
					</v-list-item>
				</v-list>
			</v-menu>
		</v-btn>
		<v-divider vertical inset class="mx-2 d-none d-md-flex border-opacity-75"></v-divider>

		<!-- APP BAR RIGHT -->
		<tooltip-container-component
			location="bottom"
			class-btn="d-none d-sm-flex"
			:id="IDAppbarBasketBtn"
			:icon="appBarIcons.basket.icon"
			:tooltip="appBarIcons.basket.tooltip"
			:tooltip-opened="appBarIcons.basket.showTooltip"
			@toggle-drawer="basketDrawer = !basketDrawer"
		></tooltip-container-component>
		<v-divider vertical inset class="mx-2 border-opacity-75"></v-divider>
		<tooltip-container-component
			location="bottom"
			class-btn="d-none d-sm-flex"
			:id="IDAppbarLoginBtn"
			:icon="appBarIcons.login.icon"
			:tooltip="appBarIcons.login.tooltip"
			:tooltip-opened="appBarIcons.login.showTooltip"
			@toggle-drawer="loginDrawer = !loginDrawer"
		></tooltip-container-component>
		<tooltip-container-component
			location="bottom"
			class-btn="d-sm-none"
			:id="IDAppbarOptionsBtn"
			:icon="appBarIcons.options.icon"
			:tooltip="appBarIcons.options.tooltip"
			:tooltip-opened="appBarIcons.options.showTooltip"
			@toggle-drawer="optionsDrawer = !optionsDrawer"
		></tooltip-container-component>
	</v-app-bar>
	<navigation-drawer-menu-component></navigation-drawer-menu-component>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RouteRecordName } from "vue-router";

// Stores
import useHeaderStore from "@stores/store-header.js";

// Components
import ImgComp from "@components/common/img/common-img.vue";
import TooltipComp from "@components/common/tooltip/common-tooltip.vue";
import NavigationDrawerMenuComp from "@components/uncommon/header/uncommon-header-navigation-menu.vue";

// Interfaces
import { IHeaderAppbarIconsState } from "@declarations/common/header/interfaces/appbar/common-interface-header-appbar.js";
import {
	IHeaderNavigationCommonItemState,
	IHeaderNavigationCommonNonMobileItemState,
} from "@declarations/common/header/interfaces/navigation/common-interface-header-navigation.js";

// Enums
import { ElementIDs } from "@enums/enums.js";

export default defineComponent({
	name: "header-component",
	components: {
		"img-container-component": ImgComp,
		"tooltip-container-component": TooltipComp,
		"navigation-drawer-menu-component": NavigationDrawerMenuComp,
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
		IDAppbarOptionsBtn(): string {
			return ElementIDs.APPBAR_LOGIN_BTN;
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
		navigationMobileMenu(): IHeaderNavigationCommonItemState[] {
			return this.storeHeader.getNavigationMobileMenu;
		},
		navigationNonMobileMenu(): IHeaderNavigationCommonNonMobileItemState[] {
			return this.storeHeader.getNavigationNonMobileMenu;
		},

		// Conditional
		menuDrawer: {
			get(): boolean {
				return this.storeHeader.getAppBarMenuDrawer;
			},
			set(newValue: boolean): void {
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
		optionsDrawer: {
			get(): boolean {
				return this.storeHeader.getAppBarLoginDrawer;
			},
			set(newValue: boolean): void {
				this.storeHeader.setAppBarLoginDrawer(newValue);
			},
		},
	},
	methods: {
		navigatePage(routeName: string): void {
			const allRoutes = this.$router.getRoutes();
			allRoutes.forEach((element) => {
				if (element.name !== "") this.$router.push({ name: routeName });
			});
		},
	},
	setup() {
		const storeHeader = useHeaderStore();
		return { storeHeader };
	},
});
</script>
