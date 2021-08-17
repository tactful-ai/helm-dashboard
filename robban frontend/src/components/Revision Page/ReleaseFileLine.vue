<template>
  <div class="line-container my-1 p-1 px-2" :class="lineColorLocal">
    {{ lineLocal }}
  </div>
</template>

<script>
export default {
  props: {
    line: { type: String },
  },
  data() {
    return {
      lineLocal: this.line,
      lineColorLocal: "",
    };
  },
  methods: {
    parseLineInfo() {
      if (this.lineLocal.startsWith("++++")) {
        this.lineLocal = this.lineLocal.replace("++++", "", 1);
        this.lineColorLocal = "";
        this.lineColorLocal = "bg-green-100";
      } else if (this.lineLocal.startsWith("----")) {
        this.lineLocal = this.lineLocal.replace("----", "", 1);
        this.lineColorLocal = "bg-red-100";
      }
    },
  },
  mounted() {
    this.parseLineInfo();
  },
  updated() {
    this.parseLineInfo();
  },
};
</script>

<style scoped>
/* To preserve text indentation on each line */
.line-container {
  white-space: pre;
}
</style>
