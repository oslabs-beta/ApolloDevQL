import React from 'react';

const getGraphQLOperation = (httpReq: any) => {
  // console.log('getGraphQLOperation parsing request', request);

  const {request} = httpReq;
  let operation;

  if (
    request.method === 'POST' &&
    request.postData &&
    request.postData.mimeType.includes('json') &&
    request.postData.text
  ) {
    operation = JSON.parse(request.postData.text);
    // console.log('getGraphQLOperation parsing request', request);
    // console.log('getGraphQLOperation parsing response', response);

    // console.log('Parsed operation :>>', operation, 'for URL', request.url);

    if (Array.isArray(operation)) {
      // console.log('Operation is array with length', operation.length);
      [operation] = operation;
    }

    if (operation) {
      if (!operation.query) {
        // console.log('Operation has no query object');
        operation = null;
      } else if (
        !operation.query.startsWith('query') &&
        !operation.query.startsWith('mutation') &&
        !operation.query.startsWith('fragment')
      ) {
        console.log('Operation does not start with keyword');
      }
    }
  } else if (request.method === 'GET' && request.queryString) {
    if (Array.isArray(request.queryString)) {
      operation = {};
      request.queryString.forEach(item => {
        operation[item.name] = decodeURIComponent(item.value);
      });
      const keys = Object.keys(operation);
      if (keys.includes('operationName') || keys.includes('query')) {
        console.log('graphQL GET operation', operation, 'for URL', request.url);
      } else {
        operation = null;
      }
    }
  }

  if (!operation && request.url.includes('graphql')) {
    console.log('Ignoring potential graphql request', request);
  }

  return operation;
};

// Listens for network events and filters them only for GraphQL requests
// Currently only looks for queries and mutations
export default function createNetworkEventListener(
  setNetworkURI: React.Dispatch<React.SetStateAction<{}>>,
  setNetworkEvents: React.Dispatch<React.SetStateAction<{}>>,
) {
  chrome.devtools.network.onRequestFinished.addListener((httpReq: any) => {
    // console.log('Network Request :>> ', httpReq);

    const operation = getGraphQLOperation(httpReq);

    if (!operation) return;

    const {startedDateTime, time, timings} = httpReq;
    const request = {
      bodySize: httpReq.request.bodySize,
      headersSize: httpReq.request.headersSize,
      method: httpReq.request.method,
      operation,
      url: httpReq.request.url,
    };
    const response = {
      bodySize: httpReq.response.bodySize,
      headersSize: httpReq.response.headersSize,
    };

    // The eventId will store the Unix epoch time of the GraphQL network request
    // It will act as the key in the Events object where the cache and
    // related data will be stored
    const requestId = new Date(startedDateTime).getTime().toString();
    const eventId = new Date().getTime().toString();

    // console.log('Network eventId :>>', eventId, 'request :>>', request);
    // console.log('Network eventId :>>', eventId, 'response :>>', response);

    // console.log(
    //   'Network listener updating apolloURI with network request.url :>>',
    //   httpReq.request.url,
    // );
    setNetworkURI(httpReq.request.url);

    // console.log(
    //   'Network listener updating Events with request/response data for eventId :>>',
    //   eventId,
    // );
    // The response from the GraphQL request is not immediately available
    // Have to invoke the getContent() method to obtain this
    httpReq.getContent((content: string) => {
      const event: any = {};
      event.requestId = requestId;
      event.eventId = eventId;
      event.request = request;
      event.response = response;
      event.response.content = JSON.parse(content);
      if (httpReq.response.content.size) {
        event.response.content.size = httpReq.response.content.size;
      } else {
        console.log(
          'httpReq.getContent has no content.size for event :>>',
          event,
        );
      }
      event.startedDateTime = startedDateTime;
      event.time = time;
      event.timings = timings;

      setNetworkEvents(prevNetworkEvents => {
        const newNetworkEvents = {...prevNetworkEvents};

        if (!newNetworkEvents[eventId]) {
          newNetworkEvents[eventId] = {};
        }

        newNetworkEvents[eventId] = {...prevNetworkEvents[eventId], ...event};

        return newNetworkEvents;
      });
    });
  });
}
