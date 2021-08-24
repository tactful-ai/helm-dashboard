const Helm = require("../cmd/helm");
const Kubectl = require("../cmd/kubectl");

const {
  getAddedDeletedLines,
  getDeploymentsServicesStats,
  getPodsStats,
} = require("../utils/diffHelperFunctions");

exports.getReleases = async (req, res, next) => {
  const helm = new Helm();
  let releases = await helm.getReleases();

  // Add the chart version
  for (let i = 0; i < releases.length; i++) {
    const chartVersion = await helm.getChatVersion(releases[i].chart);
    releases[i].chartVersion = chartVersion;
    releases[i].updated = releases[i].updated.split(" ")[0];
  }

  res.status(200).json({
    status: "succecss",
    data: {
      releases,
    },
  });
};

exports.getRevisions = async (req, res, next) => {
  const helm = new Helm();
  const history = await helm.getReleaseHistory(req.params.relseaseName);

  // reverse the history array (desscending sort on the revision version)
  history.reverse();

  res.status(200).json({
    status: "succecss",
    data: {
      history,
    },
  });
};

exports.getDiff = async (req, res, next) => {
  const helm = new Helm();
  diffRevisions = [req.params.rev1, req.params.rev2];

  const diffString = await helm.getDiff(
    req.params.relseaseName,
    diffRevisions[0],
    diffRevisions[1]
  );

  const contentArray = diffString.split("default, ");
  // Delete the first element (will be empty)
  contentArray.shift();

  const contentArrayParsed = contentArray.map((fileContent) => {
    return fileContent.split("\n");
  });

  const diffObject = JSON.parse(
    await helm.getDiff(
      req.params.relseaseName,
      diffRevisions[0],
      diffRevisions[1],
      true
    )
  );

  let files = [];

  for (let i = 0; i < diffObject.length; i++) {
    files.push({
      status: diffObject[i].change,
      name: `${diffObject[i].kind}.yaml`,
      content: contentArrayParsed[i],
      changedInfo: {
        addedLines: getAddedDeletedLines(contentArrayParsed[i]).addedLines,
        deletedLines: getAddedDeletedLines(contentArrayParsed[i]).deletedLines,
      },
    });
  }

  res.status(200).json({
    status: "succecss",
    data: {
      files,
    },
  });
};

exports.getStatusSummary = async (req, res, next) => {
  let releasesStatus = [];
  let manifest;
  let podStats;

  const helm = new Helm();
  const kubectl = new Kubectl();
  const pods = await kubectl.getPods();
  const releases = await helm.getReleases();

  for (release of releases) {
    manifest = await helm.getManifest(release.name);
    podStats = getPodsStats(release.name, pods);
    releasesStatus.push({
      releaseName: release.name,
      statComponent: [
        {
          name: "services",
          healthy: getDeploymentsServicesStats(manifest).servicesStats.healthy,
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

  res.status(200).json({
    status: "succecss",
    data: {
      releasesStatus,
    },
  });
};
