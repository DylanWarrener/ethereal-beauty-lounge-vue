import { createApp } from "vue";

// Parent component
import App from "@src/App.vue";

const app = createApp(App);

// Routes
import router from "@plugins/router/router.js";

// Local store
import pinia from "@plugins/pinia/pinia.js";

// Components, Themes & Styles
import vuetify from "@plugins/vuetify/vuetify.js";

// External store (database)
import "@plugins/firebase/firebase.js";

app.use(router);
app.use(pinia);
app.use(vuetify);
app.mount("#app");

export default app;
