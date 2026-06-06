#!/usr/bin/env node
import { Command } from "commander";
import { initCommand } from "./commands/init.js";
import { compileCommand } from "./commands/compile.js";
import { checkCommand } from "./commands/check.js";
const program = new Command();
program
    .name("rbd")
    .description("Rules as Code toolkit for AI-driven development")
    .version("0.1.0");
program
    .command("hello")
    .description("Check that the CLI works")
    .action(() => {
    console.log("Hello from RuleDev Kit");
});
program
    .command("init")
    .description("Create initial .rules directory")
    .action(initCommand);
program
    .command("compile")
    .description("Compile rules into AI instruction files")
    .action(compileCommand);
program
    .command("check")
    .description("Check project files against rule definitions")
    .action(checkCommand);
program.parse();
