const Helm = require("../cmd backend/helm");

const { getAddedDeletedLines } = require("../utils/diffHelperFunctions");

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

  let files = [];

  const diffObject = JSON.parse(
    await helm.getDiff(
      req.params.relseaseName,
      diffRevisions[0],
      diffRevisions[1],
      true
    )
  );

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
