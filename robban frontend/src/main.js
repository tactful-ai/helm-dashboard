import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";

import { createRouter, createWebHistory } from "vue-router";

import HelmReleases from "./pages/HelmReleases.vue";
import Revisions from "./pages/Revisions.vue";
import ReleasesSummary from "./pages/ReleasesSummary.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: HelmReleases },
    { path: "/:releaseName/revisions", component: Revisions },
    { path: "/statusSummary", component: ReleasesSummary },
  ],
});

const app = createApp(App);
app.use(router);

app.mount("#app");
