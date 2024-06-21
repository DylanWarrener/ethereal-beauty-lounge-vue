export default interface IHeaderNavigationState {
	mobileMenu: IHeaderNavigationMobileMenuState;
	pcMenu: IHeaderNavigationNonMobileMenuState;
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
}
export interface IHeaderNavigationNonMobileMenuState {
	items: IHeaderNavigationCommonNonMobileItemState[];
}
