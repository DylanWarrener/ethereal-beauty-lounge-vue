export default interface IHeaderNavigationDrawersState {
	links: IHeaderNavigationLinksDrawerState;
	profile: IHeaderNavigationProfileDrawerState;
}
export interface IHeaderNavigationDrawersCommonState {
	open: boolean;
}
export interface IHeaderNavigationLinksDrawerState extends IHeaderNavigationDrawersCommonState {}
export interface IHeaderNavigationProfileDrawerState extends IHeaderNavigationDrawersCommonState {}
