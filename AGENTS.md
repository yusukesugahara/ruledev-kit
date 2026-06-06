# AGENTS.md

This repository is developed with AI assistance.
Follow these rules when modifying RuleDev Kit.

## Project Overview

RuleDev Kit is a CLI library for rule-based AI-driven development.

The CLI provides:

```bash
ruledev init
ruledev compile
ruledev check
```

The goal is to help developers:

- define development rules in `.rules/rules/*.yml`
- compile rules into AI-readable files such as `AGENTS.md`
- check source files against rule definitions
- make AI coding more repeatable, reviewable, and rule-based

## Core Development Rules

Before editing, inspect the existing structure.

Do not make broad or speculative changes.
Do not refactor unrelated files.
Do not introduce new architecture unless explicitly requested.

Keep changes small, understandable, and easy to review.

## Repository Structure

Keep responsibilities separated.

```txt
src/
├── cli.ts
├── commands/
│   ├── init.ts
│   ├── compile.ts
│   └── check.ts
└── core/
    ├── load-rules.ts
    └── render-agents.ts
```

### `src/cli.ts`

Only register CLI commands.

Do not put file system logic, parsing logic, validation logic, or business logic here.

### `src/commands/*.ts`

Command files handle command-level orchestration.

They may:

- read `process.cwd()`
- call core functions
- print user-facing messages
- set `process.exitCode`

### `src/core/*.ts`

Core files contain reusable logic.

They should:

- load and validate rule definitions
- render instruction files
- check files against rules
- avoid unnecessary coupling to Commander

## TypeScript Rules

This project uses strict TypeScript.

Follow these rules:

- Avoid `any`.
- Prefer explicit types for exported functions.
- Use ESM import/export.
- Use `.js` extensions in relative imports because the project uses `NodeNext`.
- Use `node:` prefixes for Node.js built-in modules.

Example:

```ts
import fs from "node:fs/promises";
import path from "node:path";
import { loadRules } from "../core/load-rules.js";
```

## CLI Rules

The public CLI command is `ruledev`.

Do not use `rbd` as the public command name because it can conflict with existing Linux tooling.

Current commands:

```bash
ruledev init
ruledev compile
ruledev check
```

When adding a command:

- register it in `src/cli.ts`
- implement the handler in `src/commands/<command>.ts`
- move reusable logic to `src/core`
- update README examples

## Generated File Rules

The root `AGENTS.md` is the development guide for this repository.

Do not overwrite it with generated sample output.

When testing generation, use:

```bash
ruledev compile --out examples/basic/AGENTS.md
```

Do not run plain `ruledev compile` in this repository unless you intentionally want to overwrite root `AGENTS.md`.

## Validation Rules

After changing TypeScript source code, run:

```bash
npm run check
npm run build
```

After changing rule loading, rendering, or checking behavior, also run:

```bash
ruledev compile --out examples/basic/AGENTS.md
ruledev check
```

Do not ignore TypeScript errors.
Do not silence errors with broad casts or `any` unless there is a clear reason.

## Scope Control

Do not do the following unless explicitly requested:

- rename the package
- change the package manager
- convert ESM to CommonJS
- change the CLI name
- introduce a framework
- add unrelated formatting tools
- rewrite the project structure
- remove existing commands

## Current Priority

The MVP focuses on:

1. initializing `.rules`
2. compiling rules into `AGENTS.md`
3. checking simple text-based rule violations
4. safely generating output with `--out`

Avoid advanced features until this MVP is stable.
