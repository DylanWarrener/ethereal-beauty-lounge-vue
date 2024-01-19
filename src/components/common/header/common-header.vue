<template>
	<v-app-bar elevation="0" scroll-behavior="hide" color="accent">
		<!-- APP BAR LEFT -->
		<!-- <img-container-component></img-container-component> -->
		<v-card
			hover
			exact
			class="py-2"
			width="200"
			height="100"
			variant="flat"
			elevation="0"
			color="transparent"
			style="background: linear-gradient(90deg, rgba(255, 255, 255, 0.75) 0%, rgba(186, 119, 145, 1) 100%)"
			:to="txt_homePageLink"
			v-ripple="{ class: 'text-accent' }"
		>
			<v-img src="logo-transparent.png" width="200" height="100"></v-img>
		</v-card>
		<tooltip-container-component
			location="bottom"
			class-btn="d-md-none"
			:id="id_appBarMobileMenuBtn"
			:icon="icon_appBarMobileMenuBtn"
			:tooltip="tooltip_appBarMobileMenuBtn"
			@toggle-tooltip-drawer-state="toggleAppBarMobileMenuTooltipDrawerState"
			@toggle-drawer-state="toggleAppBarMobileMenuBtnDrawerState"
		></tooltip-container-component>
		<tooltip-container-component
			location="bottom"
			class-btn="ml-4"
			:id="id_appBarSearchBtn"
			:icon="icon_appBarSearchBtn"
			:tooltip="tooltip_appBarSearchBtn"
			@toggle-tooltip-drawer-state="toggleAppBarSearchTooltipDrawerState"
			@toggle-drawer-state=""
		></tooltip-container-component>
		<v-app-bar-title class="d-none d-md-flex text-capitalize">{{ txt_appBarTitle }}</v-app-bar-title>
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
				close-on-content-click
				location="bottom"
				transition="slide-y-transition"
				activator="parent"
				v-if="outerItem.items"
			>
				<v-list nav variant="text" bg-color="accent" base-color="white" color="black">
					<v-list-item
						:title="innerItem.title.toUpperCase()"
						:to="innerItem.link"
						:key="index"
						v-for="(innerItem, index) in outerItem.items"
					></v-list-item>
				</v-list>
			</v-menu>
		</v-btn>
		<v-divider vertical inset class="mx-2 d-none d-md-flex border-opacity-75"></v-divider>

		<!-- APP BAR RIGHT -->
		<tooltip-container-component
			location="bottom"
			class-btn="d-none d-sm-flex"
			:id="id_appBarBasketBtn"
			:icon="icon_appBarBasketBtn"
			:tooltip="tooltip_appBarBasketBtn"
			@toggle-tooltip-drawer-state="toggleAppBarBasketTooltipDrawerState"
			@toggle-drawer-state=""
		></tooltip-container-component>
		<v-divider vertical inset class="mx-2 border-opacity-75"></v-divider>
		<tooltip-container-component
			location="bottom"
			class-btn="d-none d-sm-flex"
			:id="id_appbarLoginBtn"
			:icon="icon_appBarLoginBtn"
			:tooltip="tooltip_appBarLoginBtn"
			@toggle-tooltip-drawer-state="toggleAppBarLoginTooltipDrawerState"
			@toggle-drawer-state="toggleAppBarLoginBtnDrawerState"
		></tooltip-container-component>
		<tooltip-container-component
			location="bottom"
			class-btn="d-sm-none"
			:id="id_appBarOptionsBtn"
			:icon="icon_appBarOptionsBtn"
			:tooltip="tooltip_appBarOptionsBtn"
			@toggle-tooltip-drawer-state="toggleAppBarOptionsTooltipDrawerState"
			@toggle-drawer-state=""
		></tooltip-container-component>
	</v-app-bar>
	<navigation-drawer-menu-component></navigation-drawer-menu-component>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RouteRecordName } from "vue-router";

// Stores
import { useCommonStore } from "@plugins/pinia/pinia.js";
import useHeaderStore from "@stores/store-header.js";

// Components
import ImgComp from "@components/common/img/common-img.vue";
import TooltipComp from "@components/common/tooltip/common-tooltip.vue";
import NavigationDrawerMenuComp from "@components/uncommon/header/navigation/uncommon-header-navigation-menu.vue";
import DialogLoginComp from "@components/uncommon/dialog/uncommon-dialog-login.vue";

// Interfaces
import { IHeaderAppbarIconsState } from "@declarations/common/header/interfaces/appbar/common-interface-header-appbar.js";
import {
	IHeaderNavigationCommonItemState,
	IHeaderNavigationCommonNonMobileItemState,
} from "@declarations/common/header/interfaces/navigation/common-interface-header-navigation.js";

// Enums
import { ElementIDs } from "@enums/enums.js";

// Constants
import { txtRouteLinks } from "@constants/common/objects/common-constants-objects.js";

