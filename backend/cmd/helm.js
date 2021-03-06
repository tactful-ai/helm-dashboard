const { exec } = require("child_process");
const { promisify } = require("util");

const execAsync = promisify(exec);

class Helm {
  executable = "helm";
  namespace = null;

  constructor(namespace = null) {
    this.namespace = namespace;
  }

  async execute(args, json = true) {
    const format = json ? `--output json` : "";
    const fullCmd = `${this.executable} ${args.join(" ")} ${format}`;

    console.warn("executing: $ ", fullCmd);
    const output = await execAsync(fullCmd);

    return output.stdout;
  }

  async getReleases() {
    const output = await this.execute(["list"]);
    return JSON.parse(output);
  }

  async getReleaseValues(release) {
    const output = await this.execute(["get", "values", release]);
    return JSON.parse(output);
  }

  async getReleaseHistory(release) {
    const output = await this.execute(["history", release]);
    return JSON.parse(output);
  }

  async getHelmRepos() {
    const output = await this.execute(["repo", "list"]);
    return JSON.parse(output);
  }

  getChatVersion(chart) {
    const rx = RegExp("-(v?[0-9]+.[0-9]+.[0-9]+.*)");
    let matches = chart.match(rx);
    return matches[0];
  }

  getChartName(chart) {
    let matches = chart.match(/^(.*)-/);
    return matches[0];
  }

  async getDiff(release, rev1, rev2, toJson = false) {
    const output = await this.execute(
      [
        "diff",
        "--output",
        "diff",
        "--no-color",
        "revision",
        release,
        String(rev1),
        String(rev2),
      ],
      toJson
    );
    return output;
  }

  async getManifest(release) {
    const output = await this.execute([
      "get",
      "manifest",
      release,
      "|",
      "kubectl",
      "get",
      "--output=json",
      "-f",
      "-",
    ]);
    return JSON.parse(output);
  }
}

module.exports = Helm;
