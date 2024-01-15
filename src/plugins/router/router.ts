import { createRouter, createWebHistory } from "vue-router";

// Child components -> dynamically imported (only imported when requested to reduce bundle size)
const Home = () => import("@pages/page-home.vue");
const Portfolio = () => import("@pages/page-portfolio.vue");
const About = () => import("@pages/page-about.vue");
const SignIn = () => import("@pages/page-signin.vue");
const SignUp = () => import("@pages/page-signup.vue");

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{ path: "/", name: "home", component: Home },
		{ path: "/portfolio", name: "portfolio", component: Portfolio },
		{ path: "/about", name: "about", component: About },
		{ path: "/signin", name: "signin", component: SignIn },
		{ path: "/signup", name: "signup", component: SignUp },
		{ path: "/:notFound(.*)", name: "NotFound", redirect: "/" },
	],
});

export default router;
