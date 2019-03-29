module.exports = function genService(config) {
  const { getCamel } = require("./util");
  return `
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ${config.pageFirstUpper}Service {
  constructor(private http: HttpClient) {}
${config.actions
  .map(action =>
    !action.http
      ? ""
      : `
  /**
   * ${action.http.description}
   * @param ${action.param.name} - ${action.param.description}
   */
  ${getCamel(action.description)}(${action.param.name}: ${action.param.type}) {
    return this.http.${action.http.method}(
      \`${action.http.url}\`
      ${
        action.http.method === "post"
          ? `,${action.param.name}
          ,
          {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
          }`
          : ""
      }
    );
  }`
  )
  .join("")}
}`;
};
