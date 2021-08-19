import { ipcRenderer } from "electron";

import { HelmHistory, HelmRelease, HelmRepo, IHelmController } from "./helm";

export class HelmMainController implements IHelmController {
  async getReleases(): Promise<HelmRelease[]> {
    return await ipcRenderer.invoke("getReleases");
  }
  async getReleaseValues(release: string): Promise<any> {
    return await ipcRenderer.invoke("getReleaseValues", release);
  }
  async getReleaseHistory(release: string): Promise<HelmHistory[]> {
    return await ipcRenderer.invoke("getReleaseHistory", release);
  }
  async getHelmRepos(): Promise<HelmRepo[]> {
    return await ipcRenderer.invoke("getHelmRepos");
  }
  async getChatVersion(chart: string): Promise<string> {
    return await ipcRenderer.invoke("getChatVersion", chart);
  }
  async getChartName(chart: string): Promise<string> {
    return await ipcRenderer.invoke("getChartName", chart);
  }
  async getDiff(release: string, rev1: number, rev2: number, toJSON: boolean) {
    return await ipcRenderer.invoke("getDiff", release, rev1, rev2, toJSON);
  }
  async getManifest(release: string) {
    return await ipcRenderer.invoke("getManifest", release);
  }
}
