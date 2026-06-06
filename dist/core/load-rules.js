import fs from "node:fs/promises";
import path from "node:path";
import YAML from "yaml";
export async function loadRules(root = process.cwd()) {
    const rulesDir = path.join(root, ".rules", "rules");
    const entries = await fs.readdir(rulesDir).catch(() => {
        throw new Error(".rules/rules directory not found. Run `rbd init` first.");
    });
    const ymlFiles = entries.filter((file) => file.endsWith(".yml") || file.endsWith(".yaml"));
    const rules = [];
    for (const file of ymlFiles) {
        const fullPath = path.join(rulesDir, file);
        const raw = await fs.readFile(fullPath, "utf-8");
        const parsed = YAML.parse(raw);
        if (!parsed.id || !parsed.title || !parsed.instruction) {
            throw new Error(`Invalid rule file: ${file}`);
        }
        rules.push(parsed);
    }
    return rules;
}
