import {
	mdiMenu,
	mdiHome,
	mdiEmail,
	mdiCommentQuestion,
	mdiInformation,
	mdiStore,
	mdiLotion,
	mdiBasketOutline,
	mdiMagnify,
	mdiAccount,
	mdiDotsVertical,
	mdiMenuDown,
	mdiClose,
	mdiMapMarker,
	mdiEmailFast,
	mdiPhone,
	mdiEye,
	mdiEyeOff,
	mdiLogout,
	mdiBasket,
	mdiAccountEdit,
	mdiSecurity,
	mdiBell,
	mdiImageEdit,
} from "@constants/common/primitives/icons/common-constants-primative-icons.js";

// ---------------------------------------------------------------------------------------------------------
// IDs
// ---------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------
// TEXT
// ---------------------------------------------------------------------------------------------------------
export const CONST_OBJECT_TEXT_GENERAL = {
	toggle: "Toggle",
};
/* Dialog */
export const CONST_OBJECT_TEXT_DIALOG_GENERAL = {
	close: "Close",
};
/* Appbar */
export const CONST_OBJECT_TEXT_APPBAR_GENERAL = {
	menu: "Menu",
	search: "Search",
	basket: "Basket",
	account: "Account",
	profile: "Profile",
	options: "Options",
};
/* Navigation groups */
export const CONST_OBJECT_TEXT_NAVIGATION_GROUPS = {
	information: "information",
};
/* Route names */
export const txtRouteNames = {
	home: "home",
	treatments: "treatments",
	portfolio: "portfolio",
	store: "store",
	contact: "contact",
	reviews: "reviews",
	about: "about",
	login: "login",
	register: "register",
	account: "Account",
	basket: "Basket",
};
/* Route links */
export const txtRouteLinks = {
	home: "/",
	treatments: "/treatments",
	portfolio: "/portfolio",
	store: "/store",
	contact: "/contact",
	reviews: "/reviews",
	about: "/about",
	login: "/login",
	register: "/register",
	account: "/account",
	basket: "/basket",
};

// ---------------------------------------------------------------------------------------------------------
// ICONS
// ---------------------------------------------------------------------------------------------------------
/* App bar */
export const CONST_OBJECT_ICONS_APPBAR_GENERAL = {
	menu: mdiMenu,
	search: mdiMagnify,
	basket: mdiBasketOutline,
	account: mdiAccount,
	profile: mdiAccount,
	options: mdiDotsVertical,
};
/* Navigation */
export const CONST_OBJECT_ICONS_NAVIGATION = {
	home: mdiHome,
	treatments: mdiLotion,
	store: mdiStore,
	contact: mdiEmail,
	reviews: mdiCommentQuestion,
	about: mdiInformation,
	information: mdiMenuDown,
};
/* Side bar */
export const iconsSidebarNavigation = {
	account: mdiAccount,
	basket: mdiBasket,
	logout: mdiLogout,
};
/* List groups */
export const iconsAccountNavigation = {
	profile: mdiAccountEdit,
	security: mdiSecurity,
	notifications: mdiBell,
};
/* Actions */
export const CONST_OBJECT_ICONS_ACTIONS = {
	editImage: mdiImageEdit,
};
/* Dialog */
export const CONST_OBJECT_ICONS_DIALOG = {
	close: mdiClose,
};
/* Form */
export const CONST_OBJECT_ICONS_FORM = {
	show: mdiEye,
	hide: mdiEyeOff,
	location: mdiMapMarker,
	email: mdiEmailFast,
	phone: mdiPhone,
};

// ---------------------------------------------------------------------------------------------------------
// TOOLTIPS
// ---------------------------------------------------------------------------------------------------------
export const CONST_OBJECT_TOOLTIPS_APPBAR = {
	menu: CONST_OBJECT_TEXT_APPBAR_GENERAL.menu,
	search: CONST_OBJECT_TEXT_APPBAR_GENERAL.search,
	basket: CONST_OBJECT_TEXT_APPBAR_GENERAL.basket,
	account: CONST_OBJECT_TEXT_APPBAR_GENERAL.account,
	profile: CONST_OBJECT_TEXT_APPBAR_GENERAL.profile,
	options: CONST_OBJECT_TEXT_APPBAR_GENERAL.options,
};
export const CONST_OBJECT_TOOLTIPS_DIALOG = {
	close: CONST_OBJECT_TEXT_DIALOG_GENERAL.close,
};
