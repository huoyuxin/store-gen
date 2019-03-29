module.exports = function genReducer(config) {
  const { pageFirstUpper, actions, fileName } = config;
  return `import {
  ${pageFirstUpper}ActionType,
  ${pageFirstUpper}ActionEnum,
} from './${fileName}.action';
import { createFeatureSelector } from '@ngrx/store';

export interface State {
  data: any;
}

export const initialState: State = {
  data: undefined
};

export function reducer(
  state: State = initialState,
  action: ${pageFirstUpper}ActionType
) {
  switch (action.type) {
    ${actions
      .filter(n => n.http)
      .map(
        ({ enumKey }) =>
          `
    case ${pageFirstUpper}ActionEnum.${enumKey}:
      return {
        ...state,
      };`
      )
      .join("")}
      default:
      return state;
  }
}
export const get${pageFirstUpper}State = createFeatureSelector<State>(
  '${pageFirstUpper}'
);
`;
};
