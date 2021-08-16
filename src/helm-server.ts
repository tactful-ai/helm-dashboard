import { exec } from "child_process";
import {promisify} from "util";
import { HelmHistory, HelmRelease, HelmRepo } from "./helm";

const execAsync = promisify(exec);


export class Helm {
    executable: string = "helm";
    namespace: string = null;
    
    constructor(namespace: string = null) {
        this.namespace = namespace;
    }
    
    async execute(args: string[], json: boolean = true) : Promise<string> {
        const format = json? `--output json` : "";
        const fullCmd: string = `${this.executable} ${args.join(" ")} ${format}`;

        console.warn("executing: $ ", fullCmd);
        const output = await execAsync(fullCmd);

        return output.stdout;
    }

    async getReleases(): Promise<HelmRelease[]> {
        const output = await this.execute(["list"]);
        return JSON.parse(output) as HelmRelease[];
    } 

    async getReleaseValues(release: string) : Promise<any> {
        const output = await this.execute(["get", "values", release]);
        return JSON.parse(output);
    }

    async getReleaseHistory(release: string): Promise<HelmHistory[]> {
        const output = await this.execute(["history", release]);
        return JSON.parse(output) as HelmHistory[];
    }

    async getHelmRepos(): Promise<HelmRepo[]> {
        const output = await this.execute(["repo", "list"]);
        return JSON.parse(output) as HelmRepo[];
    }

    getChatVersion(chart: string): string {
        const rx = RegExp("-(v?[0-9]+\.[0-9]+\.[0-9]+.*)");
        let matches = chart.match(rx);
        return matches[0];
    }

    getChartName(chart: string) : string {
        let matches = chart.match(/^(.*)-/);
        return matches[0];
    }

    async getDiff(release: string, rev1: number, rev2: number): Promise<string> {
        const output = await this.execute(["diff", "--output", "diff", "--no-color", "revision", release, String(rev1), String(rev2)], false);
        return output;
    }
}
