import React from 'react';

import {EventPanelType} from '../utils/managedlog/lib/eventLogNode';

export default function EventPanel({
  children,
  panelValue,
  panelIndex,
}: EventPanelType) {
  return (
    <div
      role="tabpanel"
      hidden={panelValue !== panelIndex}
      id={`simple-tabpanel-${panelIndex}`}
      aria-labelledby={`simple-tab-${panelIndex}`}>
      {panelValue === panelIndex && <>{children}</>}
    </div>
  );
}
