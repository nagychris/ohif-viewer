import { brainTumorLongiViewer } from './longi';
import { brainLesionStaticViewer } from './static';

/**
 * HangingProtocolModule should provide a list of hanging protocols that will be
 * available in OHIF for Modes to use to decide on the structure of the viewports
 * and also the series that hung in the viewports. Each hanging protocol is defined by
 * { name, protocols}. Examples include the default hanging protocol provided by
 * the default extension that shows 2x2 viewports.
 */
function getHangingProtocolModule() {
  return [
    {
      name: brainLesionStaticViewer.id,
      protocol: brainLesionStaticViewer,
    },
    {
      name: brainTumorLongiViewer.id,
      protocol: brainTumorLongiViewer,
    },
  ];
}

export default getHangingProtocolModule;
