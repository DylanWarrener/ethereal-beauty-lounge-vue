import { defineStore } from "pinia";

// Constants
import { NAVIGATION_MOBLE_MENU, NAVIGATION_NON_MOBILE_MENU } from "@constants/common/arrays/common-constants-arrays.js";

// Enums
import { StoreIDs } from "@enums/enums.js";

const useHeaderStore = defineStore(StoreIDs.HEADER_STORE, {
	state: (): any => ({
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
			text: {
				signIn: {
					show: false,
				},
				signUp: {
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
		get_appBar_mobileMenu_show_state: (state: any): boolean => state.appBar.icons.mobileMenu.show,
		get_appBar_information_show_state: (state: any): boolean => state.appBar.icons.information.show,
		get_appBar_basket_show_state: (state: any): boolean => state.appBar.icons.basket.show,
		get_appBar_account_show_state: (state: any): boolean => state.appBar.icons.account.show,
		get_appBar_signIn_show_state: (state: any): boolean => state.appBar.text.signIn.show,
		get_appBar_signUp_show_state: (state: any): boolean => state.appBar.text.signUp.show,

		get_navigation_mobileMenu_state: (state: any): any[] => state.navigation.mobileMenu.items,
		get_navigation_pcMenu_state: (state: any): any[] => state.navigation.pcMenu.items,
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
		set_appBar_signIn_show_state(newValue: boolean): void {
			this.appBar.text.signIn.show = newValue;
		},
		set_appBar_signUp_show_state(newValue: boolean): void {
			this.appBar.text.signUp.show = newValue;
		},
	},
});

export default useHeaderStore;
