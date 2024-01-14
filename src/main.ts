import { createApp } from 'vue';

// Parent component
import App from './App.vue';

const app = createApp(App);

// Routes
import router from '@plugins/router/router';

// Pinia store
import pinia from '@plugins/pinia/pinia';

// Vuetify
import vuetify from '@plugins/vuetify/vuetify';

// Global styles
import '@styles/global.scss';

import { createPinia } from 'pinia';

import router from './router';

app.use(createPinia());
app.use(router);

app.mount('#app');
