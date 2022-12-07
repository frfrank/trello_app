import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import BaseButton from "./components/base/BaseButton.vue";

import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.component("BaseButton", BaseButton);
app.mount("#app");
