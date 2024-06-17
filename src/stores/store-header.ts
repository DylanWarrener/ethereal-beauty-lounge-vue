import { defineStore } from "pinia";

// Interfaces
import IHeaderState from "@declarations/common/header/interfaces/common-interface-header.js";
import IHeaderAppBarState, {
	IHeaderAppbarIconsState,
} from "@declarations/common/header/interfaces/appbar/common-interface-header-appbar.js";
import {
	IHeaderNavigationCommonItemState,
	IHeaderNavigationCommonNonMobileItemState,
} from "@declarations/common/header/interfaces/navigation/common-interface-header-navigation.js";

// Constants
import { NAVIGATION_MOBLE_MENU, NAVIGATION_NON_MOBILE_MENU } from "@constants/common/arrays/common-constants-arrays.js";
import { iconsAppBar, tooltipsAppBar } from "@base/src/constants/common/objects/common-constants-objects.js";

// Enums
import { StoreIDs } from "@enums/enums.js";

const useHeaderStore = defineStore(StoreIDs.HEADER_STORE, {
	state: (): IHeaderState => ({
		appBar: {
			icons: {
				menu: {
					icon: iconsAppBar.menu,
					tooltip: tooltipsAppBar.menu,
					showTooltip: false,
					showDrawer: false,
				},
				search: {
					icon: iconsAppBar.search,
					tooltip: tooltipsAppBar.search,
					showTooltip: false,
					showDrawer: false,
				},
				basket: {
					icon: iconsAppBar.basket,
					tooltip: tooltipsAppBar.basket,
					showTooltip: false,
					showDrawer: false,
				},
				account: {
					icon: iconsAppBar.account,
					tooltip: tooltipsAppBar.account,
					showTooltip: false,
					showDrawer: false,
				},
				profile: {
					icon: iconsAppBar.profile,
					tooltip: tooltipsAppBar.profile,
					showTooltip: false,
					showDrawer: false,
				},
				options: {
					icon: iconsAppBar.options,
					tooltip: tooltipsAppBar.options,
					showTooltip: false,
					showDrawer: false,
				},
			},
		},
		navigation: {
			mobileMenu: {
				items: NAVIGATION_MOBLE_MENU,
			},
			nonMobileMenu: {
				items: NAVIGATION_NON_MOBILE_MENU,
			},
		},
	}),
	getters: {
		/* AppBar */
		getAppBar: (state: IHeaderState): IHeaderAppBarState => state.appBar,
		getAppBarIcons: (state: IHeaderState): IHeaderAppbarIconsState => state.appBar.icons,
		getAppBarMobileMenuDrawerState: (state: IHeaderState): boolean => {
			debugger;
			return state.appBar.icons.menu.showDrawer;
		},
		getAppBarMobileMenuTooltipDrawerState: (state: IHeaderState): boolean => state.appBar.icons.menu.showTooltip,
		getAppBarSearchDrawerState: (state: IHeaderState): boolean => state.appBar.icons.search.showDrawer,
		getAppBarSearchTooltipDrawerState: (state: IHeaderState): boolean => state.appBar.icons.search.showTooltip,
		getAppBarBasketDrawerState: (state: IHeaderState): boolean => state.appBar.icons.basket.showDrawer,
		getAppBarBasketTooltipDrawerState: (state: IHeaderState): boolean => state.appBar.icons.basket.showTooltip,
		getAppBarAccountDrawerState: (state: IHeaderState): boolean => state.appBar.icons.account.showDrawer,
		getAppBarLoginTooltipDrawerState: (state: IHeaderState): boolean => state.appBar.icons.account.showTooltip,
		getAppBarProfileDrawerState: (state: IHeaderState): boolean => state.appBar.icons.profile.showDrawer,
		getAppBarProfileTooltipDrawerState: (state: IHeaderState): boolean => state.appBar.icons.profile.showTooltip,
		getAppBarOptionsDrawerState: (state: IHeaderState): boolean => state.appBar.icons.options.showDrawer,
		getAppBarOptionsTooltipDrawerState: (state: IHeaderState): boolean => state.appBar.icons.options.showTooltip,

		/* Navigation */
		getNavigationMobileMenuState: (state: IHeaderState): IHeaderNavigationCommonItemState[] =>
			state.navigation.mobileMenu.items,
		getNavigationNonMobileMenuState: (state: IHeaderState): IHeaderNavigationCommonNonMobileItemState[] =>
			state.navigation.nonMobileMenu.items,
	},
	actions: {
		/* AppBar */
		setAppBarMobileMenuDrawerState(newValue: boolean): void {
			debugger;
			this.appBar.icons.menu.showDrawer = newValue;
		},
		setAppBarMobileMenuTooltipDrawerState(newValue: boolean): void {
			this.appBar.icons.menu.showTooltip = newValue;
		},
		setAppBarSearchDrawerState(newValue: boolean): void {
			this.appBar.icons.search.showDrawer = newValue;
		},
		setAppBarSearchTooltipDrawer(newValue: boolean): void {
			this.appBar.icons.search.showTooltip = newValue;
		},
		setAppBarBasketDrawerState(newValue: boolean): void {
			this.appBar.icons.basket.showDrawer = newValue;
		},
		setAppBarBasketTooltipDrawer(newValue: boolean): void {
			this.appBar.icons.basket.showTooltip = newValue;
		},
		setAppBarAccountDrawerState(newValue: boolean): void {
			this.appBar.icons.account.showDrawer = newValue;
		},
		setAppBarLoginTooltipDrawer(newValue: boolean): void {
			this.appBar.icons.account.showTooltip = newValue;
		},
		setAppBarOptionsDrawerState(newValue: boolean): void {
			this.appBar.icons.options.showDrawer = newValue;
		},
		setAppBarOptionsTooltipDrawer(newValue: boolean): void {
			this.appBar.icons.options.showTooltip = newValue;
		},
	},
});

export default useHeaderStore;
