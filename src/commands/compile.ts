import fs from "node:fs/promises";
import path from "node:path";
import pc from "picocolors";
import { loadRules } from "../core/load-rules.js";
import { renderAgentsMd } from "../core/render-agents.js";

export async function compileCommand(): Promise<void> {
  const root = process.cwd();

  const rules = await loadRules(root);
  const agentsMd = renderAgentsMd(rules);

  await fs.writeFile(path.join(root, "AGENTS.md"), agentsMd, "utf-8");

  console.log(pc.green(`Generated AGENTS.md from ${rules.length} rules.`));
}
