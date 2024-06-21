export default interface IHeaderAppBarState {
	icons: IHeaderAppbarIconsState;
}
export interface IHeaderAppBarCommonIconState {
	show: boolean;
}
export interface IHeaderAppbarIconsState {
	mobileMenu: IHeaderAppBarCommonIconState;
	information: IHeaderAppBarCommonIconState;
	basket: IHeaderAppBarCommonIconState;
	account: IHeaderAppBarCommonIconState;
}
