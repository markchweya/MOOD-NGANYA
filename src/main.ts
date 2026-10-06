import lenis from "lenis/vue";
import { createApp } from "vue";
import App from "@/App.vue";
import "lenis/dist/lenis.css";
import "@/styles/index.css";

createApp(App).use(lenis).mount("#app");
