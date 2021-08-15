<template>
  <div>
    <navbar />
    <div class="content p-6">
      <current-release-card :currentRelease="currentRelease" />
      <pagination-buttons
        :pagBegin="pagBegin"
        :pagEnd="pagEnd"
        :totalLength="revisionsLength"
        :resultsPerPage="resultsPerPage"
        @syncPagination="syncPagination"
      />

      <release-revisions
        :currentRevisions="currentRevisions"
        :pagBegin="pagBegin"
        :pagEnd="pagEnd"
        :revisionsLength="revisionsLength"
      />
    </div>
  </div>
</template>

<script>
import CurrentReleaseCard from "../components/Revision Page/CurrentReleaseCard.vue";
import Navbar from "../components/General/Navbar.vue";
import PaginationButtons from "../components/General/PaginationButtons.vue";
import ReleaseRevisions from "../components/Revision Page/ReleaseRevisions.vue";
import { helmReleases, revisions } from "../utils/_DATA";

export default {
  components: {
    Navbar,
    CurrentReleaseCard,
    ReleaseRevisions,
    PaginationButtons,
  },
  data() {
    return {
      releaseId: this.$route.params.releaseId,
      helmReleases,
      pagBegin: 1,
      pagEnd: 5,
      resultsPerPage: 5,
    };
  },
  computed: {
    revisionsLength() {
      return revisions.length;
    },
    currentRelease() {
      const currentRelease = helmReleases.filter(
        (el) => el.id === this.releaseId
      );
      return currentRelease[0];
    },
    currentRevisions() {
      const currentRevisions = revisions.filter(
        (el) => el.id === this.releaseId
      );
      return currentRevisions;
    },
  },
  methods: {
    syncPagination(data) {
      this.pagBegin = data.pagBegin;
      this.pagEnd = data.pagEnd;
    },
  },
  updated() {
    // console.log(this.pagBegin, this.pagEnd);
  },
};
</script>
