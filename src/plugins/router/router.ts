import { createRouter, createWebHistory } from "vue-router";

// Child components -> dynamically imported (only imported when requested to reduce bundle size)
const Home = () => import("@pages/page-home.vue");
const Portfolio = () => import("@pages/page-portfolio.vue");
const About = () => import("@pages/page-about.vue");

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{ path: "/", name: "home", component: Home },
		{ path: "/portfolio", name: "portfolio", component: Portfolio },
		{ path: "/about", name: "about", component: About },
		{ path: "/:notFound(.*)", name: "NotFound", redirect: "/" },
	],
	scrollBehavior(to, from, savedPosition) {
		let retVal;
		if (savedPosition) {
			retVal = savedPosition;
		} else {
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
		}
		return retVal;
	},
});

export default router;
