import { utils } from '@ohif/core';

const sopClassDictionary = {
  NIFTI_MRI_STORAGE: '1.2.840.10008.5.1.4.1.1.2',
};

// It is important to note that the used SOPClassUIDs in the modes are in the order that is specified in the array.
const sopClassUids = [sopClassDictionary.NIFTI_MRI_STORAGE];

function addInstances(instances) {
  // Add instances to this display set, and return the display set updated.
}

const makeDisplaySet = instances => {
  const instance = instances[0];

  const {
    StudyInstanceUID,
    SeriesInstanceUID,
    SOPInstanceUID,
    SeriesDescription,
    SeriesNumber,
    SeriesDate,
    SOPClassUID,
    wadoRoot,
    wadoUri,
    wadoUriRoot,
  } = instance;

  const displaySet = {
    Modality: 'SEG',
    loading: false,
    isReconstructable: true, // by default for now since it is a volumetric SEG currently
    displaySetInstanceUID: utils.guid(),
    SeriesDescription,
    SeriesNumber,
    SeriesDate,
    SOPInstanceUID,
    SeriesInstanceUID,
    StudyInstanceUID,
    SOPClassHandlerId,
    SOPClassUID,
    referencedImages: null,
    referencedSeriesInstanceUID: null,
    referencedDisplaySetInstanceUID: null,
    isDerivedDisplaySet: true,
    isLoaded: false,
    isHydrated: false,
    segments: {},
    sopClassUids,
    instance,
    instances: [instance],
    wadoRoot,
    wadoUriRoot,
    wadoUri,
    isOverlayDisplaySet: true,
  };

  return displaySet;
};

export const getSopClassHandlerModule = () => [
  {
    name: 'nifti',
    sopClassUids,
    getDisplaySetsFromSeries: makeDisplaySet,
  },
];
