// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process unless
// nodeIntegration is set to true in webPreferences.
// Use preload.js to selectively enable features
// needed in the renderer process.
import { HelmMainController } from "./electron-client";

(async () => {
  let helm = new HelmMainController();

  let releases = await helm.getReleases();
  console.log(releases);

  const release = releases[2];
  console.log(helm.getChartName(release.chart));
  console.log(helm.getChatVersion(release.chart));

  let history = await helm.getReleaseHistory(release.name);
  console.log(history);
  console.log(
    await helm.getDiff(
      release.name,
      history[history.length - 3].revision,
      history[history.length - 2].revision,
      true
    )
  );
  return 0;
})().then();
