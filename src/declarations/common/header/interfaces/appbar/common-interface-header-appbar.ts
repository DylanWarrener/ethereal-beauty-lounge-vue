export default interface IHeaderAppBarState {
	icons: IHeaderAppBarIcons;
}
export interface IHeaderAppBarIcons {
	menu: {
		icon: string;
		tooltip: string;
		showTooltip: boolean;
	};
}
