<template>
	<v-app-bar elevation="0" scroll-behavior="hide" color="accent" v-model="data_appBarDrawerState">
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
		<!-- <menu-container-component
			menu-location="bottom"
			:tooltip-text="tooltip_appBarSearchBtn"
			:btn-id="id_appBarSearchBtn"
			:btn-icon="icon_appBarSearchBtn"
			@toggle-menu-drawer="data_appBarSearchDrawerState = !data_appBarSearchDrawerState"
		></menu-container-component> -->
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
		<v-divider
			vertical
			inset
			color="default"
			class="mx-2 border-opacity-75"
			v-if="data_isUserLoggedIn === false"
		></v-divider>

		<v-tooltip location="bottom" :text="tooltip_appBarAccountBtn" v-if="data_isUserLoggedIn === false">
			<template v-slot:activator="{ props }">
				<v-btn
					class="d-none d-sm-flex"
					:id="id_appbarAccountBtn"
					:icon="icon_appBarAccountBtn"
					v-bind="props"
					@click.stop="data_appBarAccountDrawerState = !data_appBarAccountDrawerState"
				></v-btn>
			</template>
		</v-tooltip>

		<menu-container-component
			menu-location="bottom"
			btn-class="mr-2 d-sm-none"
			:tooltip-text="tooltip_appBarOptionsBtn"
			:btn-id="id_appBarOptionsBtn"
			:btn-icon="icon_appBarOptionsBtn"
			@toggle-menu-drawer="data_appBarOptionsDrawerState = !data_appBarOptionsDrawerState"
		></menu-container-component>
	</v-app-bar>

	<navigation-container-component
		class="d-flex d-md-none"
		location="bottom"
		:navigation="data_mobileMenuNavigation"
		v-model="data_appBarMobileMenuDrawerState"
	></navigation-container-component>
</template>

<script lang="ts">
import { defineComponent, mergeProps } from "vue";

// Stores
import useCommonStore from "@stores/store-common.js";
import useHeaderStore from "@stores/store-header.js";
import useAuthStore from "@stores/store-auth.js";

// Components
import MenuComp from "@components/common/menu/common-menu.vue";
import TooltipComp from "@components/common/tooltip/common-tooltip.vue";
import BtnComp from "@components/common/button/common-btn.vue";
import NavigationContainerComp from "@components/common/navigation/common-navigation.vue";
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
	name: "header-container-component",
	components: {
		"menu-container-component": MenuComp,
		"tooltip-container-component": TooltipComp,
		"button-container-component": BtnComp,
		"dialog-login-component": DialogLoginComp,
		"navigation-container-component": NavigationContainerComp,
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
		id_appbarAccountBtn(): string {
			return ElementIDs.APPBAR_ACCOUNT_BTN;
		},
		id_appBarOptionsBtn(): string {
			return ElementIDs.APPBAR_OPTIONS_BTN;
		},
		// Tooltips
		tooltip_appBarMobileMenuBtn(): string {
			return this.icons_appBar.menu.tooltip;
		},
		tooltip_appBarSearchBtn(): string {
			return this.icons_appBar.search.tooltip;
		},
		tooltip_appBarBasketBtn(): string {
			return this.icons_appBar.basket.tooltip;
		},
		tooltip_appBarAccountBtn(): string {
			return this.icons_appBar.account.tooltip;
		},
		tooltip_appBarOptionsBtn(): string {
			return this.icons_appBar.options.tooltip;
		},

		/* Icons */
		icons_appBar(): IHeaderAppbarIconsState {
			return this.storeHeader.getAppBarIcons;
		},
		icon_appBarMobileMenuBtn(): string {
			return this.icons_appBar.menu.icon;
		},
		icon_appBarSearchBtn(): string {
			return this.icons_appBar.search.icon;
		},
		icon_appBarBasketBtn(): string {
			return this.icons_appBar.basket.icon;
		},
		icon_appBarAccountBtn(): string {
			return this.icons_appBar.account.icon;
		},
		icon_appBarOptionsBtn(): string {
			return this.icons_appBar.options.icon;
		},

		/* Data */
		data_isUserLoggedIn(): boolean {
			return this.storeAuth.isUserLoggedIn;
		},
		data_mobileMenuNavigation(): IHeaderNavigationCommonItemState[] {
			return this.storeHeader.getNavigationMobileMenuState;
		},
		navigationNonMobileMenu(): IHeaderNavigationCommonNonMobileItemState[] {
			return this.storeHeader.getNavigationNonMobileMenuState;
		},
		data_appBarDrawerState: {
			get(): boolean {
				return this.storeCommon.getAppBarDrawer;
			},
			set(newValue: boolean): void {
				this.storeCommon.setAppBarDrawer(newValue);
			},
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
		data_appBarAccountDrawerState: {
			get(): boolean {
				return this.storeHeader.getAppBarAccountDrawerState;
			},
			set(newValue: boolean): void {
				this.storeHeader.setAppBarAccountDrawerState(newValue);
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
	},
	methods: {
		/* Events */
		mergeProps,
		navigatePage(routeName: string): void {
			const allRoutes = this.$router.getRoutes();
			const isRouteNameValid: boolean = allRoutes.some((obj) => obj.name === routeName);
			if (isRouteNameValid) this.$router.push({ name: routeName });
		},
		logout(): void {
			this.storeCommon.logout();
		},
	},
	setup() {
		const storeAuth = useAuthStore();
		const storeCommon = useCommonStore();
		const storeHeader = useHeaderStore();
		return { storeAuth, storeCommon, storeHeader };
	},
});
</script>
