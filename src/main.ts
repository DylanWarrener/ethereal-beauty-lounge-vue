import { createApp } from "vue";

// Parent component
import App from "@src/App.vue";

const app = createApp(App);

// Routes
import router from "@plugins/router/router.js";

// Pinia store
import pinia from "@plugins/pinia/pinia.js";

// Vuetify
import vuetify from "@plugins/vuetify/vuetify.js";

app.use(router);
app.use(pinia);
app.use(vuetify);
app.mount("#app");

export default app;
