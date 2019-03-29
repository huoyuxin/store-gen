#!/usr/bin/env node

const program = require("commander");

program.version("0.1.0").description("auto generate action.ts with config.js");

program.command("p <configPath>").action(configPath => {
  const getConfig = require("./config");
  const { writeFile } = require("./util");
  const genAction = require("./action");
  const genService = require("./service");
  const getEffects = require("./effects");
  const getReducer = require("./reducer");

  const config = getConfig(configPath);

  writeFile(config.filePath, "action", genAction(config));
  writeFile(config.filePath, "service", genService(config));
  writeFile(config.filePath, "effects", getEffects(config));
  writeFile(config.filePath, "reducer", getReducer(config));
});

program.parse(process.argv);
