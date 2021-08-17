<template>
  <div>
    <navbar />
    <div class="content p-6">
      <current-release-card :currentRelease="currentRelease" />

      <pagination-buttons
        :pagBegin="pagBegin"
        :pagEnd="pagEnd"
        :totalLength="releaseRevisions.length"
        :resultsPerPage="resultsPerPage"
        @syncPagination="syncPagination"
      />

      <release-revisions
        :currentRevisions="releaseRevisions"
        :pagBegin="pagBegin"
        :pagEnd="pagEnd"
        :revisionsLength="releaseRevisions.length"
        :userAgent="userAgent"
      />
    </div>
  </div>
</template>

<script>
import CurrentReleaseCard from "../components/Revision Page/CurrentReleaseCard.vue";
import Navbar from "../components/General/Navbar.vue";
import PaginationButtons from "../components/General/PaginationButtons.vue";
import ReleaseRevisions from "../components/Revision Page/ReleaseRevisions.vue";

import { APIConnector } from "../utils/APIConnector";
import { ElectronAPI } from "../../../desktopElectron/dist/ElectronAPI";

export default {
  components: {
    Navbar,
    CurrentReleaseCard,
    ReleaseRevisions,
    PaginationButtons,
  },
  props: {
    userAgent: { type: String },
  },
  data() {
    return {
      releaseId: this.$route.params.releaseName,
      releaseRevisions: [],
      releases: [],
      pagBegin: 1,
      pagEnd: 5,
      resultsPerPage: 5,
    };
  },
  computed: {
    currentRelease() {
      const currentRelease = this.releases.filter(
        (el) => el.name === this.releaseId
      );
      return currentRelease[0];
    },
  },
  methods: {
    syncPagination(data) {
      this.pagBegin = data.pagBegin;
      this.pagEnd = data.pagEnd;
    },
    getCurrentRelease() {},
  },
  async mounted() {
    let api;
    if (this.userAgent === "Electron") {
      api = new ElectronAPI();
    } else {
      api = new APIConnector();
    }

    const revisions = await api.getRevision(this.releaseId);
    const releases = await api.getReleases();

    this.releases = releases;
    this.releaseRevisions = revisions;
  },
};
</script>
