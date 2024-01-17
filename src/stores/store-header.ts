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
				login: {
					icon: iconsAppBar.login,
					tooltip: tooltipsAppBar.login,
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
		getAppBarMenuDrawer: (state: IHeaderState): boolean => state.appBar.icons.menu.showDrawer,
		getAppBarSearchDrawer: (state: IHeaderState): boolean => state.appBar.icons.search.showDrawer,
		getAppBarBasketDrawer: (state: IHeaderState): boolean => state.appBar.icons.basket.showDrawer,
		getAppBarLoginDrawer: (state: IHeaderState): boolean => state.appBar.icons.login.showDrawer,
		getAppBarProfileDrawer: (state: IHeaderState): boolean => state.appBar.icons.profile.showDrawer,
		getAppBarOptionsDrawer: (state: IHeaderState): boolean => state.appBar.icons.options.showDrawer,

		/* Navigation */
		getNavigationMobileMenu: (state: IHeaderState): IHeaderNavigationCommonItemState[] =>
			state.navigation.mobileMenu.items,
		getNavigationNonMobileMenu: (state: IHeaderState): IHeaderNavigationCommonNonMobileItemState[] =>
			state.navigation.nonMobileMenu.items,
	},
	actions: {
		/* AppBar */
		setAppBarMenuDrawer(newValue: boolean): void {
			this.appBar.icons.menu.showDrawer = newValue;
		},
		setAppBarSearchDrawer(newValue: boolean): void {
			this.appBar.icons.search.showDrawer = newValue;
		},
		setAppBarBasketDrawer(newValue: boolean): void {
			this.appBar.icons.basket.showDrawer = newValue;
		},
		setAppBarLoginDrawer(newValue: boolean): void {
			this.appBar.icons.login.showDrawer = newValue;
		},
	},
});

export default useHeaderStore;
