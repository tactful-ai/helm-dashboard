<template>
  <router-view />
</template>

<script>
// import { HelmMainController } from "../../desktopElectron/dist/electron-client";
import { ElectronAPI } from "../../desktopElectron/dist/ElectronAPI";

export default {
  components: {},
  data() {
    return {};
  },
  async mounted() {
    // let helm = new HelmMainController();
    // let releases = await helm.getReleases();
    // console.log("releases from electron", releases);

    const data = new ElectronAPI();
    console.log(await data.getReleases());
    console.log(await data.getDiff("nginx-1629010537", 0, 1));
    console.log(await data.getStatusSummary());

    if (window.navigator.userAgent.includes("Electron")) {
      console.log("I'm in desktop");
    } else {
      console.log("I'm in web app");
    }
    console.log(window.navigator.userAgent);
  },
};
</script>
