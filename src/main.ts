import { createApp } from "vue";

// Parent component
import App from "@src/App.vue";

const app = createApp(App);

// Routes
import router from "@plugins/router/router.js";

// Components & Themes & Styles
import vuetify from "@plugins/vuetify/vuetify.js";

// Local store
import pinia from "@plugins/pinia/pinia.js";

// External store (database)
import "@plugins/firebase/firebase.js";

app.use(router);
app.use(vuetify);
app.use(pinia);
app.mount("#app");

export default app;
