<template>
  <div
    class="release-status-card p-4  flex flex-col bg-gray-300 rounded-md mt-4 shadow-md mx-4"
  >
    <release-status-name :name="summary.releaseName" />

    <div class="components-status-container flex">
      <component-status class="mx-4" :statusComponent="summary.statComponent" />
    </div>
  </div>
</template>

<script>
import ComponentStatus from "./ComponentStatus.vue";
import ReleaseStatusName from "./ReleaseStatusName.vue";
export default {
  components: {
    ComponentStatus,
    ReleaseStatusName,
  },
  props: {
    summary: { type: Object },
  },
  data() {
    return {
      //
    };
  },
};
</script>
