<template>
  <navbar />
  <search-table
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

// import { releasesStatus } from "../utils/_DATA";

export default {
  components: {
    Navbar,
    PaginationButtons,
    StatusCard,
    SearchTable,
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
    try {
      const url = `http://localhost:3001/api/v1/helm/statusSummary`;

      console.log(url);

      const response = await fetch(url, {
        method: "GET",
      });

      const data = await response.json();
      console.log(data.data.releasesStatus);

      this.releasesStatus = data.data.releasesStatus;
      this.releasesStatusCopy = data.data.releasesStatus;
      this.totalLength = data.data.releasesStatus.length;
    } catch (err) {
      console.log(err);
    }
  },
  updated() {
    // console.log(this.pagBegin);
  },
};
</script>
