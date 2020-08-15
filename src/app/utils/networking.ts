import React from 'react';

function getNetworkResponsePayload(
  httpReq: any,
  setEvents: React.Dispatch<React.SetStateAction<{}>>,
  cacheId: number,
) {
  httpReq.getContent((content: string) => {
    const response = JSON.parse(content);
    setEvents((prevEvents: any) => {
      const newEvents = prevEvents;
      if (newEvents[cacheId]) {
        newEvents[cacheId].response = response;
      } else {
        newEvents[cacheId] = {response};
      }
      return newEvents;
    });
  });
}
function getApolloClient(
  cacheId: number,
  setEvents: React.Dispatch<React.SetStateAction<{}>>,
  operation: any,
  startedDateTime: any,
  time: any,
  timings: any,
) {
  chrome.tabs.query({active: true, currentWindow: true}, function getClientData(
    tabs,
  ) {
    if (tabs.length) {
      chrome.tabs.sendMessage(tabs[0].id, {
        type: 'GET_CACHE',
        cacheId,
      });
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
    }
  });
}
export default function createNetworkListener(
  requestURI: string,
  setEvents: React.Dispatch<React.SetStateAction<{}>>,
) {
  chrome.devtools.network.onRequestFinished.addListener((httpReq: any) => {
    if (
      httpReq.request.url === requestURI &&
      httpReq.request.method === 'POST'
    ) {
      console.log('GraphQL Network Request: ', httpReq);

      // Save the actual GraphQL request-related data we just detected
      const operation = JSON.parse(httpReq.request.postData.text);
      const {startedDateTime, time, timings} = httpReq;

      // Generate some unique metaData to correlate the GraphQL network request
      // with the Apollo Client data.
      const cacheId = new Date(startedDateTime).getTime();

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

        // Send a message to the content script to get the cache from the Apollo Client
        getApolloClient(
          cacheId,
          setEvents,
          operation,
          startedDateTime,
          time,
          timings,
        );
      }
    }
  });
}
