// Interfaces
import {
	IHeaderNavigationCommonItemState,
	IHeaderNavigationCommonNonMobileItemState,
} from "@declarations/common/header/interfaces/navigation/common-interface-header-navigation.js";

// Constants
import {
	// Text
	CONST_OBJECT_TEXT_ROUTE_NAMES,
	CONST_OBJECT_TEXT_ROUTE_LINKS,
	CONST_OBJECT_TEXT_NAVIGATION_GROUPS,

	// Icons
	CONST_OBJECT_ICONS_NAVIGATION,
} from "@base/src/constants/common/objects/common-constants-objects.js";

export const NAVIGATION_MOBLE_MENU: IHeaderNavigationCommonItemState[] = [
	{
		title: CONST_OBJECT_TEXT_ROUTE_NAMES.home,
		icon: CONST_OBJECT_ICONS_NAVIGATION.home,
		link: CONST_OBJECT_TEXT_ROUTE_LINKS.home,
	},
	{
		title: CONST_OBJECT_TEXT_ROUTE_NAMES.treatments,
		icon: CONST_OBJECT_ICONS_NAVIGATION.treatments,
		link: CONST_OBJECT_TEXT_ROUTE_LINKS.treatments,
	},
	{
		title: CONST_OBJECT_TEXT_ROUTE_NAMES.store,
		icon: CONST_OBJECT_ICONS_NAVIGATION.store,
		link: CONST_OBJECT_TEXT_ROUTE_LINKS.store,
	},
	{
		title: CONST_OBJECT_TEXT_ROUTE_NAMES.contact,
		icon: CONST_OBJECT_ICONS_NAVIGATION.contact,
		link: CONST_OBJECT_TEXT_ROUTE_LINKS.contact,
	},
	{
		title: CONST_OBJECT_TEXT_ROUTE_NAMES.reviews,
		icon: CONST_OBJECT_ICONS_NAVIGATION.reviews,
		link: CONST_OBJECT_TEXT_ROUTE_LINKS.reviews,
	},
	{
		title: CONST_OBJECT_TEXT_ROUTE_NAMES.about,
		icon: CONST_OBJECT_ICONS_NAVIGATION.about,
		link: CONST_OBJECT_TEXT_ROUTE_LINKS.about,
	},
];
export const NAVIGATION_NON_MOBILE_MENU: IHeaderNavigationCommonNonMobileItemState[] = [
	{
		title: CONST_OBJECT_TEXT_ROUTE_NAMES.home,
		link: CONST_OBJECT_TEXT_ROUTE_LINKS.home,
	},
	{
		title: CONST_OBJECT_TEXT_ROUTE_NAMES.treatments,
		link: CONST_OBJECT_TEXT_ROUTE_LINKS.treatments,
	},
	{
		title: CONST_OBJECT_TEXT_ROUTE_NAMES.store,
		link: CONST_OBJECT_TEXT_ROUTE_LINKS.store,
	},
	{
		title: CONST_OBJECT_TEXT_NAVIGATION_GROUPS.information,
		icon: CONST_OBJECT_ICONS_NAVIGATION.information,
		items: [
			{
				title: CONST_OBJECT_TEXT_ROUTE_NAMES.contact,
				link: CONST_OBJECT_TEXT_ROUTE_LINKS.contact,
			},
			{
				title: CONST_OBJECT_TEXT_ROUTE_NAMES.reviews,
				link: CONST_OBJECT_TEXT_ROUTE_LINKS.reviews,
			},
			{
				title: CONST_OBJECT_TEXT_ROUTE_NAMES.about,
				link: CONST_OBJECT_TEXT_ROUTE_LINKS.about,
			},
		],
	},
];
