import { mdiMenu } from "@mdi/js";
import { mdiHome } from "@mdi/js";
import { mdiEmail } from "@mdi/js";
import { mdiCommentQuestion } from "@mdi/js";
import { mdiInformation } from "@mdi/js";
import { mdiStore } from "@mdi/js";
import { mdiLotion } from "@mdi/js";
import { mdiLogin } from "@mdi/js";
import { mdiBasketOutline } from "@mdi/js";
import { mdiMagnify } from "@mdi/js";

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
};
export const txtNavigation = {
	home: "home",
	treatments: "treatments",
	portfolio: "portfolio",
	store: "store",
	contact: "contact",
	reviews: "reviews",
	about: "about",
};
export const txtNavigationLinks = {
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
};
export const iconsNavigation = {
	home: mdiHome,
	treatments: mdiLotion,
	store: mdiStore,
	contact: mdiEmail,
	reviews: mdiCommentQuestion,
	about: mdiInformation,
};

// ---------------------------------------------------------------------------------------------------------
// TOOLTIPS
// ---------------------------------------------------------------------------------------------------------
export const tooltipsAppBar = {
	menu: `${txtGeneral.toggle} ${txtAppBar.menu.toLowerCase()}`,
	search: txtAppBar.search,
	basket: `${txtGeneral.toggle} ${txtAppBar.basket.toLowerCase()}`,
	login: txtAppBar.login,
};
