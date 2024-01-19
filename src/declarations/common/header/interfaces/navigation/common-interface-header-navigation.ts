export default interface IHeaderNavigationState {
	mobileMenu: IHeaderNavigationMobileMenuState;
	nonMobileMenu: IHeaderNavigationNonMobileMenuState;
}

// ---------------------------------------------------------------------------------------------------------
// COMMON
// ---------------------------------------------------------------------------------------------------------
export interface IHeaderNavigationCommonItemState {
	title: string;
	icon?: string;
	link?: string;
}
export interface IHeaderNavigationCommonNonMobileItemState extends IHeaderNavigationCommonItemState {
	items?: IHeaderNavigationCommonItemState[];
}

// ---------------------------------------------------------------------------------------------------------
// UNCOMMON
// ---------------------------------------------------------------------------------------------------------
export interface IHeaderNavigationMobileMenuState {
	items: IHeaderNavigationCommonItemState[];
	showDrawer: boolean;
}
export interface IHeaderNavigationNonMobileMenuState {
	items: IHeaderNavigationCommonNonMobileItemState[];
	showDrawer: boolean;
}
