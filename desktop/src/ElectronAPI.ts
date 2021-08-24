import { HelmMainController } from "./electron-client";
import {
  getAddedDeletedLines,
  getPodsStats,
  getDeploymentsServicesStats,
} from "./helper";

import { Kubectl } from "./Kubectl";

export class ElectronAPI {
  async getReleases() {
    const helm = new HelmMainController();
    const releases: any = await helm.getReleases();

    for (let i = 0; i < releases.length; i++) {
      const chartVersion = await helm.getChatVersion(releases[i].chart);
      releases[i].chartVersion = chartVersion;
      releases[i].updated = releases[i].updated.split(" ")[0];
    }

    return releases;
  }

  async getRevision(releaseName: string) {
    const helm = new HelmMainController();
    const history = await helm.getReleaseHistory(releaseName);

    history.reverse();

    return history;
  }

  async getDiff(releaseName: string, rev1: number, rev2: number) {
    const helm = new HelmMainController();
    const diffRevisions = [rev1, rev2];

    const diffString = await helm.getDiff(
      releaseName,
      diffRevisions[0],
      diffRevisions[1],
      false
    );

    const contentArray = diffString.split("default, ");
    // Delete the first element (will be empty)
    contentArray.shift();

    const contentArrayParsed = contentArray.map((fileContent: string) => {
      return fileContent.split("\n");
    });

    const diffObject = JSON.parse(
      await helm.getDiff(releaseName, diffRevisions[0], diffRevisions[1], true)
    );

    // console.log(diffObject);

    let files = [];

    for (let i = 0; i < diffObject.length; i++) {
      files.push({
        status: diffObject[i].change,
        name: `${diffObject[i].kind}.yaml`,
        content: contentArrayParsed[i],
        changedInfo: {
          addedLines: getAddedDeletedLines(contentArrayParsed[i]).addedLines,
          deletedLines: getAddedDeletedLines(contentArrayParsed[i])
            .deletedLines,
        },
      });
    }
    return files;
  }

  async getStatusSummary() {
    let releasesStatus = [];
    let manifest;
    let podStats;

    const helm = new HelmMainController();
    const kubectl = new Kubectl();
    const pods = await kubectl.getPods();
    const releases = await helm.getReleases();

    for (let release of releases) {
      manifest = await helm.getManifest(release.name);
      podStats = getPodsStats(release.name, pods);
      releasesStatus.push({
        releaseName: release.name,
        statComponent: [
          {
            name: "services",
            healthy:
              getDeploymentsServicesStats(manifest).servicesStats.healthy,
            warning: 0,
            error: 0,
          },
          {
            name: "pods",
            healthy: podStats.podsStats.healthy,
            warning: podStats.podsStats.warning,
            error: podStats.podsStats.error,
          },
          {
            name: "deployments",
            healthy:
              getDeploymentsServicesStats(manifest).deploymentsStats.healthy,
            warning: 0,
            error: getDeploymentsServicesStats(manifest).deploymentsStats.error,
          },
        ],
      });
    }

    return releasesStatus;
  }
}
