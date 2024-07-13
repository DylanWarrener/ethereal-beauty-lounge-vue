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
} from "@base/src/constants/common/objects/common-constants-objects.js";

// Icons
import { mdiHome, mdiLotion, mdiStore, mdiAccountBox, mdiMessageDraw, mdiInformation, mdiMenuDown } from "@mdi/js";

export const NAVIGATION_MOBLE_MENU: IHeaderNavigationCommonItemState[] = [
	{
		title: CONST_OBJECT_TEXT_PAGES.home,
		icon: mdiHome,
		link: CONST_OBJECT_LINKS_PAGES.home,
	},
	{
		title: CONST_OBJECT_TEXT_PAGES.treatments,
		icon: mdiLotion,
		link: CONST_OBJECT_LINKS_PAGES.treatments,
	},
	{
		title: CONST_OBJECT_TEXT_PAGES.store,
		icon: mdiStore,
		link: CONST_OBJECT_LINKS_PAGES.store,
	},
	{
		title: CONST_OBJECT_TEXT_PAGES.contact,
		icon: mdiAccountBox,
		link: CONST_OBJECT_LINKS_PAGES.contact,
	},
	{
		title: CONST_OBJECT_TEXT_PAGES.reviews,
		icon: mdiMessageDraw,
		link: CONST_OBJECT_LINKS_PAGES.reviews,
	},
	{
		title: CONST_OBJECT_TEXT_PAGES.about,
		icon: mdiInformation,
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
		icon: mdiMenuDown,
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
