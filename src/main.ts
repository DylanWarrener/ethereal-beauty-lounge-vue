import { createApp } from "vue";

// Parent component
import App from "@src/App.vue";

const app = createApp(App);

// Routes
import router from "@plugins/router/router.js";
app.use(router);

// Components, Themes & Styles
import vuetify from "@plugins/vuetify/vuetify.js";
app.use(vuetify);

// Local state
import pinia from "@plugins/pinia/pinia.js";
app.use(pinia);

// External state
import "@plugins/firebase/firebase.js";

app.mount("#app");

export default app;
