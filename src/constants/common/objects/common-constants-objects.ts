import {
	mdiMenu,
	mdiHome,
	mdiEmail,
	mdiCommentQuestion,
	mdiInformation,
	mdiStore,
	mdiLotion,
	mdiLogin,
	mdiBasketOutline,
	mdiMagnify,
	mdiAccount,
	mdiDotsVertical,
	mdiMenuDown,
} from "@constants/common/primitives/icons/common-constants-primative-icons.js";

// ---------------------------------------------------------------------------------------------------------
// TEXT
// ---------------------------------------------------------------------------------------------------------
export const txtGeneral = {
	toggle: "Toggle",
};
export const txtAppBar = {
	menu: "Menu",
	search: "Search",
	basket: "Basket",
	login: "Log in",
	profile: "Profile",
	options: "Options",
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
	login: mdiLogin,
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

// ---------------------------------------------------------------------------------------------------------
// TOOLTIPS
// ---------------------------------------------------------------------------------------------------------
export const tooltipsAppBar = {
	menu: txtAppBar.menu,
	search: txtAppBar.search,
	basket: txtAppBar.basket,
	login: txtAppBar.login,
	profile: txtAppBar.profile,
	options: txtAppBar.options,
};
