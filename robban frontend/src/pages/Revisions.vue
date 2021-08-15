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
      />
    </div>
  </div>
</template>

<script>
import CurrentReleaseCard from "../components/Revision Page/CurrentReleaseCard.vue";
import Navbar from "../components/General/Navbar.vue";
import PaginationButtons from "../components/General/PaginationButtons.vue";
import ReleaseRevisions from "../components/Revision Page/ReleaseRevisions.vue";

export default {
  components: {
    Navbar,
    CurrentReleaseCard,
    ReleaseRevisions,
    PaginationButtons,
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
    // revisionsLength() {
    //   return revisions.length;
    // },
    currentRelease() {
      const currentRelease = this.releases.filter(
        (el) => el.name === this.releaseId
      );
      return currentRelease[0];
    },
    // currentRevisions() {
    //   const currentRevisions = revisions.filter(
    //     (el) => el.name === this.releaseId
    //   );
    //   return currentRevisions;
    // },
  },
  methods: {
    syncPagination(data) {
      this.pagBegin = data.pagBegin;
      this.pagEnd = data.pagEnd;
    },
    getCurrentRelease() {},
  },
  async mounted() {
    try {
      // Fetching Revisions
      const releaseRevisionsUrl = `http://localhost:3001/api/v1/helm/${this.releaseId}/revisions`;

      const releaseRevisionsResponse = await fetch(releaseRevisionsUrl, {
        method: "GET",
      });

      const releaseRevisionsData = await releaseRevisionsResponse.json();

      // Fetching responses
      const releasesUrl = `http://localhost:3001/api/v1/helm/`;

      const releasesResponse = await fetch(releasesUrl, {
        method: "GET",
      });

      const releasesData = await releasesResponse.json();

      // Checking
      console.log(releasesData.data.releases);
      console.log(releaseRevisionsData.data.history);

      // Loading the data
      this.releases = releasesData.data.releases;
      this.releaseRevisions = releaseRevisionsData.data.history;
    } catch (err) {
      console.log(err);
    }
  },
};
</script>
