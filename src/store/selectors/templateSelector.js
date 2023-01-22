import { createSelector } from 'reselect';

const getTemplateReducer = (state) => state.template;

export const templateListStateSelector = createSelector(
  getTemplateReducer, data => data.templateList
);
export const templateCreateStateSelector = createSelector(
  getTemplateReducer, data => data.templateCreate
);
export const templateUpdateStateSelector = createSelector(
  getTemplateReducer, data => data.templateUpdate
);
export const templateDeleteStateSelector = createSelector(
  getTemplateReducer, data => data.templateDelete
);