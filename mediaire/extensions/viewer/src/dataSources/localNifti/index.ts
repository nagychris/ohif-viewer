import { IWebApiDataSource, utils } from '@ohif/core';
import { volumeLoader } from '@cornerstonejs/core';
import {
  createNiftiImageIdsAndCacheMetadata,
  cornerstoneNiftiImageLoader,
} from '@cornerstonejs/nifti-volume-loader';

export const createLocalNiftiDataSource = (dicomWebConfig, servicesManager) =>
  IWebApiDataSource.create({
    initialize: async () => {
      //TODO: initialize API client
    },
    getStudyInstanceUIDs({ params, query }) {
      const { StudyInstanceUIDs: paramsStudyInstanceUIDs } = params;
      const queryStudyInstanceUIDs = utils.splitComma(query.getAll('StudyInstanceUIDs'));

      const StudyInstanceUIDs =
        (queryStudyInstanceUIDs.length && queryStudyInstanceUIDs) || paramsStudyInstanceUIDs;
      const StudyInstanceUIDsAsArray =
        StudyInstanceUIDs && Array.isArray(StudyInstanceUIDs)
          ? StudyInstanceUIDs
          : [StudyInstanceUIDs];

      return StudyInstanceUIDsAsArray;
    },
    query: {
      //mapParams: async params => {},
      studies: {
        search: async params => {
          // TODO: implement for study list
          // at the moment we don't need the study list in the viewer
          return [];
        },
      },
      series: {
        search: async studyInstanceUID => {
          // TODO: fetch all series from a single study from API
          const niftiURL = 'http://localhost:3000/brain/tumor/tumor_T1.nii.gz';
          const url = `nifti:${niftiURL}`;
          const volumeId = `cornerstoneStreamingImageVolume:${niftiURL}`;

          try {
            // TODO: somehow if the file is not found, the code does not throw an error
            const imageIds = await createNiftiImageIdsAndCacheMetadata({ url });
            if (!imageIds.length) {
              throw new Error();
            }
            const volume = await volumeLoader.createAndCacheVolume(volumeId, {
              imageIds,
            });
            volume.load(() => {});

            return [{ volumeId }];
          } catch (error) {
            console.error(error);
            throw new Error(`Could not load nifti with url ${niftiURL}`);
          }
        },
      },
    },
    retrieve: {
      bulkDataURI: async (wadoUri, params) => {},
      series: {
        metadata: async () => {
          // TODO: fetch series metadata from API
        },
      },
    },
    store: {
      dicom: async (studyInstanceUID, seriesInstanceUID, instance, params) => {},
    },
  });
