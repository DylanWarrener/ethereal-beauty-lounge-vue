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
export const btnIDs = {
	header: {
		appBar: {
			pcMenu: {
				btn: {
					home: {
						id: "btnID_pcMenu_home",
					},
					treatments: {
						id: "btnID_pcMenu_treatments",
					},
					portfolio: {
						id: "btnID_pcMenu_portfolio",
					},
					store: {
						id: "btnID_pcMenu_store",
					},
					information: {
						id: "btnID_pcMenu_information",
					},
					contact: {
						id: "btnID_pcMenu_contact",
					},
					reviews: {
						id: "btnID_pcMenu_reviews",
					},
					about: {
						id: "btnID_pcMenu_account",
					},
				},
			},
			mobileMenu: {
				btn: {
					home: {
						id: "btnID_mobileMenu_home",
					},
					treatments: {
						id: "btnID_mobileMenu_treatments",
					},
					portfolio: {
						id: "btnID_mobileMenu_portfolio",
					},
					store: {
						id: "btnID_mobileMenu_store",
					},
					information: {
						id: "btnID_mobileMenu_information",
					},
					contact: {
						id: "btnID_mobileMenu_contact",
					},
					reviews: {
						id: "btnID_mobileMenu_reviews",
					},
					about: {
						id: "btnID_mobileMenu_about",
					},
				},
			},
		},
	},
	pages: {
		home: {
			canvas: {
				btn: {
					id: "btnID_home_canvas",
				},
			},
			portfolio: {
				cards: {
					btn: {
						id: "btnID_home_portfolio",
					},
				},
			},
		},
		treatments: {
			canvas: {
				btn: {
					id: "btnID_treatments_canvas",
				},
			},
		},
		portfolio: {
			canvas: {
				btn: {
					id: "btnID_portfolio_canvas",
				},
			},
		},
		store: {
			canvas: {
				btn: {
					id: "btnID_store_canvas",
				},
			},
		},
		information: {
			canvas: {
				btn: {
					id: "btnID_information_canvas",
				},
			},
		},
		contact: {
			canvas: {
				btn: {
					id: "btnID_contact_canvas",
				},
			},
		},
		reviews: {
			canvas: {
				btn: {
					id: "btnID_reviews_canvas",
				},
			},
		},
		about: {
			canvas: {
				btn: {
					id: "btnID_about_canvas",
				},
			},
		},
		login: {
			canvas: {
				btn: {
					id: "btnID_login_canvas",
				},
			},
		},
	},
	footer: {},
};

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
	login: "login",
	register: "register",
	account: "Account",
	basket: "Basket",
};
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
export const iconsSidebarNavigation = {
	account: mdiAccount,
	basket: mdiBasket,
	logout: mdiLogout,
};
export const iconsAccountNavigation = {
	profile: mdiAccountEdit,
	security: mdiSecurity,
	notifications: mdiBell,
};
export const iconsAccountProfile = {
	editImage: mdiImageEdit,
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
	hide: mdiEyeOff,
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
