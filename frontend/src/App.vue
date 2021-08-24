<template>
  <router-view :userAgent="userAgent" />
</template>

<script>
export default {
  components: {},
  data() {
    return {
      userAgent: "",
    };
  },
  mounted() {
    console.log(window.navigator.userAgent);

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
