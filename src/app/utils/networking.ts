import React from 'react';

// Parses the network request to find a potentially valid GraphQL operation
// Currently only supports HTTP POST and GET methods
const getGraphQLOperation = (httpReq: any) => {
  const {request} = httpReq;
  let operation;

  if (
    request.method === 'POST' &&
    request.postData &&
    request.postData.text &&
    request.postData.mimeType &&
    request.postData.mimeType.includes('json')
  ) {
    operation = JSON.parse(request.postData.text);

    // In some cases, the operation field is an Array
    if (Array.isArray(operation)) {
      [operation] = operation;
    }

    if (operation) {
      if (!operation.query) {
        // console.log('Operation has no query object');
        operation = null;
      }

      // Previously we required these keywords in the query but now we
      // relaxed that restriction and simply log it if we don't see it
      // if (
      //   !operation.query.startsWith('query') &&
      //   !operation.query.startsWith('mutation') &&
      //   !operation.query.startsWith('fragment')
      // ) {
      //   console.log('Operation does not start with keyword');
      // }
    }
  }

  if (request.method === 'GET' && request.queryString) {
    if (Array.isArray(request.queryString)) {
      operation = {};
      request.queryString.forEach(item => {
        operation[item.name] = decodeURIComponent(item.value);
      });
      const keys = Object.keys(operation);
      if (keys.includes('operationName') || keys.includes('query')) {
        // console.log('graphQL GET operation', operation, 'for URL', request.url);
      } else {
        // console.log('graphQL GET has no operationName or query', operation);
        operation = null;
      }
    }
  }

  // For debugging only -- log the network request if we can't parse it
  // properly but there's a 'graphql' string in the URL.
  // if (
  //   !operation &&
  //   request.url.includes('graphql') &&
  //   request.method !== 'OPTIONS'
  // ) {
  //   console.log('Ignoring potential graphql request', request);
  // }

  return operation;
};

// Listens for network events and filters them only for GraphQL requests
// Currently only looks for queries and mutations
export default function createNetworkEventListener(
  setNetworkURI: React.Dispatch<React.SetStateAction<{}>>,
  setNetworkEvents: React.Dispatch<React.SetStateAction<{}>>,
) {
  chrome.devtools.network.onRequestFinished.addListener((httpReq: any) => {
    const operation = getGraphQLOperation(httpReq);

    if (!operation) return;

    const searchIndex = httpReq.request.url.indexOf('?');
    const baseURL =
      searchIndex !== -1
        ? httpReq.request.url.slice(0, searchIndex)
        : httpReq.request.url;
    const {startedDateTime, time, timings} = httpReq;
    const request = {
      bodySize: httpReq.request.bodySize,
      headersSize: httpReq.request.headersSize,
      method: httpReq.request.method,
      operation,
      url: baseURL,
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

    if (httpReq.request.method === 'POST') {
      // console.log('httpReq.request.url :>> ', httpReq.request.url);
      setNetworkURI(httpReq.request.url);
    }

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
        // console.log(
        //   'httpReq.getContent has no content.size for event :>>',
        //   event,
        // );
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
