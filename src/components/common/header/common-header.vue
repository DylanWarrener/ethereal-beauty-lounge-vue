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

		<!-- APP BAR MIDDLE - Text navs -->
		<v-btn class="nav-text__underline d-none d-md-flex" :to="appbar.navigation.btn.home.link">
			{{ appbar.navigation.btn.home.text }}
		</v-btn>
		<v-btn class="nav-text__underline d-none d-md-flex" :to="appbar.navigation.btn.treatments.link">
			{{ appbar.navigation.btn.treatments.text }}
		</v-btn>
		<v-btn class="nav-text__underline d-none d-md-flex" :to="appbar.navigation.btn.store.link">
			{{ appbar.navigation.btn.store.text }}
		</v-btn>
		<button-text-menu-container-component
			btn-class="d-none d-md-flex"
			menu-transition="slide-y-transition"
			:btn-append-icon="appbar.navigation.btn.information.icon"
			:btn-text="appbar.navigation.btn.information.text"
		>
			<template #menu-items>
				<v-list nav variant="text" bg-color="accent" base-color="white" color="black">
					<v-list-item 
						class="text-inverted text-uppercase" 
						:to="appbar.navigation.btn.contact.link"
					>
						<span class="text-uppercase" v-text="appbar.navigation.btn.contact.text"></span>
					</v-list-item>
					<v-list-item 
						class="text-inverted text-uppercase" 
						:to="appbar.navigation.btn.reviews.link"
					>
						<span class="text-uppercase" v-text="appbar.navigation.btn.reviews.text"></span>
					</v-list-item>
					<v-list-item 
						class="text-inverted text-uppercase"
						:to="appbar.navigation.btn.about.link"
					>
						<span class="text-uppercase" v-text="appbar.navigation.btn.about.text"></span>
					</v-list-item>
				</v-list>
			</template>
		</button-text-menu-container-component>
		<v-divider vertical inset class="mx-2 d-none d-md-flex border-opacity-100"></v-divider>

		<!-- APP BAR RIGHT - Icon navs -->
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
		></v-divider>
		<menu-container-component 
			menu-location="bottom"
			btn-class="d-none d-sm-flex"
			:tooltip-text="tooltip_appBarAccountBtn"
			:btn-id="id_appbarAccountBtn"
			:btn-icon="icon_appBarAccountBtn"
			@toggle-menu-drawer="data_appBarAccountDrawerState = !data_appBarAccountDrawerState"
		>
			<template #menu-items>

			</template>
		</menu-container-component>
		<menu-container-component
			menu-location="bottom"
			btn-class="mr-2 d-sm-none"
			:tooltip-text="tooltip_appBarOptionsBtn"
			:btn-id="id_appBarOptionsBtn"
			:btn-icon="icon_appBarOptionsBtn"
			@toggle-menu-drawer="data_appBarOptionsDrawerState = !data_appBarOptionsDrawerState"
		></menu-container-component>
	</v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Stores
import useCommonStore from "@stores/store-common.js";
import useHeaderStore from "@stores/store-header.js";
import useFirebaseStore from "@stores/store-firebase.js";

// Components
import MenuComp from "@components/common/menu/common-menu.vue";
import TooltipComp from "@components/common/tooltip/common-tooltip.vue";
import BtnComp from "@components/common/button/common-btn.vue";
import DialogLoginComp from "@components/uncommon/dialog/uncommon-dialog-login.vue";
import BtnTextMenuContainerComp from "@components/common/button/menu/common-button-text-menu.vue"

// Interfaces
import { IHeaderAppbarIconsState } from "@declarations/common/header/interfaces/appbar/common-interface-header-appbar.js";
import { IHeaderNavigationCommonNonMobileItemState } from "@declarations/common/header/interfaces/navigation/common-interface-header-navigation.js";

// Enums
import { ElementIDs } from "@enums/enums.js";

// Constants
import { txtRouteNames, txtRouteLinks } from "@constants/common/objects/common-constants-objects.js";

// Icons
import { mdiAccount, mdiBasket, mdiMenu, mdiMenuUp, mdiMenuDown } from "@constants/common/primitives/icons/common-constants-primative-icons.js";

export default defineComponent({
	name: "header-container-component",
	components: {
		"menu-container-component": MenuComp,
		"tooltip-container-component": TooltipComp,
		"button-container-component": BtnComp,
		"dialog-login-component": DialogLoginComp,
		"button-text-menu-container-component": BtnTextMenuContainerComp
	},
	data() {
		return {
			appbar: {
				navigation: {
					btn: {
						mobileMenu: {
							icon: mdiMenu,
							tooltip: "Menu"
						},
						home: {
							text: txtRouteNames.home,
							link: txtRouteLinks.home
						},
						treatments: {
							text: txtRouteNames.treatments,
							link: txtRouteLinks.treatments
						},
						store: {
							text: txtRouteNames.store,
							link: txtRouteLinks.store
						},
						information: {
							text: "Information",
							icon: mdiMenuDown
						},
						contact: {
							text: txtRouteNames.contact,
							link: txtRouteLinks.contact
						},
						reviews: {
							text: txtRouteNames.reviews,
							link: txtRouteLinks.reviews
						},
						about: {
							text: txtRouteNames.about,
							link: txtRouteLinks.about
						},
						basket: {
							icon: mdiBasket,
							tooltip: "Basket"
						},
						account: {
							icon: mdiAccount,
							tooltip: "Account"
						}
					}
				}
			}
		};
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
			return this.storeFirebase.getIsUserLoggedIn;
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
		// mergeProps,
		// navigatePage(routeName: string): void {
		// 	const allRoutes = this.$router.getRoutes();
		// 	const isRouteNameValid: boolean = allRoutes.some((obj) => obj.name === routeName);
		// 	if (isRouteNameValid) this.$router.push({ name: routeName });
		// },
		logout(): void {
			this.storeFirebase.logout();
		},
	},
	setup() {
		const storeFirebase = useFirebaseStore();
		const storeCommon = useCommonStore();
		const storeHeader = useHeaderStore();
		return { storeFirebase, storeCommon, storeHeader };
	},
});
</script>
