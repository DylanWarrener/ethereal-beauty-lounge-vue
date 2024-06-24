import {
	mdiMenu,
	mdiMenuUp,
	mdiMenuDown,
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
export const CONST_OBJECT_IDS_SECTION_BUTTONS = {
	sendMessage: "section_id_btnSendMessage",
};

// ---------------------------------------------------------------------------------------------------------
// TEXT
// ---------------------------------------------------------------------------------------------------------
export const CONST_OBJECT_TEXT_PAGES = {
	home: "home",
	treatments: "treatments",
	store: "store",
	contact: "contact",
	reviews: "reviews",
	about: "about",
	account: "account",
};
export const CONST_OBJECT_TEXT_DIALOG = {
	close: "Close",
};
export const CONST_OBJECT_TEXT_APPBAR = {
	menu: "menu",
	home: CONST_OBJECT_TEXT_PAGES.home,
	treatments: CONST_OBJECT_TEXT_PAGES.treatments,
	store: CONST_OBJECT_TEXT_PAGES.store,
	information: "information",
	contact: CONST_OBJECT_TEXT_PAGES.contact,
	reviews: CONST_OBJECT_TEXT_PAGES.reviews,
	about: CONST_OBJECT_TEXT_PAGES.about,
	basket: "basket",
	account: CONST_OBJECT_TEXT_PAGES.account,
	signIn: "sign in",
	signUp: "sign up",
};
export const CONST_OBJECT_TEXT_NAVIGATION_GROUPS = {
	information: "information",
};

// ---------------------------------------------------------------------------------------------------------
// LINKS
// ---------------------------------------------------------------------------------------------------------
export const CONST_OBJECT_LINKS_PAGES = {
	home: "/",
	treatments: "/treatments",
	store: "/store",
	contact: "/contact",
	reviews: "/reviews",
	about: "/about",
	account: "/account",
};
export const CONST_OBJECT_LINKS_APPBAR = {
	home: CONST_OBJECT_LINKS_PAGES.home,
	treatments: CONST_OBJECT_LINKS_PAGES.treatments,
	store: CONST_OBJECT_LINKS_PAGES.store,
	contact: CONST_OBJECT_LINKS_PAGES.contact,
	reviews: CONST_OBJECT_LINKS_PAGES.reviews,
	about: CONST_OBJECT_LINKS_PAGES.about,
	account: CONST_OBJECT_LINKS_PAGES.account,
};

// ---------------------------------------------------------------------------------------------------------
// ICONS
// ---------------------------------------------------------------------------------------------------------
export const CONST_OBJECT_ICONS = {
	menuUp: mdiMenuUp,
	menuDown: mdiMenuDown,
};
export const CONST_OBJECT_ICONS_APPBAR = {
	menu: mdiMenu,
	search: mdiMagnify,
	basket: mdiBasketOutline,
	account: mdiAccount,
	profile: mdiAccount,
	options: mdiDotsVertical,
};
export const CONST_OBJECT_ICONS_NAVIGATION = {
	home: mdiHome,
	treatments: mdiLotion,
	store: mdiStore,
	contact: mdiEmail,
	reviews: mdiCommentQuestion,
	about: mdiInformation,
	information: mdiMenuDown,
};
export const CONST_OBJECT_ICONS_NAVIGATION_SIDEBAR = {
	account: mdiAccount,
	basket: mdiBasket,
	logout: mdiLogout,
};
export const CONST_OBJECT_ICONS_LIST_GROUPS = {
	profile: mdiAccountEdit,
	security: mdiSecurity,
	notifications: mdiBell,
};
export const CONST_OBJECT_ICONS_ACTIONS = {
	editImage: mdiImageEdit,
};
export const CONST_OBJECT_ICONS_DIALOG = {
	close: mdiClose,
};
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
	menu: CONST_OBJECT_TEXT_APPBAR.menu,
	basket: CONST_OBJECT_TEXT_APPBAR.basket,
	account: CONST_OBJECT_TEXT_APPBAR.account,
};
export const CONST_OBJECT_TOOLTIPS_DIALOG = {
	close: CONST_OBJECT_TEXT_DIALOG.close,
};
