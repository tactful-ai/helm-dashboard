// import { Helm } from "./helm";
const Helm = require("./helm");

async function main() {
  const helm = new Helm();

  let releases = await helm.getReleases();
  console.log("releases are:::::", releases);

  const release = releases[0];
  console.log("chart name::::::::", helm.getChartName(release.chart));
  console.log("chart version::::", helm.getChatVersion(release.chart));

  let history = await helm.getReleaseHistory(release.name);
  console.log(history);
  console.log(
    "\nnewline",
    await helm.getDiff(
      release.name,
      history[history.length - 2].revision,
      history[history.length - 1].revision
    )
  );
  return 0;
}

main().then();
