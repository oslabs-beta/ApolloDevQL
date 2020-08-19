import React from 'react';

import {getApolloClient} from './messaging';

// Listens for network events and filters them only for GraphQL requests
// Currently only looks for queries and mutations
export default function createNetworkListener(
  setApolloURI: React.Dispatch<React.SetStateAction<{}>>,
  setEvents: React.Dispatch<React.SetStateAction<{}>>,
) {
  chrome.devtools.network.onRequestFinished.addListener((httpReq: any) => {
    // console.log('Network Request :>> ', httpReq);

    const operation = httpReq.request.postData
      ? JSON.parse(httpReq.request.postData.text)
      : null;

    // Filter for GraphQL queries and mutations
    // TODO: Listen for subscription events
    if (
      operation &&
      operation.query &&
      (operation.query.startsWith('query') ||
        operation.query.startsWith('mutation'))
    ) {
      const {startedDateTime, time, timings} = httpReq;
      const request = {
        bodySize: httpReq.request.bodySize,
        headerSize: httpReq.request.headersSize,
        method: httpReq.request.method,
        operation,
        url: httpReq.request.url,
      };
      const response = {
        bodySize: httpReq.response.bodySize,
        headersSize: httpReq.response.headersSize,
      };

      console.log('Network listener saw GraphQL request :>> ', request);
      console.log('Network listener saw GraphQL response :>> ', response);

      console.log(
        'Network listener updating apolloURI with network request.url :>>',
        httpReq.request.url,
      );
      setApolloURI(httpReq.request.url);
      // }

      // The eventId will store the Unix epoch time of the GraphQL network request
      // It will act as the key in the Events object where the cache and
      // related data will be stored
      const eventId = new Date(startedDateTime).getTime().toString();

      console.log(
        'Network listener updating Events with request/response data for eventId :>>',
        eventId,
      );
      // The response from the GraphQL request is not immediately available
      // Have to invoke the getContent() method to obtain this
      httpReq.getContent((content: string) => {
        setEvents((prevEvents: any) => {
          const events = {...prevEvents};
          if (!events[eventId]) events[eventId] = {};
          events[eventId].request = request;
          events[eventId].response = response;
          events[eventId].response.content = JSON.parse(content);
          events[eventId].response.content.size = httpReq.response.content.size;
          events[eventId].startedDateTime = startedDateTime;
          events[eventId].time = time;
          events[eventId].timings = timings;
          return events;
        });
      });

      // Send a message to the content script to get the cache from the Apollo Client
      console.log(
        'Network listener sending message to get Apollo Client for eventId :>>',
        eventId,
      );
      getApolloClient(eventId);
    }
    // }
  });
}
