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
import ReleasesTable from "../components/HelmReleases Page/ReleasesTable.vue";
import SelectOption from "../components/HelmReleases Page/SelectOption.vue";
import SearchTable from "../components/General/SearchTable.vue";
import PaginationButtons from "../components/General/PaginationButtons.vue";
import Navbar from "../components/General/Navbar.vue";

export default {
  components: {
    SelectOption,
    ReleasesTable,
    Navbar,
    SearchTable,
    PaginationButtons,
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
      this.resultsPerPage = data.resultsPerPage;
    },
    syncPagination(data) {
      this.pagBegin = data.pagBegin;
      this.pagEnd = data.pagEnd;
    },
  },

  async mounted() {
    try {
      const url = `http://localhost:3001/api/v1/helm/`;

      const response = await fetch(url, {
        method: "GET",
      });

      const data = await response.json();
      console.log(data.data.releases);

      this.entries = data.data.releases;
      this.entriesCopy = data.data.releases;
      this.totalLength = data.data.releases.length;
    } catch (err) {
      console.log(err);
    }
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
