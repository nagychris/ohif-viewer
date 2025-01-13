import { imageLoader } from '@cornerstonejs/core';
import { ImageLoaderFn } from '@cornerstonejs/core/types';
import { cornerstoneNiftiImageLoader, init } from '@cornerstonejs/nifti-volume-loader';

const NIFTI_IMAGE_LOADER_SCHEME = 'nifti';

export const initNiftiImageLoader = () => {
  init({
    beforeSend: (xhr, headers, url) => {
      // TODO: auth headers
      headers['Cornerstone3D-Is-Awesome'] = 'True';
      return headers;
    },
  });

  imageLoader.registerImageLoader(
    NIFTI_IMAGE_LOADER_SCHEME,
    cornerstoneNiftiImageLoader as unknown as ImageLoaderFn
  );
};
