<template>
  <div class=" flex justify-between bg-gray-300 p-4 mb-4">
    <div class="flex cursor-pointer">
      <collapse-tick
        :key="revisionOpen"
        :revisionOpen="revisionOpen"
        @collapseTick="syncRevisionOpen"
      />
      <div class="name flex items-center" @click="toggleRevisionOpen">
        {{ revision.name }}
      </div>
    </div>

    <div class="version mr-8 flex items-center">
      {{ revision.version }}
    </div>
  </div>

  <release-files :revision="revision" v-if="revisionOpen" />
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
    };
  },
  methods: {
    syncRevisionOpen(data) {
      this.revisionOpen = data;
    },
    toggleRevisionOpen() {
      this.revisionOpen = !this.revisionOpen;
    },
  },
};
</script>
