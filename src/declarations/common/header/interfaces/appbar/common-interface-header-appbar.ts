export default interface IHeaderAppBarState {
	icons: IHeaderAppbarIconsState;
}
export interface IHeaderAppBarCommonIconState {
	icon: string;
	tooltip: string;
	showTooltip: boolean;
	showDrawer: boolean;
}
export interface IHeaderAppbarIconsState {
	menu: IHeaderAppBarCommonIconState;
	search: IHeaderAppBarCommonIconState;
	basket: IHeaderAppBarCommonIconState;
	account: IHeaderAppBarCommonIconState;
	profile: IHeaderAppBarCommonIconState;
	options: IHeaderAppBarCommonIconState;
}
