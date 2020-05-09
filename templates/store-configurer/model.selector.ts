import { modelStoreConfig } from './model.state';


// const defSelectors = {...modelStoreConfig.getSelectors(selectModels)};
const defSelectors = {...modelStoreConfig.getSelectors(null)};

export const modelSelectors = {
  ...defSelectors,
};
