import fs from "node:fs/promises";
import fg from "fast-glob";
import pc from "picocolors";
import { loadRules } from "../core/load-rules.js";

type Violation = {
  ruleId: string;
  title: string;
  severity: string;
  file: string;
  message: string;
};

export async function checkCommand(): Promise<void> {
  const root = process.cwd();
  const rules = await loadRules(root);

  const violations: Violation[] = [];

  for (const rule of rules) {
    if (!rule.check || rule.check.type !== "text") {
      continue;
    }

    const files = await fg(rule.check.include, {
      cwd: root,
      absolute: false,
      ignore: ["node_modules/**", "dist/**", ".next/**"],
    });

    for (const file of files) {
      const content = await fs.readFile(file, "utf-8");

      const matchedAllPatterns = rule.check.pattern.every((pattern) =>
        content.includes(pattern)
      );

      if (matchedAllPatterns) {
        violations.push({
          ruleId: rule.id,
          title: rule.title,
          severity: rule.severity,
          file,
          message: `Matched patterns: ${rule.check.pattern.join(", ")}`,
        });
      }
    }
  }

  if (violations.length === 0) {
    console.log(pc.green("No rule violations found."));
    return;
  }

  console.log(pc.red(`Found ${violations.length} rule violation(s).`));
  console.log("");

  for (const violation of violations) {
    console.log(pc.red(`✗ ${violation.ruleId}`));
    console.log(`  ${violation.title}`);
    console.log(`  severity: ${violation.severity}`);
    console.log(`  file: ${violation.file}`);
    console.log(`  ${violation.message}`);
    console.log("");
  }

  process.exitCode = 1;
}
