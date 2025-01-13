import { HangingProtocol } from '@ohif/core';

export const brainTumorLongiViewer: HangingProtocol.Protocol = {
  id: '@mediaire/brain/tumor/longitudinal',
  locked: true,
  name: 'Longitudinal Brain Tumor Viewer',
  imageLoadStrategy: 'interleaveCenter',
  numberOfPriorsReferenced: 1,
  protocolMatchingRules: [
    {
      id: 'Two Studies',
      weight: 1000,
      attribute: 'StudyInstanceUID',
      from: 'prior',
      required: true,
      constraint: {
        notEquals: undefined,
      },
    },
  ],
  displaySetSelectors: {
    displaySetNew: {
      studyMatchingRules: [
        {
          // The priorInstance is a study counter that indicates what position this study is in
          // and the value comes from the options parameter.
          attribute: 'studyInstanceUIDsIndex',
          from: 'options',
          required: true,
          constraint: {
            equals: { value: 0 },
          },
        },
      ],
      seriesMatchingRules: [
        {
          attribute: 'numImageFrames',
          constraint: {
            greaterThan: { value: 0 },
          },
        },
        // This display set will select the specified items by preference
        // It has no affect if nothing is specified in the URL.
        {
          attribute: 'isDisplaySetFromUrl',
          weight: 10,
          constraint: {
            equals: true,
          },
        },
      ],
    },
    displaySetOld: {
      studyMatchingRules: [
        {
          // The priorInstance is a study counter that indicates what position this study is in
          // and the value comes from the options parameter.
          attribute: 'studyInstanceUIDsIndex',
          from: 'options',
          required: true,
          constraint: {
            equals: { value: 1 },
          },
        },
      ],
      seriesMatchingRules: [
        {
          attribute: 'numImageFrames',
          constraint: {
            greaterThan: { value: 0 },
          },
        },
        // This display set will select the specified items by preference
        // It has no affect if nothing is specified in the URL.
        {
          attribute: 'isDisplaySetFromUrl',
          weight: 10,
          constraint: {
            equals: true,
          },
        },
      ],
    },
  },
  stages: [
    {
      id: '@mediaire/longiStage',
      name: '@mediaire/brain/tumor/longitudinal',
      viewportStructure: {
        layoutType: 'grid',
        properties: {
          rows: 1,
          columns: 2,
        },
      },
      viewports: [
        {
          viewportOptions: {
            toolGroupId: 'mpr',
            viewportType: 'volume',
            orientation: 'axial',
            initialImageOptions: {
              preset: 'middle',
            },
            syncGroups: [
              {
                type: 'voi',
                id: 'mpr',
                source: true,
                target: true,
                options: {
                  syncColormap: true,
                },
              },
            ],
          },
          displaySets: [
            {
              id: 'displaySetOld',
            },
          ],
        },
        {
          viewportOptions: {
            toolGroupId: 'mpr',
            viewportType: 'volume',
            orientation: 'axial',
            initialImageOptions: {
              preset: 'middle',
            },
            syncGroups: [
              {
                type: 'voi',
                id: 'mpr',
                source: true,
                target: true,
                options: {
                  syncColormap: true,
                },
              },
            ],
          },
          displaySets: [
            {
              id: 'displaySetNew',
            },
          ],
        },
      ],
    },
  ],
};
