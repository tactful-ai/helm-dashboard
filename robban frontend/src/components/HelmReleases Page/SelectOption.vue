<template>
  <select
    class="rounded-lg bg-white w-60 h-14 outline-none cursor-pointer p-4"
    v-model="selectedOption"
    @change="manageGroups()"
  >
    <option v-for="item in options" :key="item" :value="item">{{
      item
    }}</option>
  </select>
</template>

<script>
import { isToday, isThisWeek, isThisMonth } from "../../utils/dateHelper";

export default {
  props: {
    options: {
      type: Array,
    },
    entriesCopy: Object,
    entries: Object,
    pagBegin: Number,
    pagEnd: Number,
  },
  data() {
    return {
      selectedOption: this.options[0],
      entriesCopyLocal: this.entriesCopy,
      totalLengthLocal: this.entriesCopy.length,
      pagBeginLocal: this.pagBegin,
      pagEndLocal: this.pagEnd,
      resultsPerPageLocal: 3,
    };
  },
  methods: {
    syncEmit() {
      // console.log(this.totalLengthLocal);
      this.$emit("syncGroupChanges", {
        entriesCopyLocal: this.entriesCopyLocal,
        totalLengthLocal: this.totalLengthLocal,
      });
    },
    syncEmitPages() {
      this.$emit("syncPagesChanges", {
        pagBeginLocal: this.pagBeginLocal,
        pagEndLocal: this.pagEndLocal,
        resultsPerPageLocal: this.resultsPerPageLocal,
      });
    },
    handleFilterDate(option, options) {
      this.entriesCopyLocal = this.entries;
      if (option === options[1]) {
        this.entriesCopyLocal = this.entries.filter((el) => {
          return isToday(new Date(el.updated));
        });
      } else if (option === options[2]) {
        this.entriesCopyLocal = this.entries.filter((el) => {
          return isThisWeek(new Date(el.updated));
        });
      } else if (option === options[3]) {
        this.entriesCopyLocal = this.entries.filter((el) => {
          return isThisMonth(new Date(el.updated));
        });
      }
      this.totalLengthLocal = this.entriesCopyLocal.length;
    },

    handleFilterStatus(option, options) {
      this.entriesCopyLocal = this.entries;
      this.entriesCopyLocal =
        option === options[0]
          ? this.entries
          : this.entries.filter((el) => {
              return el.status === option;
            });
      this.totalLengthLocal = this.entriesCopyLocal.length;
      // console.log(this.entriesCopyLocal);
    },

    handleResultsPerPage(value) {
      if (value === "Results Per Page") {
        this.pagBeginLocal = 1;
        this.pagEndLocal = 3;
        return;
      }
      value = parseInt(value);
      this.resultsPerPageLocal = value;
      this.pagBeginLocal = 1;
      this.pagEndLocal = this.pagBeginLocal + value - 1;
    },

    manageGroups() {
      if (this.options[0] === "Recently updated") {
        this.handleFilterDate(this.selectedOption, this.options);
        this.syncEmit();
      } else if (this.options[0] === "Results Per Page") {
        this.handleResultsPerPage(this.selectedOption);
        this.syncEmitPages();
      } else if (this.options[0] === "Status") {
        this.handleFilterStatus(this.selectedOption, this.options);
        this.syncEmit();
      }
    },
  },
};
</script>
