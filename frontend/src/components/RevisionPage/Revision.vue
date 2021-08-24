<template>
  <div class=" flex justify-between bg-gray-300 p-4 mb-4">
    <div class="flex cursor-pointer">
      <collapse-tick
        :key="revisionOpen"
        :revisionOpen="revisionOpen"
        @click="setComparedRevisions"
      />
      <div class="name flex items-center" @click="setComparedRevisions">
        {{ revision.description }}
      </div>
    </div>

    <div class="version mr-8 flex items-center">
      {{ revision.revision }}
    </div>
  </div>

  <release-files :files="files" v-if="revisionOpen" />
</template>

<script>
import CollapseTick from "./CollapseTick.vue";
import ReleaseFiles from "./ReleaseFiles.vue";

import { APIConnector } from "../../utils/APIConnector";
// import { ElectronAPI } from "../../../../desktopElectron/dist/ElectronAPI";
const ElectronAPI = () => import("../../../../desktop/dist/ElectronAPI");

export default {
  components: { CollapseTick, ReleaseFiles },
  props: {
    revision: { type: Object },
    userAgent: { type: String },
  },
  data() {
    return {
      revisionOpen: false,
      comparedRevisions: [0, 0],
      files: [],
    };
  },
  methods: {
    toggleRevisionOpen() {
      this.revisionOpen = !this.revisionOpen;
    },
    async setComparedRevisions() {
      if (this.revisionOpen === true) {
        this.revisionOpen = !this.revisionOpen;
        return;
      }
      this.revisionOpen = !this.revisionOpen;

      this.comparedRevisions[0] = this.revision.revision;
      this.comparedRevisions[1] = this.revision.revision - 1;

      let api;
      if (this.userAgent === "Electron") {
        const ElectronAPIImports = await new ElectronAPI();
        api = await new ElectronAPIImports.ElectronAPI();
        // api = new ElectronAPI();
      } else {
        api = new APIConnector();
      }

      const files = await api.getDiff(
        this.$route.params.releaseName,
        this.comparedRevisions[0],
        this.comparedRevisions[1]
      );

      this.files = files;
    },
  },
};
</script>
