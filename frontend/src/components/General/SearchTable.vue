// changed name to releaseName before startWith

<template>
  <div class="search-name">
    <input
      v-model="searchInputLocal"
      @input="filterResults()"
      type="text"
      placeholder="Search By Name"
      class="rounded-lg p-4 mx-4 outline-none h-14 "
      id="search"
    />
  </div>
</template>

<script>
export default {
  props: {
    pagBegin: { type: Number },
    pagEnd: { type: Number },
    entries: { type: Array },
    entriesCopy: { type: Array },
    totalLength: { type: Number },
    resultsPerPage: { type: Number },
    fieldToSearchFor: { type: String },
  },
  data() {
    return {
      searchInputLocal: "",
      pagBeginLocal: this.pagBegin,
      pagEndLocal: this.pagEnd,
      entriesLocal: this.entries,
      entriesCopyLocal: this.entriesCopy,
      totalLengthLocal: this.totalLength,
    };
  },
  methods: {
    filterResults() {
      // Go to first page, if you start searching
      this.pagBeginLocal = 1;
      this.pagEndLocal = this.resultsPerPage;

      this.entriesCopyLocal = this.entriesLocal;
      this.entriesCopyLocal =
        this.searchInputLocal === ""
          ? this.entriesLocal
          : this.entriesLocal.filter((el) => {
              return el[this.fieldToSearchFor].startsWith(
                this.searchInputLocal.toLowerCase()
              );
            });
      this.totalLengthLocal = this.entriesCopyLocal.length;

      // Pass the updated data to the parent
      this.$emit("reflectSearch", {
        pagBeginLocal: this.pagBeginLocal,
        pagEndLocal: this.pagEndLocal,
        entriesCopyLocal: this.entriesCopyLocal,
        totalLengthLocal: this.totalLengthLocal,
      });
    },
  },
  mounted() {
    // console.log(this.entries);
  },
  updated() {
    // console.log(this.searchInputLocal);
    // console.log(this.entries);
  },
};
</script>

<style scoped>
#search {
  transition: all 0.2s;
}
#search:focus {
  box-shadow: 0 0.5rem 0.5rem rgba(0, 0, 0, 0.2);
}
</style>
