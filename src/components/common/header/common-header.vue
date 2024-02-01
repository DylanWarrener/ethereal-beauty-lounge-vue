<template>
	<v-app-bar elevation="0" scroll-behavior="hide" color="accent">
		<!-- APP BAR LEFT -->
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
		<menu-container-component
			menu-location="bottom"
			btn-class="d-flex d-md-none"
			:tooltip-text="tooltip_appBarMobileMenuBtn"
			:btn-id="id_appBarMobileMenuBtn"
			:btn-icon="icon_appBarMobileMenuBtn"
			@toggle-menu-drawer="data_appBarMobileMenuDrawerState = !data_appBarMobileMenuDrawerState"
		></menu-container-component>
		<menu-container-component
			menu-location="bottom"
			:tooltip-text="tooltip_appBarSearchBtn"
			:btn-id="id_appBarSearchBtn"
			:btn-icon="icon_appBarSearchBtn"
			@toggle-menu-drawer="data_appBarSearchDrawerState = !data_appBarSearchDrawerState"
		></menu-container-component>
		<v-spacer></v-spacer>

		<!-- APP BAR MIDDLE -->
		<v-btn
			class="nav-text__underline d-none d-md-flex"
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
		<menu-container-component
			menu-location="bottom"
			btn-class="d-none d-sm-flex"
			:tooltip-text="tooltip_appBarBasketBtn"
			:btn-id="id_appBarBasketBtn"
			:btn-icon="icon_appBarBasketBtn"
			@toggle-menu-drawer="data_appBarBasketDrawerState = !data_appBarBasketDrawerState"
		></menu-container-component>
		<v-divider vertical inset class="mx-2 border-opacity-75"></v-divider>
		<menu-container-component
			menu-location="bottom"
			btn-class="d-none d-sm-flex"
			:tooltip-text="tooltip_appBarLoginBtn"
			:btn-id="id_appbarLoginBtn"
			:btn-icon="icon_appBarLoginBtn"
			@toggle-menu-drawer="data_appBarLoginDrawerState = !data_appBarLoginDrawerState"
		></menu-container-component>
		<menu-container-component
			menu-location="bottom"
			btn-class="d-sm-none"
			:tooltip-text="tooltip_appBarOptionsBtn"
			:btn-id="id_appBarOptionsBtn"
			:btn-icon="icon_appBarOptionsBtn"
			@toggle-menu-drawer="data_appBarOptionsDrawerState = !data_appBarOptionsDrawerState"
		></menu-container-component>
	</v-app-bar>
	<navigation-mobile-menu-component></navigation-mobile-menu-component>
</template>

<script lang="ts">
import { defineComponent, mergeProps } from "vue";

// Stores
import { useCommonStore } from "@plugins/pinia/pinia.js";
import useHeaderStore from "@stores/store-header.js";

// Components
import MenuComp from "@components/common/menu/common-menu.vue";
import TooltipComp from "@components/common/tooltip/common-tooltip.vue";
import BtnComp from "@components/common/button/common-btn.vue";
import NavigationMobileMenuComp from "@components/uncommon/navigation/uncommon-header-navigation-menu.vue";
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
		"menu-container-component": MenuComp,
		"tooltip-container-component": TooltipComp,
		"button-container-component": BtnComp,
		"navigation-mobile-menu-component": NavigationMobileMenuComp,
		"dialog-login-component": DialogLoginComp,
	},
	computed: {
		/* Text */
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
		data_appBarMobileMenuDrawerState: {
			get(): boolean {
				return this.storeHeader.getAppBarMobileMenuDrawerState;
			},
			set(newValue: boolean): void {
				this.storeHeader.setAppBarMobileMenuDrawerState(newValue);
			},
		},
		data_appBarSearchDrawerState: {
			get(): boolean {
				return this.storeHeader.getAppBarSearchDrawerState;
			},
			set(newValue: boolean): void {
				this.storeHeader.setAppBarSearchDrawerState(newValue);
			},
		},
		data_appBarBasketDrawerState: {
			get(): boolean {
				return this.storeHeader.getAppBarBasketDrawerState;
			},
			set(newValue: boolean): void {
				this.storeHeader.setAppBarBasketDrawerState(newValue);
			},
		},
		data_appBarLoginDrawerState: {
			get(): boolean {
				return this.storeHeader.getAppBarLoginDrawerState;
			},
			set(newValue: boolean): void {
				this.storeHeader.setAppBarLoginDrawerState(newValue);
			},
		},
		data_appBarOptionsDrawerState: {
			get(): boolean {
				return this.storeHeader.getAppBarOptionsDrawerState;
			},
			set(newValue: boolean): void {
				this.storeHeader.setAppBarOptionsDrawerState(newValue);
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
		mergeProps,
		navigatePage(routeName: string): void {
			const allRoutes = this.$router.getRoutes();
			const isRouteNameValid: boolean = allRoutes.some((obj) => obj.name === routeName);
			if (isRouteNameValid) this.$router.push({ name: routeName });
		},
	},
	setup() {
		const storeCommon = useCommonStore();
		const storeHeader = useHeaderStore();
		return { storeCommon, storeHeader };
	},
});
</script>