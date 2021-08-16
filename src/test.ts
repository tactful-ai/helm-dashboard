import { Helm } from "./helm-server";

async function main(): Promise<any> {

    const helm = new Helm();

    let releases = await helm.getReleases();
    console.log(releases);

    const release = releases[0];
    console.log(helm.getChartName(release.chart));
    console.log(helm.getChatVersion(release.chart));

    let history = await helm.getReleaseHistory(release.name);
    console.log(history);
    console.log(await helm.getDiff(release.name, history[history.length -3].revision, history[history.length -2].revision));
    return 0;
}


main().then();