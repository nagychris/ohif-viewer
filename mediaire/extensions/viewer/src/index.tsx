import getHangingProtocolModule from './hangingProtocols/getHangingProtocolModule';
import { id } from './id';
import { Types } from '@ohif/core';
import { initNiftiImageLoader } from './nifti/initNiftiLoader';
import getDataSourcesModule from './dataSources/getDataSourcesModule';
import { getSopClassHandlerModule } from './getSopClassHandlerModule';

const mediaireViewerExtension: Types.Extensions.Extension = {
  id,
  getHangingProtocolModule,
  getDataSourcesModule,
  getSopClassHandlerModule,
  preRegistration: () => {
    initNiftiImageLoader();
  },
};

export default mediaireViewerExtension;
