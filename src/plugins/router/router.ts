import { createRouter, createWebHistory } from "vue-router";

// Constants
import { CONST_OBJECT_TEXT_PAGES, CONST_OBJECT_LINKS_PAGES } from "@constants/common/objects/common-constants-objects.js";

// Routes to be loaded straight away
import Home from "@pages/page-home.vue";

// Routes to be loaded when used (dynamic)
const TreatmentsComp = () => import("@pages/page-treatments.vue");
const StoreComp = () => import("@pages/page-store.vue");
const ContactComp = () => import("@pages/page-contact.vue");
const ReviewsComp = () => import("@pages/page-reviews.vue");
const AboutComp = () => import("@pages/page-about.vue");
const AccountComp = () => import("@pages/page-account.vue");

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{ path: CONST_OBJECT_LINKS_PAGES.home, name: CONST_OBJECT_TEXT_PAGES.home, component: Home },
		{
			path: CONST_OBJECT_LINKS_PAGES.treatments,
			name: CONST_OBJECT_TEXT_PAGES.treatments,
			component: TreatmentsComp,
		},
		{ path: CONST_OBJECT_LINKS_PAGES.store, name: CONST_OBJECT_TEXT_PAGES.store, component: StoreComp },
		{ path: CONST_OBJECT_LINKS_PAGES.contact, name: CONST_OBJECT_TEXT_PAGES.contact, component: ContactComp },
		{ path: CONST_OBJECT_LINKS_PAGES.reviews, name: CONST_OBJECT_TEXT_PAGES.reviews, component: ReviewsComp },
		{ path: CONST_OBJECT_LINKS_PAGES.about, name: CONST_OBJECT_TEXT_PAGES.about, component: AboutComp },
		{
			path: CONST_OBJECT_LINKS_PAGES.account,
			name: CONST_OBJECT_TEXT_PAGES.account,
			component: AccountComp,
			meta: { requiresAuth: true },
		},
		{ path: "/:notFound(.*)", name: "NotFound", redirect: "/" },
	],
	scrollBehavior(to, from, savedPosition) {
		return new Promise((resolve) => {
			setTimeout(() => {
				// Always scroll to the top first
				window.scrollTo(0, 0);

				// Then scroll to the element with the hash
				const targetElement = document.getElementById(to.hash.slice(1));
				if (targetElement) {
					window.scrollTo({ behavior: "smooth" });
				}
				resolve();
			}, 0); // Adjust the delay if needed
		});

		// let retval;
		// // Scroll smoothly to a section specified by the hash, after a delay, to ensure the new page has been scrolled to.
		// if (to.hash) {
		// 	setTimeout(() => {
		// 		// Scroll to the top first, then scroll to the element.
		// 		window.scrollTo(0, 0);
		// 		const targetElement = document.getElementById(to.hash.slice(1));
		// 		if (targetElement) {
		// 			targetElement.scrollIntoView({ behavior: 'smooth' });
		// 		}
		// 	}, 1000);
		// }
		// return retval;

		// let retVal;
		// if (to.hash) {
		// 	retVal = {
		// 		el: to.hash,
		// 		behavior: "smooth",
		// 	};
		// } else {
		// 	retVal = {
		// 		top: 0,
		// 		behavior: "smooth",
		// 	};
		// }
		// if (savedPosition) {
		// 	retVal = savedPosition;
		// }
		// return retVal;
	},
});

/*
router.beforeEach((to, _, next) => {
	debugger;
	const useFirebaseStore = storeFirebase();
	const routeRequiresAuth: boolean = to.meta.requiresAuth as boolean;
	const isUserLoggedIn: boolean = useFirebaseStore.getIsUserLoggedIn;
	if (routeRequiresAuth && !isUserLoggedIn) {
		next({ name: CONST_OBJECT_TEXT_PAGES.login, hash: "#section-login" });
	} else {
		next();
	}
	next();
});

*/
export default router;
