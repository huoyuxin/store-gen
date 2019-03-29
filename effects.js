module.exports = function genEffects(config) {
  const { pageCamel, pageFirstUpper, actions, fileName } = config;
  return `import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import {
  ${pageFirstUpper}ActionEnum,
  ${actions
    .filter(n => /fail|success/.test(n.description))
    .map(n => n.name)
    .join(",")}
} from './${fileName}.action';
import { ${pageFirstUpper}Service } from './${fileName}.service';

@Injectable()
export class ${pageFirstUpper}Effects {
  constructor(
    private actions$: Actions,
    private ${pageCamel}Service: ${pageFirstUpper}Service
  ) {}
    ${actions
      .filter(n => n.http)
      .map(
        ({ camelName, enumKey, firstUpper, param, response = { name: "" } }) =>
          `
  @Effect()
  ${camelName}$ = this.actions$.pipe(
    ofType(${pageFirstUpper}ActionEnum.${enumKey}),
    mergeMap(({${param.name}}) =>
      this.${pageCamel}Service.${camelName}(${param.name}).pipe(
        map((${response.name}) => new ${firstUpper}SuccessAction(${
            response.name
          })),
                catchError(({ error }) => of(new ${firstUpper}FailAction(error.message)))
      )
    )
  );`
      )
      .join("")}
}

`;
};
