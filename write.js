
  fs.writeFile(
    path.dirname(configPath) + `/${pageArr.join("-")}.action.ts`,
    actionContent,
    () => {
      console.log(
        `------
        you generate action with: 
      ${configPath}`
      );
      process.exit(1);
    }
  );
