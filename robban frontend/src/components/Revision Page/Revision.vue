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
export default {
  components: { CollapseTick, ReleaseFiles },
  props: {
    revision: { type: Object },
  },
  data() {
    return {
      revisionOpen: false,
      comparedRevisions: [0, 0],
      files: [],
    };
  },
  methods: {
    // syncRevisionOpen(data) {
    //   this.revisionOpen = data;
    // },
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

      try {
        const url = `http://localhost:3001/api/v1/helm/${this.$route.params.releaseName}/revisions/${this.comparedRevisions[0]}/${this.comparedRevisions[1]}`;
        const response = await fetch(url, {
          method: "GET",
        });
        const data = await response.json();
        this.files = data.data.files;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
