import React from 'react';

// Listen for messages from the contentScript
// The contentScript will send to the App:
// - Apollo Client URI
// - Apollo Client cache
export default function createURICacheListener(
  setRequestURI: React.Dispatch<React.SetStateAction<string>>,
  setEvents: React.Dispatch<React.SetStateAction<{}>>,
) {
  chrome.runtime.onMessage.addListener(request => {
    // console.log('App received request', request);
    setRequestURI(request.apolloURI);
    setEvents((evnts: any) => {
      const eventsTmp = evnts;

      // Check if this is the initial message sent by the contentScript
      // The initial message will not have a cacheId (i.e. null)
      // All subsequent messages will have a cacheId, so save the cache in the Events object
      // using the cacheId as the key
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
        const newCacheId = '0';
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

// Send a message to the contentScript to get the Apollo Client cache
// Need to pass it the pre-generated cacheId so it can correlate the cache + data
// with its corresponding network request
export function getApolloClient(cacheId: string = 'null') {
  // console.log('getApolloClient called with cacheId', cacheId);
  // Get the active tab and send a message to the contentScript to get the cache
  chrome.tabs.query({active: true}, function getClientData(tabs) {
    // console.log('getApolloClient executing tabs.query with tabs', tabs);
    if (tabs.length) {
      // console.log('getApolloClient sending message to get cache');
      chrome.tabs.sendMessage(tabs[0].id, {
        type: 'GET_CACHE',
        cacheId,
      });
      // console.log('getApolloClient setting Event with operation, timing, etc');
    }
  });
}
