const Helm = require("../cmd backend/helm");

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

  res.status(200).json({
    status: "succecss",
    data: {
      history,
    },
  });
};

exports.getDiff = async (req, res, next) => {
  const helm = new Helm();
};
