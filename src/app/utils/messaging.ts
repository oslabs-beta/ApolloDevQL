import React from 'react';

export default function createURICacheListener(
  setRequestURI: React.Dispatch<React.SetStateAction<string>>,
  setEvents: React.Dispatch<React.SetStateAction<{}>>,
) {
  chrome.runtime.onMessage.addListener(request => {
    // console.log('App received request', request);
    setRequestURI(request.apolloURI);
    setEvents((evnts: any) => {
      const eventsTmp = evnts;
      if (request.cacheId !== 'null') {
        if (eventsTmp[request.cacheId]) {
          eventsTmp[request.cacheId].cache = request.apolloCache;
        } else {
          eventsTmp[request.cacheId] = {cache: request.apolloCache};
        }
      } else {
        // console.log('cacheId is null');
        // This is the very first message received without a pre-generated cacheId,
        // so set cacheId to zero so it is the smallest value key in the events object
        // This keeps the first cache sent to be chronologically the first one in the events object
        const newCacheId = 0;
        // eventsTmp[newCacheId] = {cache: request.apolloCache};
        if (eventsTmp[newCacheId]) {
          eventsTmp[newCacheId].cache = request.apolloCache;
        } else {
          eventsTmp[newCacheId] = {cache: request.apolloCache};
        }
      }
      return eventsTmp;
    });
  });
}
