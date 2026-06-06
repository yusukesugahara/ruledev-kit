import fs from "node:fs/promises";
import path from "node:path";
import pc from "picocolors";

export async function initCommand(): Promise<void> {
  const root = process.cwd();

  const rulesDir = path.join(root, ".rules");
  const ruleFilesDir = path.join(rulesDir, "rules");

  await fs.mkdir(ruleFilesDir, { recursive: true });

  await fs.writeFile(
    path.join(rulesDir, "project.yml"),
    `name: ruledev-project
description: AI-driven development rules
targets:
  - codex
`,
    "utf-8"
  );

  await fs.writeFile(
    path.join(ruleFilesDir, "ai-workflow.yml"),
    `id: ai.workflow.basic
title: AI開発の基本手順
category: ai-workflow
severity: warning
instruction: |
  実装前に既存構造を確認してください。
  推測で新しい設計を作らず、既存の命名規則・ディレクトリ構造に合わせてください。
  実装後は lint、typecheck、test の実行結果を確認してください。
`,
    "utf-8"
  );

  await fs.writeFile(
    path.join(ruleFilesDir, "nextjs.yml"),
    `id: nextjs.no-client-fetch
title: Client Componentで直接fetchしない
category: frontend
severity: error
instruction: |
  データ取得は Server Component、page.tsx、actions.ts に集約してください。
  Client Component 内で直接 fetch を呼ばないでください。
check:
  type: text
  include:
    - "app/**/*.tsx"
    - "src/**/*.tsx"
  pattern:
    - "useEffect"
    - "fetch("
`,
    "utf-8"
  );

  console.log(pc.green("Created .rules directory."));
}
