<template>
  <div class="release-file flex flex-col">
    <div
      class="file-descrition flex items-center bg-gray-200 rounded-xl py-2 mx-4 my-2"
    >
      <div
        class="file-name m-2 ml-4 flex items-center text-l cursor-pointer"
        @click="toggleFileOpen"
      >
        {{ fileLocal.name }}
      </div>
      <div
        class="file-status m-2  p-1 px-2 text-xs rounded-xl flex justify-center items-center"
        :class="statusColor"
      >
        {{ fileLocal.status }}
      </div>
    </div>

    <div class="file-content p-4 my-4 mx-8 bg-white rounded" v-if="fileOpen">
      <template v-for="line in fileLocal.content" :key="line">
        <release-file-line :line="line" />
      </template>
    </div>
  </div>
</template>

<script>
import ReleaseFileLine from "./ReleaseFileLine.vue";
export default {
  components: { ReleaseFileLine },
  props: {
    file: { type: Object },
  },
  data() {
    return {
      fileOpen: false,
      fileLocal: Object.assign({}, this.file),
    };
  },
  methods: {
    toggleFileOpen() {
      this.fileOpen = !this.fileOpen;
    },
    linesColorController() {
      if (this.fileLocal.status === "REMOVE") {
        for (let i = 0; i <= this.fileLocal.content.length; i++) {
          this.fileLocal.content[i - 1] =
            "----" + this.fileLocal.content[i - 1];
        }
      } else if (this.fileLocal.status === "ADD") {
        for (let i = 0; i <= this.fileLocal.content.length; i++) {
          this.fileLocal.content[i - 1] =
            "++++" + this.fileLocal.content[i - 1];
        }
      } else if (this.fileLocal.status === "MODIFY") {
        for (let i of this.fileLocal.changedInfo.addedLines) {
          this.fileLocal.content[i - 1] =
            "++++" + this.fileLocal.content[i - 1];
        }
        for (let i of this.fileLocal.changedInfo.deletedLines) {
          this.fileLocal.content[i - 1] =
            "----" + this.fileLocal.content[i - 1];
        }
      }
    },
  },
  computed: {
    statusColor() {
      if (this.file.status === "ADD") {
        return "bg-green-500";
      } else if (this.file.status === "REMOVE") {
        return "bg-red-500";
      } else {
        return "bg-red-200";
      }
    },
  },
  mounted() {
    this.linesColorController();
  },
};
</script>
