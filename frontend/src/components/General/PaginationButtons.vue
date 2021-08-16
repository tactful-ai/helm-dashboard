<template>
  <div class="pagination-info flex mx-4 justify-between my-4">
    <div class="showing-details flex items-center">
      Showing ({{ pagBeginLocal }} - {{ Math.min(pagEndLocal, totalLength) }})
      {{ totalLength }} results
    </div>

    <div class="paginationbuttons flex">
      <button
        class="pagination-btn pagination-btn-left text-3xl cursor-pointer bg-gray-200 shadow-md mr-1 h-12 w-20 rounded-full flex items-center justify-center"
        @click="showPrev()"
        :disabled="leftDisable"
      >
        &laquo;
      </button>

      <button
        class="pagination-btn pagination-btn-right text-3xl cursor-pointer bg-gray-200 shadow-md ml-1 h-12 w-20 rounded-full flex items-center justify-center"
        @click="showNext()"
        :disabled="rightDisable"
      >
        &raquo;
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pagBegin: { type: Number },
    pagEnd: { type: Number },
    totalLength: { type: Number },
    resultsPerPage: { type: Number },
  },
  data() {
    return {
      pagBeginLocal: this.pagBegin,
      pagEndLocal: this.pagEnd,
      leftDisable: false,
      rightDisable: false,
    };
  },
  methods: {
    showNext() {
      this.pagBeginLocal += this.resultsPerPage;
      this.pagEndLocal += this.resultsPerPage;
      this.$emit("syncPagination", {
        pagBegin: this.pagBeginLocal,
        pagEnd: this.pagEndLocal,
      });
    },
    showPrev() {
      this.pagBeginLocal -= this.resultsPerPage;
      this.pagEndLocal -= this.resultsPerPage;
      this.$emit("syncPagination", {
        pagBegin: this.pagBeginLocal,
        pagEnd: this.pagEndLocal,
      });
    },
    paginationController() {
      if (this.pagBeginLocal - this.resultsPerPage <= 0) {
        // console.log("LDis");
        this.leftDisable = true;
      } else {
        this.leftDisable = false;
      }
      if (this.pagEndLocal >= this.totalLength) {
        // console.log("RDis");
        this.rightDisable = true;
      } else {
        this.rightDisable = false;
      }
    },
  },
  mounted() {
    this.paginationController();
  },
  updated() {
    this.paginationController();
  },
};
</script>

<style scoped>
.pagination-btn {
  transition: all 0.4s;
}

.pagination-btn:hover {
  transform: translateY(2px);
}
</style>
