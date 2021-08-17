<template>
  <router-view />
</template>

<script>
import { HelmMainController } from "../../desktopElectron/dist/helm-client";

export default {
  components: {},
  data() {
    return {};
  },
  async mounted() {
    let helm = new HelmMainController();
    let releases = await helm.getReleases();
    console.log(releases);
  },
};
</script>
