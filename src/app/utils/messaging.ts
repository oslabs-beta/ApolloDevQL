import React from 'react';

export default function createURICacheListener(
  setRequestURI: React.Dispatch<React.SetStateAction<string>>,
  setEvents: React.Dispatch<React.SetStateAction<{}>>,
) {
  chrome.runtime.onMessage.addListener(request => {
    setRequestURI(request.apolloURI);
    setEvents((evnts: any) => {
      const eventsTmp = evnts;
      if (request.cacheId !== 'null') {
        if (eventsTmp[request.cacheId]) {
          eventsTmp[request.cacheId].cache = request.apolloCache;
        } else {
          eventsTmp[request.cacheId] = {cache: request.apolloCache};
        }
      }
      return eventsTmp;
    });
  });
}
