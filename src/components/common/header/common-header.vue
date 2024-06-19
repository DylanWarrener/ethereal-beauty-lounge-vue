<template>
	<v-app-bar elevation="0" scroll-behavior="hide" color="accent" density="comfortable" v-model="data_appBarDrawerState">
		<!-- APP BAR LEFT -->
		<common-card-container-component
			hover
			exact
			elevation="0"
			variant="flat"
			color="transparent"
			width="150"
			height="100%"
			style="background: linear-gradient(90deg, rgba(255, 255, 255, 0.75) 0%, rgba(186, 119, 145, 1) 100%)"
			:to="txt_homePageLink"
			v-ripple="{ class: 'text-accent' }"
		>
			<template #card-img>
				<v-col cols="12" class="pa-0" style="height: 100%">
					<v-img cover src="logo-transparent.png" width="100%" height="100%"></v-img>
				</v-col>
			</template>
		</common-card-container-component>
		<common-btn-tooltip-container-component :tooltip="tooltip_appBarMobileMenuBtn">
			<template #tooltip-btn="{ props }">
				<common-btn-container-component
					varient="flat"
					class="d-flex d-md-none"
					:id="id_appBarMobileMenuBtn"
					:icon="icon_appBarMobileMenuBtn"
					v-bind="props"
					@click="data_appBarMobileMenuDrawerState = !data_appBarMobileMenuDrawerState"
				></common-btn-container-component>
			</template>
		</common-btn-tooltip-container-component>
		<v-spacer></v-spacer>

		<!-- APP BAR MIDDLE - Text navs -->
		<common-navigation-pages-non-mobile-menu></common-navigation-pages-non-mobile-menu>

		<v-divider vertical inset class="mx-2 d-flex d-lg-none border-opacity-100"></v-divider>

		<!-- APP BAR RIGHT - Icon navs -->
		<common-btn-menu-container-component :tooltip-text="tooltip_appBarBasketBtn">
			<template #menu-btn="{ menuProps, tooltipProps }">
				<common-btn-container-component
					class="d-flex d-md-flex"
					:id="id_appBarBasketBtn"
					:icon="icon_appBarBasketBtn"
					v-bind="mergeProps(menuProps, tooltipProps)"
					@click="data_appBarBasketDrawerState = !data_appBarBasketDrawerState"
				></common-btn-container-component>
			</template>
		</common-btn-menu-container-component>
		<common-btn-menu-container-component :tooltip-text="tooltip_appBarAccountBtn" v-if="!data_isUserLoggedIn">
			<template #menu-btn="{ menuProps, tooltipProps }">
				<common-btn-container-component
					class="d-flex d-md-flex"
					:id="id_appbarAccountBtn"
					:icon="icon_appBarAccountBtn"
					v-bind="mergeProps(menuProps, tooltipProps)"
					@click="data_appBarAccountDrawerState = !data_appBarAccountDrawerState"
				></common-btn-container-component>
			</template>
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
		</common-btn-menu-container-component>
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
import { defineComponent, mergeProps } from "vue";

// Stores
import useCommonStore from "@stores/store-common.js";
import useHeaderStore from "@stores/store-header.js";
import useFirebaseStore from "@stores/store-firebase.js";

// Components
import CardContainerComp from "@components/common/card/common-card.vue";
import BtnTooltipContainerComp from "@components/common/button/tooltip/common-btn-tooltip.vue";
import BtnContainerComp from "@components/common/button/common-btn.vue";
import BtnMenuContainerComp from "@components/common/menu/common-menu.vue";
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
		"common-card-container-component": CardContainerComp,
		"common-btn-tooltip-container-component": BtnTooltipContainerComp,
		"common-btn-container-component": BtnContainerComp,
		"common-navigation-pages-non-mobile-menu": NavigationPagesNonMobileMenuContainerComp,
		"common-btn-menu-container-component": BtnMenuContainerComp,
		"dialog-login-component": DialogLoginComp,
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
			return this.storeFirebase.get_userAuth_displayName_state ?? "No data";
		},
		data_isUserLoggedIn(): boolean {
			return this.storeFirebase.get_userAuth_isLoggedIn_state;
		},
		navigationNonMobileMenu(): IHeaderNavigationCommonNonMobileItemState[] {
			return this.storeHeader.getNavigationNonMobileMenuState;
		},
		data_appBarDrawerState: {
			get(): boolean {
				return this.storeCommon.getAppbar_show_state;
			},
			set(newValue: boolean): void {
				this.storeCommon.setAppbar_show_state(newValue);
			},
		},
		data_appBarMobileMenuDrawerState: {
			get(): boolean {
				debugger;
				return this.storeHeader.getAppBarMobileMenuDrawerState;
			},
			set(newValue: boolean): void {
				debugger;
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
		mergeProps,
		method_event_navigateToAccount(): void {
			this.$router.push({ name: txtRouteNames.account });
		},
		method_event_logout(): void {
			this.storeFirebase.logout_userAuth();
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
