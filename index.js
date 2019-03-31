#!/usr/bin/env node

const program = require("commander");

program.version("0.1.0").description("auto generate action.ts with config.js");
const getConfig = require("./config");
const { writeFile } = require("./util");

const genAction = require("./action");
const genService = require("./service");
const getEffects = require("./effects");
const getReducer = require("./reducer");

program
  .command("p <configPath>")
  .option("-a, --action", "generate action")
  .option("-r, --reducer", "generate reducer")
  .option("-e, --effects", "generate effects")
  .option("-s, --service", "generate service")
  .option("-all, --all", "generate all")
  .action((configPath, cmd) => {
    const config = getConfig(configPath);
    if (cmd.all) {
      writeFile(config.filePath, "action", genAction(config));
      writeFile(config.filePath, "service", genService(config));
      writeFile(config.filePath, "effects", getEffects(config));
      writeFile(config.filePath, "reducer", getReducer(config));
      return;
    }
    if (cmd.action) {
      writeFile(config.filePath, "action", genAction(config));
    } else if (cmd.effects) {
      writeFile(config.filePath, "effects", genEffects(config));
    } else if (cmd.service) {
      writeFile(config.filePath, "service", genService(config));
    } else if (cmd.reducer) {
      writeFile(config.filePath, "reducer", genReducer(config));
    }
  });

program.parse(process.argv);
