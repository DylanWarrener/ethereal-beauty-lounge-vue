import { defineStore } from "pinia";

// Interfaces
import IHeaderState from "@declarations/common/header/interfaces/common-interface-header.js";

// Constants
import { NAVIGATION_MOBLE_MENU, NAVIGATION_NON_MOBILE_MENU } from "@constants/common/arrays/common-constants-arrays.js";

// Enums
import { StoreIDs } from "@enums/enums.js";

const useHeaderStore = defineStore(StoreIDs.HEADER_STORE, {
	state: (): IHeaderState => ({
		appBar: {
			icons: {
				mobileMenu: {
					show: false,
				},
				information: {
					show: false,
				},
				basket: {
					show: false,
				},
				account: {
					show: false,
				},
			},
		},
		navigation: {
			mobileMenu: {
				items: NAVIGATION_MOBLE_MENU,
			},
			pcMenu: {
				items: NAVIGATION_NON_MOBILE_MENU,
			},
		},
	}),
	getters: {
		get_appBar_mobileMenu_show_state: (state: IHeaderState): boolean => state.appBar.icons.mobileMenu.show,
		get_appBar_information_show_state: (state: IHeaderState): boolean => state.appBar.icons.information.show,
		get_appBar_basket_show_state: (state: IHeaderState): boolean => state.appBar.icons.basket.show,
		get_appBar_account_show_state: (state: IHeaderState): boolean => state.appBar.icons.account.show,

		get_navigation_mobileMenu_state: (state: IHeaderState): any[] => state.navigation.mobileMenu.items,
		get_navigation_pcMenu_state: (state: IHeaderState): any[] => state.navigation.pcMenu.items,
	},
	actions: {
		set_appBar_mobileMenu_show_state(newValue: boolean): void {
			this.appBar.icons.mobileMenu.show = newValue;
		},
		set_appBar_information_show_state(newValue: boolean): void {
			this.appBar.icons.information.show = newValue;
		},
		set_appBar_basket_show_state(newValue: boolean): void {
			this.appBar.icons.basket.show = newValue;
		},
		set_appBar_account_show_state(newValue: boolean): void {
			this.appBar.icons.account.show = newValue;
		},
	},
});

export default useHeaderStore;
