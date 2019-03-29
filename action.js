module.exports = function genAction(config) {
  const { getFirstUpperArr } = require("./util");
  const pageFirstUpperArr = getFirstUpperArr(config.page);

  const failActions = config.actions.filter(({ description }) =>
    /fail/.test(description)
  );

  const enumDefine = `import { Action } from '@ngrx/store';
export enum ${config.pageFirstUpper}ActionEnum {
    ${config.actions
      .map(
        ({ enumKey, description }) =>
          `${enumKey} = '[${pageFirstUpperArr.join(" ")}] ${description}',`
      )
      .join("")}
    }           
`;
  const actionDefine = `
    ${config.actions
      .map(
        ({ name, param, enumKey, http }) =>
          `export class ${name} implements Action {
                readonly type = ${config.pageFirstUpper}ActionEnum.${enumKey};
                ${
                  param && !http
                    ? `constructor(public ${param.name}: ${param.type ||
                        "any"}) {}`
                    : ""
                }
           };`
      )
      .join("")}
`;
  const actionType = `
    export type ${config.pageFirstUpper}ActionType =
    ${config.actions.map(({ name }) => name).join("|")}
`;
  const failActionType = `
    export type ${config.pageFirstUpper}FailedActionType =
    ${failActions.map(({ name }) => name).join("|")}
`;

  return enumDefine + actionDefine + actionType + failActionType;
};
