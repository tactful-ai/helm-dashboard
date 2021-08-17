<template>
  <navbar />
  <search-table
    :key="releasesStatus"
    class="mt-8"
    :pagBegin="pagBegin"
    :pagEnd="pagEnd"
    :entries="releasesStatus"
    :entriesCopy="releasesStatusCopy"
    :totalLength="totalLength"
    :resultsPerPage="12"
    fieldToSearchFor="releaseName"
    @reflectSearch="reflectSearch"
  />
  <pagination-buttons
    :pagBegin="pagBegin"
    :pagEnd="pagEnd"
    :totalLength="totalLength"
    :resultsPerPage="12"
    :key="pagEnd"
    @syncPagination="syncPagination"
  />

  <div class="status-cards-container flex flex-wrap p-4  justify-center">
    <div v-for="index in parseInt(Math.min(pagEnd, totalLength))" :key="index">
      <status-card
        v-if="index - 1 >= pagBegin - 1"
        :summary="releasesStatusCopy[index - 1]"
      />
    </div>
  </div>
</template>

<script>
import Navbar from "../components/General/Navbar.vue";
import PaginationButtons from "../components/General/PaginationButtons";
import StatusCard from "../components/ReleasesSummary Page/StatusCard.vue";
import SearchTable from "../components/General/SearchTable";

import { APIConnector } from "../utils/APIConnector";
import { ElectronAPI } from "../../../desktopElectron/dist/ElectronAPI";

export default {
  components: {
    Navbar,
    PaginationButtons,
    StatusCard,
    SearchTable,
  },
  props: {
    userAgent: { type: String },
  },
  data() {
    return {
      releasesStatus: [],
      releasesStatusCopy: [],
      pagBegin: 1,
      pagEnd: 12,
      totalLength: 0,
    };
  },
  methods: {
    syncPagination(data) {
      this.pagBegin = data.pagBegin;
      this.pagEnd = data.pagEnd;
    },
    reflectSearch(data) {
      this.pagBegin = data.pagBeginLocal;
      this.pagEnd = data.pagEndLocal;
      this.releasesStatusCopy = data.entriesCopyLocal;
      this.totalLength = data.totalLengthLocal;
    },
  },
  async mounted() {
    let api;
    if (this.userAgent === "Electron") {
      api = new ElectronAPI();
    } else {
      api = new APIConnector();
    }
    const statusSummary = await api.getStatusSummary();

    this.releasesStatus = statusSummary;
    this.releasesStatusCopy = statusSummary;
    this.totalLength = statusSummary.length;
  },
  updated() {
    // console.log(this.releasesStatus);
  },
};
</script>
