export interface HelmRelease {
  name: string;
  namespace: string;
  revision: string;
  updated: string;
  status: string;
  chart: string;
  app_version: string;
}

export interface HelmRepo {
  name: string;
  url: string;
}

export interface HelmHistory {
  revision: number;
  updated: string;
  status: string;
  chart: string;
  app_version: string;
  description: string;
}

export interface ImageVersion {
  name: string;
  tag: string;
}

export interface IHelmController {
  getReleases(): Promise<HelmRelease[]>;
  getReleaseValues(release: string): Promise<any>;
  getReleaseHistory(release: string): Promise<HelmHistory[]>;
  getHelmRepos(): Promise<HelmRepo[]>;
  getChatVersion(chart: string): Promise<string>;
  getChartName(chart: string): Promise<string>;
  getDiff(
    release: string,
    rev1: number,
    rev2: number,
    toJSON: boolean
  ): Promise<any>;
}
