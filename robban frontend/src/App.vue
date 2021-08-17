<template>
  <router-view :userAgent="userAgent" />
</template>

<script>
// import { ElectronAPI } from "../../desktopElectron/dist/ElectronAPI";

export default {
  components: {},
  data() {
    return {
      userAgent: "",
    };
  },
  async mounted() {
    // const data = new ElectronAPI();
    // console.log(await data.getReleases());
    // console.log(await data.getDiff("nginx-1629010537", 0, 1));
    // console.log(await data.getStatusSummary());

    if (window.navigator.userAgent.includes("Electron")) {
      console.log("I'm in desktop");
      this.userAgent = "Electron";
    } else {
      console.log("I'm in web app");
      this.userAgent = "Vue";
    }
  },
};
</script>
