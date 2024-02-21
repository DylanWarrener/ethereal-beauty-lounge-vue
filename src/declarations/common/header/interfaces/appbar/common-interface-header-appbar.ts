export default interface IHeaderAppBarState {
	drawer: boolean;
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
	login: IHeaderAppBarCommonIconState;
	profile: IHeaderAppBarCommonIconState;
	options: IHeaderAppBarCommonIconState;
}
