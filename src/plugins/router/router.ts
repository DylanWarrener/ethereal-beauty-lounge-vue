import { createRouter, createWebHistory } from "vue-router";

// Constants
import { txtNavigation, txtNavigationLinks } from "@constants/common/primitive/common-constants-primative.js";

// Child components -> dynamically imported (only imported when requested to reduce bundle size)
const Home = () => import("@pages/page-home.vue");
const Treatments = () => import("@pages/page-treatments.vue");
const Portfolio = () => import("@pages/page-portfolio.vue");
const Store = () => import("@pages/page-store.vue");
const Contact = () => import("@pages/page-contact.vue");
const Reviews = () => import("@pages/page-reviews.vue");
const About = () => import("@pages/page-about.vue");
const SignIn = () => import("@pages/page-signin.vue");
const SignUp = () => import("@pages/page-signup.vue");

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{ path: txtNavigationLinks.home, name: txtNavigation.home, component: Home },
		{ path: txtNavigationLinks.treatments, name: txtNavigation.treatments, component: Treatments },
		{ path: txtNavigationLinks.portfolio, name: txtNavigation.portfolio, component: Portfolio },
		{ path: txtNavigationLinks.store, name: txtNavigation.store, component: Store },
		{ path: txtNavigationLinks.contact, name: txtNavigation.contact, component: Contact },
		{ path: txtNavigationLinks.reviews, name: txtNavigation.reviews, component: Reviews },
		{ path: txtNavigationLinks.about, name: txtNavigation.about, component: About },
		{ path: "/signin", name: "signin", component: SignIn },
		{ path: "/signup", name: "signup", component: SignUp },
		{ path: txtNavigationLinks.home, name: "NotFound", redirect: "/" },
	],
});

export default router;
