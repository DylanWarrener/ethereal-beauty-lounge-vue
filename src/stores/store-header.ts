import { defineStore } from "pinia";

// Interfaces
import IHeaderState from "@declarations/common/header/interfaces/common-interface-header.js";
import IHeaderAppBarState, {
	IHeaderAppBarIcons,
} from "@declarations/common/header/interfaces/appbar/common-interface-header-appbar.js";
import IHeaderNavigationDrawersState, {
	IHeaderNavigationLinksDrawerState,
	IHeaderNavigationProfileDrawerState,
} from "@declarations/common/header/interfaces/navigation/common-interface-header-navigation.js";

// Constants
import { icons, tooltips } from "@constants/common/primitive/common-constants-primative.js";

const useHeaderStore = defineStore("header-store", {
	state: (): IHeaderState => ({
		appBar: {
			icons: {
				menu: {
					icon: icons.menu,
					tooltip: tooltips.menu,
					showTooltip: false,
				},
			},
		},
		navigationDrawers: {
			links: {
				open: false,
			},
			profile: {
				open: false,
			},
		},
	}),
	getters: {
		getAppBar: (state: IHeaderState): IHeaderAppBarState => state.appBar,
		getAppBarIcons: (state: IHeaderState): IHeaderAppBarIcons => state.appBar.icons,
		getNavigationDrawers: (state: IHeaderState): IHeaderNavigationDrawersState => state.navigationDrawers,
		getNavigationLinkDrawer: (state: IHeaderState): IHeaderNavigationLinksDrawerState => state.navigationDrawers.links,
		getNavigationProfileDrawer: (state: IHeaderState): IHeaderNavigationProfileDrawerState => state.navigationDrawers.profile,
	},
	actions: {},
});

export default useHeaderStore;
