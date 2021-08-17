/* eslint-disable */

import { ipcRenderer } from "electron";
// import { HelmHistory, HelmRelease, HelmRepo, IHelmController } from "./helm";

export class HelmMainController {
  async getReleases() {
    return await ipcRenderer.invoke("getReleases");
  }
  async getReleaseValues(release) {
    return await ipcRenderer.invoke("getReleaseValues", release);
  }
  async getReleaseHistory(release) {
    return await ipcRenderer.invoke("getReleaseHistory", release);
  }
  async getHelmRepos() {
    return await ipcRenderer.invoke("getHelmRepos");
  }
  async getChatVersion(chart) {
    return await ipcRenderer.invoke("getChatVersion", chart);
  }
  async getChartName(chart) {
    return await ipcRenderer.invoke("getChartName", chart);
  }
  async getDiff(release, rev1, rev2) {
    return await ipcRenderer.invoke("getDiff", release, rev1, rev2);
  }
}
