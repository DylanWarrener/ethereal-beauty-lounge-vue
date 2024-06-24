// Interfaces
import {
	IHeaderNavigationCommonItemState,
	IHeaderNavigationCommonNonMobileItemState,
} from "@declarations/common/header/interfaces/navigation/common-interface-header-navigation.js";

// Constants
import {
	// Text
	CONST_OBJECT_TEXT_PAGES,
	CONST_OBJECT_LINKS_PAGES,
	CONST_OBJECT_TEXT_NAVIGATION_GROUPS,

	// Icons
	CONST_OBJECT_ICONS_NAVIGATION,
} from "@base/src/constants/common/objects/common-constants-objects.js";

export const NAVIGATION_MOBLE_MENU: IHeaderNavigationCommonItemState[] = [
	{
		title: CONST_OBJECT_TEXT_PAGES.home,
		icon: CONST_OBJECT_ICONS_NAVIGATION.home,
		link: CONST_OBJECT_LINKS_PAGES.home,
	},
	{
		title: CONST_OBJECT_TEXT_PAGES.treatments,
		icon: CONST_OBJECT_ICONS_NAVIGATION.treatments,
		link: CONST_OBJECT_LINKS_PAGES.treatments,
	},
	{
		title: CONST_OBJECT_TEXT_PAGES.store,
		icon: CONST_OBJECT_ICONS_NAVIGATION.store,
		link: CONST_OBJECT_LINKS_PAGES.store,
	},
	{
		title: CONST_OBJECT_TEXT_PAGES.contact,
		icon: CONST_OBJECT_ICONS_NAVIGATION.contact,
		link: CONST_OBJECT_LINKS_PAGES.contact,
	},
	{
		title: CONST_OBJECT_TEXT_PAGES.reviews,
		icon: CONST_OBJECT_ICONS_NAVIGATION.reviews,
		link: CONST_OBJECT_LINKS_PAGES.reviews,
	},
	{
		title: CONST_OBJECT_TEXT_PAGES.about,
		icon: CONST_OBJECT_ICONS_NAVIGATION.about,
		link: CONST_OBJECT_LINKS_PAGES.about,
	},
];
export const NAVIGATION_NON_MOBILE_MENU: IHeaderNavigationCommonNonMobileItemState[] = [
	{
		title: CONST_OBJECT_TEXT_PAGES.home,
		link: CONST_OBJECT_LINKS_PAGES.home,
	},
	{
		title: CONST_OBJECT_TEXT_PAGES.treatments,
		link: CONST_OBJECT_LINKS_PAGES.treatments,
	},
	{
		title: CONST_OBJECT_TEXT_PAGES.store,
		link: CONST_OBJECT_LINKS_PAGES.store,
	},
	{
		title: CONST_OBJECT_TEXT_NAVIGATION_GROUPS.information,
		icon: CONST_OBJECT_ICONS_NAVIGATION.information,
		items: [
			{
				title: CONST_OBJECT_TEXT_PAGES.contact,
				link: CONST_OBJECT_LINKS_PAGES.contact,
			},
			{
				title: CONST_OBJECT_TEXT_PAGES.reviews,
				link: CONST_OBJECT_LINKS_PAGES.reviews,
			},
			{
				title: CONST_OBJECT_TEXT_PAGES.about,
				link: CONST_OBJECT_LINKS_PAGES.about,
			},
		],
	},
];
