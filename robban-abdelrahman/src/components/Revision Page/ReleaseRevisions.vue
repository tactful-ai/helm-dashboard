<template>
  <div class="release-revisions px-8">
    <div
      class="release-revision"
      v-for="index in parseInt(Math.min(pagEnd, revisionsLength))"
      :key="index"
    >
      <revision
        v-if="index - 1 >= pagBegin - 1"
        :revision="currentRevisions[index - 1]"
      />
    </div>
  </div>
</template>

<script>
import Revision from "./Revision.vue";
export default {
  components: { Revision },
  props: {
    currentRevisions: { type: Object },
    revisionsLength: { type: Number },
    pagBegin: { type: Number },
    pagEnd: { type: Number },
  },
  data() {
    return {
      //
    };
  },
};
</script>
