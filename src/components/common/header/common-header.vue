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
		<navigation-pages-non-mobile-menu></navigation-pages-non-mobile-menu>

		<v-divider vertical inset class="mx-2 d-flex d-lg-none border-opacity-100"></v-divider>

		<!-- APP BAR RIGHT - Icon navs -->
		<menu-container-component
			menu-location="bottom"
			btn-class="d-flex d-lg-none"
			:tooltip-text="tooltip_appBarBasketBtn"
			:btn-id="id_appBarBasketBtn"
			:btn-icon="icon_appBarBasketBtn"
			@toggle-menu-drawer="data_appBarBasketDrawerState = !data_appBarBasketDrawerState"
		></menu-container-component>
		<menu-container-component
			menu-location="bottom"
			:tooltip-text="tooltip_appBarAccountBtn"
			:btn-id="id_appbarAccountBtn"
			:btn-icon="icon_appBarAccountBtn"
			v-if="!data_isUserLoggedIn"
			@toggle-menu-drawer="data_appBarAccountDrawerState = !data_appBarAccountDrawerState"
		>
			<template #menu-items>
				<v-list nav variant="text" bg-color="accent" base-color="white" color="black">
					<v-list-item class="text-inverted text-uppercase" to="/login">
						<span class="text-uppercase">Log in</span>
					</v-list-item>
					<v-list-item class="text-inverted text-uppercase" to="/register">
						<span class="text-uppercase">Register</span>
					</v-list-item>
				</v-list>
			</template>
		</menu-container-component>
		<v-tooltip location="bottom" :text="tooltip_appBarAccountBtn" v-else>
			<template #activator="{ props }">
				<v-btn
					icon
					variant="flat"
					density="compact"
					class="bg-white d-flex d-lg-none"
					:to="txt_accountPageLink"
					v-text="computed_data_user_initials"
					v-bind="props"
				></v-btn>
			</template>
		</v-tooltip>

		<!-- <v-tooltip location="bottom" :text="tooltip_appBarAccountBtn" v-else>
			<template #activator="{ props }">
				<v-btn :icon="icon_appBarAccountBtn" v-bind="props" @click="method_event_navigateToAccount"></v-btn>
			</template>
		</v-tooltip> -->
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
import NavigationPagesNonMobileMenuContainerComp from "@components/uncommon/navigation/pages/non-mobile-menu/uncommon-navigation-pages-non-mobile-menu.vue";

// Interfaces
import { IHeaderAppbarIconsState } from "@declarations/common/header/interfaces/appbar/common-interface-header-appbar.js";
import { IHeaderNavigationCommonNonMobileItemState } from "@declarations/common/header/interfaces/navigation/common-interface-header-navigation.js";

// Enums
import { ElementIDs } from "@enums/enums.js";

// Constants
import { txtRouteNames, txtRouteLinks } from "@constants/common/objects/common-constants-objects.js";

// Icons
import { mdiAccount, mdiBasket, mdiMenu } from "@constants/common/primitives/icons/common-constants-primative-icons.js";

export default defineComponent({
	name: "header-container-component",
	components: {
		"menu-container-component": MenuComp,
		"tooltip-container-component": TooltipComp,
		"button-container-component": BtnComp,
		"dialog-login-component": DialogLoginComp,
		"navigation-pages-non-mobile-menu": NavigationPagesNonMobileMenuContainerComp,
	},
	data() {
		return {
			appbar: {
				navigation: {
					btn: {
						mobileMenu: {
							icon: mdiMenu,
							tooltip: "Menu",
						},
						basket: {
							icon: mdiBasket,
							tooltip: "Basket",
						},
						account: {
							icon: mdiAccount,
							tooltip: "Account",
						},
					},
				},
			},
		};
	},
	computed: {
		/* Text */
		txt_homePageLink(): string {
			return txtRouteLinks.home;
		},
		txt_accountPageLink(): string {
			return txtRouteLinks.account;
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
		computed_data_user_initials(): string | null {
			let retval: string | null = null;
			if (this.computed_data_userDisplayName !== null) {
				const [firstname, lastname] = this.computed_data_userDisplayName.split(" ");
				retval = `${firstname[0]}${lastname[0]}`.toUpperCase();
			}
			return retval;
		},
		computed_data_userDisplayName(): string | null {
			return this.storeFirebase.getUserDisplayName ?? "No data";
		},
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
		method_event_navigateToAccount(): void {
			this.$router.push({ name: txtRouteNames.account });
		},
		method_event_logout(): void {
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
