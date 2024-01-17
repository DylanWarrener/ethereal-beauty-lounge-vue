import { createRouter, createWebHistory } from "vue-router";

// Constants
import { txtRouteNames, txtRouteLinks } from "@constants/common/objects/common-constants-objects.js";

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
		{ path: txtRouteLinks.home, name: txtRouteNames.home, component: Home },
		{ path: txtRouteLinks.treatments, name: txtRouteNames.treatments, component: Treatments },
		{ path: txtRouteLinks.portfolio, name: txtRouteNames.portfolio, component: Portfolio },
		{ path: txtRouteLinks.store, name: txtRouteNames.store, component: Store },
		{ path: txtRouteLinks.contact, name: txtRouteNames.contact, component: Contact },
		{ path: txtRouteLinks.reviews, name: txtRouteNames.reviews, component: Reviews },
		{ path: txtRouteLinks.about, name: txtRouteNames.about, component: About },
		{ path: "/signin", name: "signin", component: SignIn },
		{ path: "/signup", name: "signup", component: SignUp },
		{ path: "/:notFound(.*)", name: "NotFound", redirect: "/" },
	],
});

export default router;
