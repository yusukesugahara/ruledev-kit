import fs from "node:fs/promises";
import path from "node:path";
import YAML from "yaml";

export type RuleSeverity = "error" | "warning" | "info";

export type TextCheck = {
  type: "text";
  include: string[];
  pattern: string[];
};

export type Rule = {
  id: string;
  title: string;
  category: string;
  severity: RuleSeverity;
  instruction: string;
  check?: TextCheck;
};

export async function loadRules(root = process.cwd()): Promise<Rule[]> {
  const rulesDir = path.join(root, ".rules", "rules");

  const entries = await fs.readdir(rulesDir).catch(() => {
    throw new Error(".rules/rules directory not found. Run `rbd init` first.");
  });

  const ymlFiles = entries.filter((file) => file.endsWith(".yml") || file.endsWith(".yaml"));

  const rules: Rule[] = [];

  for (const file of ymlFiles) {
    const fullPath = path.join(rulesDir, file);
    const raw = await fs.readFile(fullPath, "utf-8");
    const parsed = YAML.parse(raw) as Rule;

    if (!parsed.id || !parsed.title || !parsed.instruction) {
      throw new Error(`Invalid rule file: ${file}`);
    }

    rules.push(parsed);
  }

  return rules;
}
