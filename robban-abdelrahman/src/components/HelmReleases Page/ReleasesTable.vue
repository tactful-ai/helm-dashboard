<template>
  <table class="mx-auto w-full">
    <thead class="bg-yellow-100">
      <th></th>
      <th @click="nameSort('name')">Name</th>
      <th @click="nameSort('namespace')">NameSpace</th>
      <th @click="nameSort('chartName')">ChartName</th>
      <th @click="nameSort('chartVersion')">Chart Version</th>
      <th @click="nameSort('revision')">Revision</th>
      <th @click="nameSort('helmStatus')">Helm Status</th>
      <th @click="nameSort('lastUpdate')">Last Update</th>
    </thead>

    <template v-for="index in end" :key="index">
      <table-entry v-if="index - 1 >= start - 1" :entry="entries[index - 1]" />
    </template>
  </table>
</template>

<script>
import TableEntry from "./TableEntry.vue";

export default {
  components: { TableEntry },
  props: {
    entries: Array,
    start: Number,
    end: Number,
  },
  data() {
    return {
      localEntries: this.entries,
      sortOrder: 1,
    };
  },
  methods: {
    nameSort(field) {
      // console.log("test");
      this.sortOrder *= -1;
      this.localEntries.sort((a, b) => {
        if (a[field] > b[field]) {
          return this.sortOrder;
        }
        return this.sortOrder * -1;
      });
    },
  },
  updated() {
    // sync the local entries when we search
    this.localEntries = this.entries;
  },
};
</script>
