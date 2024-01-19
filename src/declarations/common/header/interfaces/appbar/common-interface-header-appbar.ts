export default interface IHeaderAppBarState {
	icons: IHeaderAppbarIconsState;
}
export interface IHeaderAppBarCommonIconState {
	icon: string;
	tooltip: string;
	showTooltip: boolean;
}
export interface IHeaderAppbarIconsState {
	menu: IHeaderAppBarCommonIconState;
	search: IHeaderAppBarCommonIconState;
	basket: IHeaderAppBarCommonIconState;
	login: IHeaderAppBarCommonIconState;
	profile: IHeaderAppBarCommonIconState;
	options: IHeaderAppBarCommonIconState;
}
