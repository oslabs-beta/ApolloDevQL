import React from 'react';

import useClientEventlogs from './utils/useClientEventlogs';

interface IPerformanceData {
  events: any;
}

function Performance({events}: IPerformanceData) {
  const data = useClientEventlogs();
  console.log('Performance Data :: ', data);
  return (
    <div>
      <p>This is the performance tab</p>
    </div>
  );
}
export default Performance;
