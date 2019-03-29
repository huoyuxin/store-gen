const fs = require("fs");
function getFirstUpperArr(str) {
  return str.split(" ").map(n => n[0].toUpperCase() + n.slice(1));
}

function getFirstUpper(str) {
  return getFirstUpperArr(str).join("");
}

function getCamel(str) {
  return str
    .split(" ")
    .map((n, i) => (i === 0 ? n : n[0].toUpperCase() + n.slice(1)))
    .join("");
}

function writeFile(filePath, type, content) {
  fs.writeFile(`${filePath}.${type}.ts`, content, () => {
    console.log(
      `------
        you generate ${type} with: 
      ${filePath}`
    );
    process.exit(1);
  });
}

module.exports = {
  getFirstUpperArr,
  getFirstUpper,
  writeFile,
  getCamel
};
