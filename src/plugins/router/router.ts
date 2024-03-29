import { createRouter, createWebHistory, type RouterScrollBehavior } from "vue-router";

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
		{ path: txtRouteLinks.account, name: txtRouteNames.account, component: Account },
		{ path: txtRouteLinks.basket, name: txtRouteNames.basket, component: Basket },
		{ path: "/:notFound(.*)", name: "NotFound", redirect: "/" },
	],
	scrollBehavior(to, from, savedPosition): any {
		let retVal;
		if (to.hash) {
			retVal = {
				el: to.hash,
				behavior: "smooth",
			};
		} else {
			retVal = {
				top: 0,
				behavior: "smooth",
			};
		}
		/*
		if (savedPosition) {
			retVal = savedPosition;
		}
		*/
		return retVal;
	},
});

export default router;