export default defineComponent({
	name: "header-component",
	components: {
		"img-container-component": ImgComp,
		"tooltip-container-component": TooltipComp,
		"navigation-drawer-menu-component": NavigationDrawerMenuComp,
		"dialog-login-component": DialogLoginComp,
	},
	computed: {
		/* Text */
		txt_appBarTitle(): string {
			let retVal: string = "";
			if (this.$route.name) {
				const currentPageName: RouteRecordName = this.$route.name;
				retVal = currentPageName.toString();
			}
			return retVal;
		},
		txt_homePageLink(): string {
			return txtRouteLinks.home;
		},
		// IDs
		id_appBarMobileMenuBtn(): string {
			return ElementIDs.APPBAR_MENU_BTN;
		},
		id_appBarSearchBtn(): string {
			return ElementIDs.APPBAR_SEARCH_BTN;
		},
		id_appBarBasketBtn(): string {
			return ElementIDs.APPBAR_BASKET_BTN;
		},
		id_appbarLoginBtn(): string {
			return ElementIDs.APPBAR_LOGIN_BTN;
		},
		id_appBarOptionsBtn(): string {
			return ElementIDs.APPBAR_OPTIONS_BTN;
		},
		// Tooltips
		tooltip_appBarMobileMenuBtn(): string {
			return this.data_appBarIcons.menu.tooltip;
		},
		tooltip_appBarSearchBtn(): string {
			return this.data_appBarIcons.search.tooltip;
		},
		tooltip_appBarBasketBtn(): string {
			return this.data_appBarIcons.basket.tooltip;
		},
		tooltip_appBarLoginBtn(): string {
			return this.data_appBarIcons.login.tooltip;
		},
		tooltip_appBarOptionsBtn(): string {
			return this.data_appBarIcons.options.tooltip;
		},

		/* Icons */
		icon_appBarMobileMenuBtn(): string {
			return this.data_appBarIcons.menu.icon;
		},
		icon_appBarSearchBtn(): string {
			return this.data_appBarIcons.search.icon;
		},
		icon_appBarBasketBtn(): string {
			return this.data_appBarIcons.basket.icon;
		},
		icon_appBarLoginBtn(): string {
			return this.data_appBarIcons.login.icon;
		},
		icon_appBarOptionsBtn(): string {
			return this.data_appBarIcons.options.icon;
		},

		/* Data */
		data_appBarIcons(): IHeaderAppbarIconsState {
			return this.storeHeader.getAppBarIcons;
		},
		// App bar icon drawer states
		data_appBarMobileMenuBtnDrawerState(): boolean {
			return this.storeHeader.navigation.mobileMenu.showDrawer;
		},
		data_appBarLoginBtnDrawerState(): boolean {
			return this.storeCommon.getDialogLoginDrawerState;
		},
		// App bar icon tooltip drawer states
		data_appBarMobileMenuBtnTooltipDrawer(): boolean {
			return this.data_appBarIcons.menu.showTooltip;
		},
		data_appBarSearchBtnTooltipDrawer(): boolean {
			return this.data_appBarIcons.search.showTooltip;
		},
		data_appBarBasketBtnTooltipDrawer(): boolean {
			return this.data_appBarIcons.basket.showTooltip;
		},
		data_appBarLoginBtnTooltipDrawer(): boolean {
			return this.data_appBarIcons.login.showTooltip;
		},
		data_appBarOptionsBtnTooltipDrawer(): boolean {
			return this.data_appBarIcons.options.showTooltip;
		},
		data_dialogLoginDrawerState: {
			get(): boolean {
				return this.storeCommon.getDialogLoginDrawerState;
			},
			set(newValue: boolean): void {
				this.storeCommon.setDialogLoginDrawerState(newValue);
			},
		},

		navigationMobileMenu(): IHeaderNavigationCommonItemState[] {
			return this.storeHeader.getNavigationMobileMenuState;
		},
		navigationNonMobileMenu(): IHeaderNavigationCommonNonMobileItemState[] {
			return this.storeHeader.getNavigationNonMobileMenuState;
		},
	},
	methods: {
		/* Events */
		navigatePage(routeName: string): void {
			const allRoutes = this.$router.getRoutes();
			const isRouteNameValid: boolean = allRoutes.some((obj) => obj.name === routeName);
			if (isRouteNameValid) this.$router.push({ name: routeName });
		},
		// App bar icon drawer state
		toggleAppBarMobileMenuBtnDrawerState(): void {
			this.storeHeader.setNavigationMobileMenuDrawerState(!this.data_appBarMobileMenuBtnDrawerState);
		},
		toggleAppBarLoginBtnDrawerState(): void {
			this.storeCommon.setDialogLoginDrawerState(!this.data_appBarLoginBtnDrawerState);
		},
		// App bar icon tooltip drawer state
		toggleAppBarMobileMenuTooltipDrawerState(newValue: boolean): void {
			this.storeHeader.setAppBarMobileMenuTooltipDrawer(newValue);
		},
		toggleAppBarSearchTooltipDrawerState(newValue: boolean): void {
			this.storeHeader.setAppBarSearchTooltipDrawer(newValue);
		},
		toggleAppBarBasketTooltipDrawerState(newValue: boolean): void {
			this.storeHeader.setAppBarBasketTooltipDrawer(newValue);
		},
		toggleAppBarLoginTooltipDrawerState(newValue: boolean): void {
			this.storeHeader.setAppBarLoginTooltipDrawer(newValue);
		},
		toggleAppBarOptionsTooltipDrawerState(newValue: boolean): void {
			this.storeHeader.setAppBarOptionsTooltipDrawer(newValue);
		},
	},
	setup() {
		const storeCommon = useCommonStore();
		const storeHeader = useHeaderStore();
		return { storeCommon, storeHeader };
	},
});
</script>
