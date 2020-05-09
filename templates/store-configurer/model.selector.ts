import { modelStoreConfig } from './model.state';


// import feature selector from index.ts
// const defSelectors = {...modelStoreConfig.getSelectors(selectModels)};
const defSelectors = {...modelStoreConfig.getSelectors(null)};

/** Additional selector definitions */
// const selectSelectedModelIds = createSelector(selectModels, 
//   (models: Models) => models.selectedModelIds,
// );

export const modelSelectors = {
  ...defSelectors,
  /** Additional selector exports */
  // selectSelectedModelIds: selectSelectedModelIds,
};
