import React from 'react';

// interface IApolloEventLog {
//   [key: string]: any;
// }

const useClientEventlogs = (evts?: any) => {
  const [eventLogs, updateEventLogs] = React.useState(() => {});
  React.useEffect(() => {
    if (evts) {
      console.log('updating hook wt ', evts);
      updateEventLogs(evts);
    }
  }, [evts]);
  return eventLogs;
};

export default useClientEventlogs;
