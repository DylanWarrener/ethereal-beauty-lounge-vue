import { defineStore } from 'pinia';

// Interfaces
import IHeaderState from '@declarations/common/header/interfaces/common-interface-header.js';
import IHeaderAppBarState, { IHeaderAppbarIconsState } from '@declarations/common/header/interfaces/appbar/common-interface-header-appbar.js';
import { IHeaderNavigationMenuState, IHeaderNavigationProfileState } from '@declarations/common/header/interfaces/navigation/common-interface-header-navigation.js';

// Constants
import {
	// Text
	txtNavigation,
	txtNavigationLinks,

	// Icons
	iconsAppBar,
	iconsNavigation,
	tooltipsAppBar,
} from '@constants/common/primitive/common-constants-primative.js';

// Enums
import { StoreIDs } from '@enums/enums.js';

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
			},
		},
		navigation: {
			menu: {
				items: {
					home: {
						title: txtNavigation.home,
						icon: iconsNavigation.home,
						link: txtNavigationLinks.home,
					},
					treatments: {
						title: txtNavigation.treatments,
						icon: iconsNavigation.treatments,
						link: txtNavigationLinks.treatments,
					},
					store: {
						title: txtNavigation.store,
						icon: iconsNavigation.store,
						link: txtNavigationLinks.store,
					},
					contact: {
						title: txtNavigation.contact,
						icon: iconsNavigation.contact,
						link: txtNavigationLinks.contact,
					},
					reviews: {
						title: txtNavigation.reviews,
						icon: iconsNavigation.reviews,
						link: txtNavigationLinks.reviews,
					},
					about: {
						title: txtNavigation.about,
						icon: iconsNavigation.about,
						link: txtNavigationLinks.about,
					},
				},
				drawer: false,
			},
			profile: {
				items: {},
				drawer: false,
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

		/* Navigation */
		getNavigationMenu: (state: IHeaderState): IHeaderNavigationMenuState => state.navigation.menu,
		getNavigationProfile: (state: IHeaderState): IHeaderNavigationProfileState => state.navigation.profile,
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
		setAppBarProfileDrawer(newValue: boolean): void {
			this.appBar.icons.profile.showDrawer = newValue;
		},

		/* Navigation */
		setNavigationMenuDrawer(newValue: boolean): void {
			this.navigation.menu.drawer = newValue;
		},
		setNavigationProfileDrawer(newValue: boolean): void {
			this.navigation.profile.drawer = newValue;
		},
	},
});

export default useHeaderStore;
