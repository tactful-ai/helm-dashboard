<template>
  <div class="">
    <navbar />
    <div class="p-8 w-full">
      <div class="group-container flex ">
        <search-table
          :key="rerenderSearchTable"
          :resultsPerPage="parseInt(resultsPerPage)"
          @reflectSearch="syncSearch"
          :entries="entries"
          :entriesCopy="entriesCopy"
          :pagBegin="pagBegin"
          :pagEnd="pagEnd"
          fieldToSearchFor="name"
          :totalLength="totalLength"
        />

        <div class="update-range mx-4">
          <select-option
            :options="['Recently updated', 'Today', 'This Week', 'This Month']"
            :entriesCopy="entriesCopy"
            :entries="entries"
            @syncGroupChanges="syncGroupChanges"
          />
        </div>

        <div class="status mx-4">
          <select-option
            :options="['Status', 'unknown', 'deployed', 'uninstalled']"
            :entriesCopy="entriesCopy"
            :entries="entries"
            :pagBegin="pagBegin"
            :pagEnd="pagEnd"
            @syncGroupChanges="syncGroupChanges"
          />
        </div>

        <div class="results-per-page mx-4">
          <select-option
            :options="['Results Per Page', '3', '9', '20']"
            :entriesCopy="entriesCopy"
            :entries="entries"
            @syncPagesChanges="syncPagesChanges"
          />
        </div>
      </div>

      <pagination-buttons
        :key="pagEnd"
        :resultsPerPage="parseInt(resultsPerPage)"
        :pagBegin="parseInt(pagBegin)"
        :pagEnd="parseInt(pagEnd)"
        @syncPagination="syncPagination"
        :totalLength="parseInt(totalLength)"
      />

      <releases-table
        :entries="entriesCopy"
        :start="pagBegin"
        :end="Math.min(pagEnd, totalLength)"
        :totalLength="totalLength"
      />
    </div>
  </div>
</template>

<script>
import ReleasesTable from "../components/HelmReleasesPage/ReleasesTable.vue";
import SelectOption from "../components/HelmReleasesPage/SelectOption.vue";
import SearchTable from "../components/General/SearchTable.vue";
import PaginationButtons from "../components/General/PaginationButtons.vue";
import Navbar from "../components/General/Navbar.vue";

import { APIConnector } from "../utils/APIConnector";

const ElectronAPI = async () =>
  await import("../../../desktop/dist/ElectronAPI");

export default {
  components: {
    SelectOption,
    ReleasesTable,
    Navbar,
    SearchTable,
    PaginationButtons,
  },
  props: {
    userAgent: { type: String },
  },
  data() {
    return {
      entries: [],
      entriesCopy: [],
      resultsPerPage: 3,
      pagBegin: 1,
      pagEnd: 3,
      totalLength: 0,
      rerenderSearchTable: Math.random(),
    };
  },
  methods: {
    syncSearch(data) {
      this.entriesCopy = data.entriesCopyLocal;
      this.totalLength = data.totalLengthLocal;
      this.pagBegin = data.pagBeginLocal;
      this.pagEnd = data.pagEndLocal;
    },

    syncGroupChanges(data) {
      // console.log(entriesCopyLocal);
      this.entriesCopy = data.entriesCopyLocal;
      this.totalLength = data.totalLengthLocal;
    },
    syncPagesChanges(data) {
      this.pagBegin = data.pagBeginLocal;
      this.pagEnd = data.pagEndLocal;
      this.resultsPerPage = data.resultsPerPageLocal;
    },
    syncPagination(data) {
      this.pagBegin = data.pagBegin;
      this.pagEnd = data.pagEnd;
    },
  },

  async mounted() {
    let api;
    if (this.userAgent === "Electron") {
      const ElectronAPIImports = await ElectronAPI();
      api = await new ElectronAPIImports.ElectronAPI();

      // api = await new ElectronAPI();
    } else {
      api = new APIConnector();
    }
    const releases = await api.getReleases();
    this.entries = releases;
    this.entriesCopy = releases;
    this.totalLength = releases.length;
  },
  watch: {
    entries() {
      this.rerenderSearchTable = Math.random();
    },
    pagEnd() {
      this.rerenderSearchTable = Math.random();
    },
  },
};
</script>
