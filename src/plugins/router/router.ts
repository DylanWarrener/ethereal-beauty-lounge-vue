import { createRouter, createWebHistory } from "vue-router";

// Constants
import { txtRouteNames, txtRouteLinks } from "@constants/common/objects/common-constants-objects.js";

// Routes to be loaded straight away
import Home from "@pages/page-home.vue";

// Routes to be loaded when used (dynamic)
const Treatments = () => import("@pages/page-treatments.vue");
const Portfolio = () => import("@pages/page-portfolio.vue");
const Store = () => import("@pages/page-store.vue");
const Contact = () => import("@pages/page-contact.vue");
const Reviews = () => import("@pages/page-reviews.vue");
const About = () => import("@pages/page-about.vue");
const Login = () => import("@pages/page-login.vue");
const Register = () => import("@pages/page-register.vue");
const Account = () => import("@pages/page-account.vue");
const Basket = () => import("@pages/page-basket.vue");

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{ path: txtRouteLinks.home, name: txtRouteNames.home, component: Home },
		{ path: txtRouteLinks.treatments, name: txtRouteNames.treatments, component: Treatments },
		{ path: txtRouteLinks.portfolio, name: txtRouteNames.portfolio, component: Portfolio },
		{ path: txtRouteLinks.store, name: txtRouteNames.store, component: Store },
		{ path: txtRouteLinks.contact, name: txtRouteNames.contact, component: Contact },
		{ path: txtRouteLinks.reviews, name: txtRouteNames.reviews, component: Reviews },
		{ path: txtRouteLinks.about, name: txtRouteNames.about, component: About },
		{ path: txtRouteLinks.login, name: txtRouteNames.login, component: Login },
		{ path: txtRouteLinks.register, name: txtRouteNames.register, component: Register },
		{ path: txtRouteLinks.account, name: txtRouteNames.account, component: Account, meta: { requiresAuth: true } },
		{ path: txtRouteLinks.basket, name: txtRouteNames.basket, component: Basket },
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
					targetElement.scrollIntoView({ behavior: "smooth" });
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
		next({ name: txtRouteNames.login, hash: "#section-login" });
	} else {
		next();
	}
	next();
});

*/
export default router;
