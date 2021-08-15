<template>
  <div class="release-files">
    <template v-for="file in revision.files" :key="file">
      <release-single-file :file="file" />
    </template>
  </div>
</template>

<script>
import ReleaseSingleFile from "./ReleaseSignleFile.vue";

export default {
  components: { ReleaseSingleFile },
  props: {
    revision: { type: Object },
  },
  data() {
    return {};
  },
  methods: {
    //
  },
};
</script>
