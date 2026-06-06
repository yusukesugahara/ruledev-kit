import fs from "node:fs/promises";
import path from "node:path";
import pc from "picocolors";
import { loadRules } from "../core/load-rules.js";
import { renderAgentsMd } from "../core/render-agents.js";
export async function compileCommand(options = {}) {
    const root = process.cwd();
    const outputPath = options.out ?? "AGENTS.md";
    const resolvedOutputPath = path.isAbsolute(outputPath)
        ? outputPath
        : path.join(root, outputPath);
    const rules = await loadRules(root);
    const agentsMd = renderAgentsMd(rules);
    await fs.mkdir(path.dirname(resolvedOutputPath), { recursive: true });
    await fs.writeFile(resolvedOutputPath, agentsMd, "utf-8");
    console.log(pc.green(`Generated ${outputPath} from ${rules.length} rules.`));
}
