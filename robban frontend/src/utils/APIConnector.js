export class APIConnector {
  async getReleases() {
    try {
      const url = `http://localhost:3001/api/v1/helm/`;

      const response = await fetch(url, {
        method: "GET",
      });
      const data = await response.json();

      return data.data.releases;
    } catch (err) {
      console.log(err);
    }
  }

  async getRevision(releaseId) {
    try {
      const releaseRevisionsUrl = `http://localhost:3001/api/v1/helm/${releaseId}/revisions`;

      const releaseRevisionsResponse = await fetch(releaseRevisionsUrl, {
        method: "GET",
      });

      const releaseRevisionsData = await releaseRevisionsResponse.json();
      return releaseRevisionsData.data.history;
    } catch (err) {
      console.log(err);
    }
  }

  async getDiff(releaseName, rev1, rev2) {
    try {
      const url = `http://localhost:3001/api/v1/helm/${releaseName}/revisions/${rev1}/${rev2}`;
      const response = await fetch(url, {
        method: "GET",
      });
      const data = await response.json();

      return data.data.files;
    } catch (err) {
      console.log(err);
    }
  }

  async getStatusSummary() {
    try {
      const url = `http://localhost:3001/api/v1/helm/statusSummary`;

      const response = await fetch(url, {
        method: "GET",
      });

      const data = await response.json();
      return data.data.releasesStatus;
    } catch (err) {
      console.log(err);
    }
  }
}
