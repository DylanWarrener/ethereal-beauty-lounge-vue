export default interface IHeaderNavigationState {
	links: IHeaderNavigationLinksState;
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
export interface IHeaderNavigationLinksState extends IHeaderNavigationCommonState {}
export interface IHeaderNavigationProfileState extends IHeaderNavigationCommonState {}
