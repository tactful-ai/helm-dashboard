const { exec } = require("child_process");
const { promisify } = require("util");

const execAsync = promisify(exec);

class Kubectl {
  executable = "kubectl";
  namespace = null;

  constructor(namespace = null) {
    this.namespace = namespace;
  }

  async execute(args, json = false) {
    const format = json ? `--output json` : "";
    const fullCmd = `${this.executable} ${args.join(" ")} ${format}`;

    console.warn("executing: $ ", fullCmd);
    const output = await execAsync(fullCmd);

    return output.stdout;
  }

  async getPods() {
    const output = await this.execute(["get", "pods"]);
    return output;
  }
}

module.exports = Kubectl;
