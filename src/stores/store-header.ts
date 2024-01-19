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
import {
	// Icons
	iconsAppBar,
	tooltipsAppBar,
} from "@base/src/constants/common/objects/common-constants-objects.js";

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
				},
				search: {
					icon: iconsAppBar.search,
					tooltip: tooltipsAppBar.search,
					showTooltip: false,
				},
				basket: {
					icon: iconsAppBar.basket,
					tooltip: tooltipsAppBar.basket,
					showTooltip: false,
				},
				login: {
					icon: iconsAppBar.login,
					tooltip: tooltipsAppBar.login,
					showTooltip: false,
				},
				profile: {
					icon: iconsAppBar.profile,
					tooltip: tooltipsAppBar.profile,
					showTooltip: false,
				},
				options: {
					icon: iconsAppBar.options,
					tooltip: tooltipsAppBar.options,
					showTooltip: false,
				},
			},
		},
		navigation: {
			mobileMenu: {
				items: NAVIGATION_MOBLE_MENU,
				showDrawer: false,
			},
			nonMobileMenu: {
				items: NAVIGATION_NON_MOBILE_MENU,
				showDrawer: false,
			},
		},
	}),
	getters: {
		/* AppBar */
		getAppBar: (state: IHeaderState): IHeaderAppBarState => state.appBar,
		getAppBarIcons: (state: IHeaderState): IHeaderAppbarIconsState => state.appBar.icons,

		/* Navigation */
		getNavigationMobileMenuState: (state: IHeaderState): IHeaderNavigationCommonItemState[] =>
			state.navigation.mobileMenu.items,
		getNavigationMobileMenuDrawerState: (state: IHeaderState): boolean => state.navigation.mobileMenu.showDrawer,
		getNavigationNonMobileMenuState: (state: IHeaderState): IHeaderNavigationCommonNonMobileItemState[] =>
			state.navigation.nonMobileMenu.items,
		getNavigationNonMobileMenuDrawerState: (state: IHeaderState): boolean =>
			state.navigation.nonMobileMenu.showDrawer,
	},
	actions: {
		/* AppBar */
		// App bar icon drawer states
		setNavigationMobileMenuDrawerState(newValue: boolean): void {
			this.navigation.mobileMenu.showDrawer = newValue;
		},
		// App bar icon tooltip drawer states
		setAppBarMobileMenuTooltipDrawer(newValue: boolean): void {
			this.appBar.icons.menu.showTooltip = newValue;
		},
		setAppBarSearchTooltipDrawer(newValue: boolean): void {
			this.appBar.icons.search.showTooltip = newValue;
		},
		setAppBarBasketTooltipDrawer(newValue: boolean): void {
			this.appBar.icons.basket.showTooltip = newValue;
		},
		setAppBarLoginTooltipDrawer(newValue: boolean): void {
			this.appBar.icons.login.showTooltip = newValue;
		},
		setAppBarOptionsTooltipDrawer(newValue: boolean): void {
			this.appBar.icons.options.showTooltip = newValue;
		},
	},
});

export default useHeaderStore;
