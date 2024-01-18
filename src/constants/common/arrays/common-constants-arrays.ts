// Interfaces
import {
	IHeaderNavigationCommonItemState,
	IHeaderNavigationCommonNonMobileItemState,
} from '@declarations/common/header/interfaces/navigation/common-interface-header-navigation.js';

// Constants
import {
	// Text
	txtRouteNames,
	txtRouteLinks,
	txtNavigationGroups,

	// Icons
	iconsNavigation,
} from '@base/src/constants/common/objects/common-constants-objects.js';

export const NAVIGATION_MOBLE_MENU: IHeaderNavigationCommonItemState[] = [
	{
		title: txtRouteNames.home,
		icon: iconsNavigation.home,
		link: txtRouteLinks.home,
	},
	{
		title: txtRouteNames.treatments,
		icon: iconsNavigation.treatments,
		link: txtRouteLinks.treatments,
	},
	{
		title: txtRouteNames.store,
		icon: iconsNavigation.store,
		link: txtRouteLinks.store,
	},
	{
		title: txtRouteNames.contact,
		icon: iconsNavigation.contact,
		link: txtRouteLinks.contact,
	},
	{
		title: txtRouteNames.reviews,
		icon: iconsNavigation.reviews,
		link: txtRouteLinks.reviews,
	},
	{
		title: txtRouteNames.about,
		icon: iconsNavigation.about,
		link: txtRouteLinks.about,
	},
];
export const NAVIGATION_NON_MOBILE_MENU: IHeaderNavigationCommonNonMobileItemState[] = [
	{
		title: txtRouteNames.home,
		link: txtRouteLinks.home,
	},
	{
		title: txtRouteNames.treatments,
		link: txtRouteLinks.treatments,
	},
	{
		title: txtRouteNames.store,
		link: txtRouteLinks.store,
	},
	{
		title: txtNavigationGroups.information,
		icon: iconsNavigation.information,
		items: [
			{
				title: txtRouteNames.contact,
				link: txtRouteLinks.contact,
			},
			{
				title: txtRouteNames.reviews,
				link: txtRouteLinks.reviews,
			},
			{
				title: txtRouteNames.about,
				link: txtRouteLinks.about,
			},
		],
	},
];
