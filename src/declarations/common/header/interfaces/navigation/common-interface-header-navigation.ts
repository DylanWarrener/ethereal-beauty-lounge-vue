export default interface IHeaderNavigationState {
	menu: IHeaderNavigationMenuState;
	profile: IHeaderNavigationProfileState;
}
export interface IHeaderNavigationCommonState {
	items: IHeaderNavigationCommonObjectState;
	drawer: boolean;
}
export interface IHeaderNavigationCommonObjectState {
	[key: string]: IHeaderNavigationCommonItemState;
}
export interface IHeaderNavigationCommonItemState {
	title: string;
	icon: string;
	link: string;
}
export interface IHeaderNavigationMenuState extends IHeaderNavigationCommonState {}
export interface IHeaderNavigationProfileState extends IHeaderNavigationCommonState {}
