import { createLocalNiftiDataSource } from './localNifti';

/**
 * Defines which data sources to use in the viewer. Data sources fetch data from
 * an API and map the data to the OHIF-internal format.
 */
function getDataSourcesModule() {
  return [
    {
      name: 'localNifti',
      type: 'webApi',
      createDataSource: createLocalNiftiDataSource,
    },
  ];
}

export default getDataSourcesModule;
