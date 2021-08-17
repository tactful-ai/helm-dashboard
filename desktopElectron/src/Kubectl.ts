import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export class Kubectl {
  executable: string = "kubectl";
  namespace: string = null;

  constructor(namespace: string = null) {
    this.namespace = namespace;
  }

  async execute(args: string[], json = false) {
    const format = json ? `--output json` : "";
    const fullCmd = `${this.executable} ${args.join(" ")} ${format}`;

    // console.warn("executing: $ ", fullCmd);
    const output = await execAsync(fullCmd);

    return output.stdout;
  }

  async getPods() {
    const output = await this.execute(["get", "pods"]);
    return output;
  }
}
