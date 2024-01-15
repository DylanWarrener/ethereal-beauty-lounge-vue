// Interfaces
import IHeaderAppBarState from "@declarations/common/header/interfaces/appbar/common-interface-header-appbar.js";
import IHeaderNavigationDrawersState from "@declarations/common/header/interfaces/navigation/common-interface-header-navigation.js";

export default interface IHeaderState {
	appBar: IHeaderAppBarState;
	navigationDrawers: IHeaderNavigationDrawersState;
}
export interface IHeaderData {}
