import { defineStore } from "pinia";

// Interfaces
import IHeaderState from "@declarations/common/header/interfaces/common-interface-header.js";
import IHeaderAppBarState, {
	IHeaderAppbarIconsState,
} from "@declarations/common/header/interfaces/appbar/common-interface-header-appbar.js";
import {
	IHeaderNavigationLinksState,
	IHeaderNavigationProfileState,
} from "@declarations/common/header/interfaces/navigation/common-interface-header-navigation.js";

// Constants
import {
	// Text
	txtNavigation,
	txtNavigationLinks,

	// Icons
	iconsAppBar,
	iconsNavigation,
	tooltipsAppBar,
} from "@constants/common/primitive/common-constants-primative.js";

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
			},
		},
		navigation: {
			links: {
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
		getAppBar: (state: IHeaderState): IHeaderAppBarState => state.appBar,
		getAppBarIcons: (state: IHeaderState): IHeaderAppbarIconsState => state.appBar.icons,
		getNavigationLinks: (state: IHeaderState): IHeaderNavigationLinksState => state.navigation.links,
		getNavigationLinksDrawer: (state: IHeaderState): boolean => state.navigation.links.drawer,
		getNavigationProfile: (state: IHeaderState): IHeaderNavigationProfileState => state.navigation.profile,
		getNavigationProfileDrawer: (state: IHeaderState): boolean => state.navigation.profile.drawer,
	},
	actions: {
		setNavigationLinksDrawer(newValue: boolean): void {
			this.navigation.links.drawer = newValue;
		},
		setNavigationProfileDrawer(newValue: boolean): void {
			this.navigation.profile.drawer = newValue;
		},
	},
});

export default useHeaderStore;
