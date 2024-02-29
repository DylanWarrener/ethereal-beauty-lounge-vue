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
	mdiEyeOff
} from "@constants/common/primitives/icons/common-constants-primative-icons.js";

// ---------------------------------------------------------------------------------------------------------
// TEXT
// ---------------------------------------------------------------------------------------------------------
export const txtGeneral = {
	toggle: "Toggle",
};
export const txtDialog = {
	close: "Close",
};
export const txtAppBar = {
	menu: "Menu",
	search: "Search",
	basket: "Basket",
	account: "Account",
	profile: "Profile",
	options: "Options",
};
export const txtNavigationGroups = {
	information: "information",
};
export const txtRouteNames = {
	home: "home",
	treatments: "treatments",
	portfolio: "portfolio",
	store: "store",
	contact: "contact",
	reviews: "reviews",
	about: "about",
};
export const txtRouteLinks = {
	home: "/",
	treatments: "/treatments",
	portfolio: "/portfolio",
	store: "/store",
	contact: "/contact",
	reviews: "/reviews",
	about: "/about",
};

// ---------------------------------------------------------------------------------------------------------
// ICONS
// ---------------------------------------------------------------------------------------------------------
export const iconsAppBar = {
	menu: mdiMenu,
	search: mdiMagnify,
	basket: mdiBasketOutline,
	account: mdiAccount,
	profile: mdiAccount,
	options: mdiDotsVertical,
};
export const iconsNavigation = {
	home: mdiHome,
	treatments: mdiLotion,
	store: mdiStore,
	contact: mdiEmail,
	reviews: mdiCommentQuestion,
	about: mdiInformation,
	information: mdiMenuDown,
};
export const iconsDialog = {
	close: mdiClose,
};
export const iconsContactDetails = {
	location: mdiMapMarker,
	email: mdiEmailFast,
	phone: mdiPhone,
};
export const iconsFormPassword = {
	show: mdiEye,
	hide: mdiEyeOff
};

// ---------------------------------------------------------------------------------------------------------
// TOOLTIPS
// ---------------------------------------------------------------------------------------------------------
export const tooltipsAppBar = {
	menu: txtAppBar.menu,
	search: txtAppBar.search,
	basket: txtAppBar.basket,
	account: txtAppBar.account,
	profile: txtAppBar.profile,
	options: txtAppBar.options,
};
export const tooltipsDialog = {
	close: txtDialog.close,
};
