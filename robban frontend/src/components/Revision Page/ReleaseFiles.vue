<template>
  <div class="release-files">
    <template v-for="file in files" :key="file">
      <release-single-file :file="file" />
    </template>
  </div>
</template>

<script>
import ReleaseSingleFile from "./ReleaseSignleFile.vue";

export default {
  components: { ReleaseSingleFile },
  props: {
    files: { type: Array },
  },
  data() {
    return {
      // files: [],
    };
  },
  methods: {
    //
  },
};
</script>
