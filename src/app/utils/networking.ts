import React from 'react';

import {getApolloClient} from './messaging';

// The response payload is not immediately available on the httpReq object
// i.e., you can't simply get it using httpReq.response.content
// Instead, you have to invoke the httpReq.getContent() method
function getNetworkResponsePayload(
  httpReq: any,
  setEvents: React.Dispatch<React.SetStateAction<{}>>,
  cacheId: string,
) {
  // console.log('getNetworkResponsePayload called with cacheId', cacheId);
  httpReq.getContent((content: string) => {
    const response = JSON.parse(content);
    setEvents((prevEvents: any) => {
      const newEvents = prevEvents;
      // console.log('getNetworkResponsePayload prevEvents is', prevEvents);
      if (newEvents[cacheId]) {
        // console.log('getResponsePayload - cacheId exists');
        newEvents[cacheId].response = response;
      } else {
        // console.log('getResponsePayload - cacheId does not exist');
        newEvents[cacheId] = {response};
      }
      return newEvents;
    });
  });
}

// Listens for network events and filters them only for GraphQL requests
// Currently only looks for queries and mutations
export default function createNetworkListener(
  requestURI: string,
  setEvents: React.Dispatch<React.SetStateAction<{}>>,
) {
  chrome.devtools.network.onRequestFinished.addListener((httpReq: any) => {
    // We only want to listen for GraphQL events to the Apollo Client URI
    // and POST methods, ignoring any other events
    if (
      httpReq.request.url === requestURI &&
      httpReq.request.method === 'POST'
    ) {
      // console.log('GraphQL Network Request: ', httpReq);

      // Save the actual GraphQL request-related data we just detected
      const operation = JSON.parse(httpReq.request.postData.text);
      const {startedDateTime, time, timings} = httpReq;

      // Generate some unique metaData to correlate the GraphQL network request
      // with the Apollo Client data.
      // The cacheId will store the unix Epoch time of the GraphQL network request
      // It will act as the key in the Events object where the cache and
      // related data will be stored
      const cacheId = new Date(startedDateTime).getTime().toString();

      // Filter for GraphQL queries and mutations
      // TODO: Listen for subscription events
      if (
        operation.query.startsWith('query') ||
        operation.query.startsWith('mutation')
      ) {
        // The response from the GraphQL request is not immediately available
        // Have to invoke the getContent() method to obtain this
        // The callback is asynchronous so we will use our setEvents hook to store
        // the parse respsone data in our events object
        getNetworkResponsePayload(httpReq, setEvents, cacheId);

        // Store all other related data to the Events object first while we wait for
        // a message back from the contentScript with the actual cache itself
        setEvents(evnts => {
          const rstEvent = {
            ...evnts,
            [cacheId]: {
              operation,
              startedDateTime,
              time,
              timings,
              cache: {},
            },
          };
          return rstEvent;
        });

        // Send a message to the content script to get the cache from the Apollo Client
        getApolloClient(cacheId);
      }
    }
  });
}
