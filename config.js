module.exports = function getConfig(
  configPath = __dirname + "/store.config.json"
) {
  const fs = require("fs");
  const path = require("path");
  const { getFirstUpper, getCamel } = require("./util");
  let config;
  try {
    config = JSON.parse(fs.readFileSync(configPath, "utf8"));
  } catch (err) {}
  if (!config) {
    console.error("read file failed:", configPath);
    process.exit(1);
  }

  config.fileName = config.page.replace(" ", "-");
  config.filePath = path.dirname(configPath) + "/" + config.fileName;
  config.pageFirstUpper = getFirstUpper(config.page);
  config.pageCamel = getCamel(config.page);
  const fullActions = [];
  config.actions.forEach(action => {
    fullActions.push(action);
    action.http
      ? fullActions.push(
          {
            description: action.description + " success",
            param: action.response
              ? {
                  name: action.response.name
                }
              : null
          },
          {
            description: action.description + " fail",
            param: {
              name: "message",
              type: "string"
            }
          }
        )
      : null;
  });
  config.actions = fullActions;
  config.actions.forEach(action => {
    action.enumKey = action.description.toUpperCase().replace(/ /g, "_");
    action.camelName = `${getCamel(action.description)}`;
    action.firstUpper = `${getFirstUpper(action.description)}`;
    action.name = `${getFirstUpper(action.description)}Action`;
  });

  return config;
};
