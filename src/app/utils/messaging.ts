import React from 'react';

// Listen for messages from the contentScript
// The contentScript will send to the App:
// - Apollo Client URI
// - Apollo Client cache
export default function createURICacheEventListener(
  setApolloURI: React.Dispatch<React.SetStateAction<string>>,
  setEvents: React.Dispatch<React.SetStateAction<{}>>,
) {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const {tabId} = chrome.devtools.inspectedWindow;

    // Ignore any messages from contentScripts that aren't on the same tab
    // as the currently open Apollo devtools tab
    if (tabId !== sender.tab.id) {
      // console.log(
      //   'App on tabId :>>',
      //   tabId,
      //   'ignoring message from sender :>>',
      //   sender.tab.id,
      // );

      // sendResponse(`App on ${tabId} ignoring message from ${sender.tab.id}`);
      return;
    }

    // console.log(
    //   'App on tabId :>>',
    //   tabId,
    //   'accepting message :>>',
    //   request,
    //   'from sender :>>',
    //   sender.tab.id,
    // );

    sendResponse(`App on ${tabId} accepting message from ${sender.tab.id}`);

    if (request.type === 'URI_CACHE') {
      setApolloURI(request.apolloURI);

      setEvents((prevEvents: any) => {
        const newEvents = {...prevEvents};
        let {eventId} = request;
        const {event} = request;

        // Check if this is the initial message sent by the contentScript
        // i.e., received without a pre-generated eventId,
        // so set eventId to zero so it is the smallest value key in the events object
        // This keeps the first cache sent to be chronologically the first one in the events object
        if (eventId === 'null') {
          // console.log('createURICacheEventListener eventId is null');
          eventId = '0';
        }

        if (!newEvents[eventId]) {
          // console.log('createURICacheEventListener eventId not found on events');
          newEvents[eventId] = {};
        }

        newEvents[eventId] = {...prevEvents[eventId], ...event};
        newEvents[eventId].cache = request.apolloCache;
        newEvents.queryIdCounter = request.queryIdCounter;
        newEvents.mutationIdCounter = request.mutationIdCounter;
        newEvents.requestIdCounter = request.requestIdCounter;

        // console.log(
        //   'App on tabId :>>',
        //   tabId,
        //   'createURICacheEventListener setEvent :>>',
        //   newEvents,
        // );

        return newEvents;
      });
    } else {
      console.log('App got client data', request);
      setEvents((prevEvents: any) => {
        const newEvents = {...prevEvents};
        let {eventId} = request;
        const {queryManager} = request;

        if (eventId === 'null') {
          // console.log('eventId is null, setting to 0');
          eventId = '0';
        }

        if (!newEvents[eventId]) {
          // console.log('newEvents does not have eventId', eventId);
          newEvents[eventId] = {};
        }

        const event: any = {};
        event.request = {};
        event.response = {};

        // console.log(
        //   'queryManager.requestIdCounter :>> ',
        //   queryManager.requestIdCounter,
        // );

        // Check if this event is a new query
        if (queryManager.queryIdCounter > prevEvents.queryIdCounter) {
          // console.log(
          //   'queryManager.queryIdCounter :>> ',
          //   queryManager.queryIdCounter,
          // );

          event.request.operation = {
            operationName:
              queryManager.queriesStore[queryManager.queryIdCounter - 1]
                .document.definitions[0].name.value,
            query:
              queryManager.queriesStore[queryManager.queryIdCounter - 1]
                .document.loc.source.body,
          };
          event.response.content = 'query';
        } else {
          // event is a new mutation
          // console.log(
          //   'queryManager.mutationIdCounter :>> ',
          //   queryManager.mutationIdCounter,
          // );

          event.request.operation = {
            operationName:
              queryManager.mutationStore.store[
                queryManager.mutationIdCounter - 1
              ].mutation.definitions[0].name.value,
            query:
              queryManager.mutationStore.store[
                queryManager.mutationIdCounter - 1
              ].mutation.loc.source.body,
          };
          event.response.content = 'mutation';
        }

        newEvents[eventId] = {...prevEvents[eventId], ...event};
        newEvents[eventId].cache = request.cache;

        // Update all of the counters
        newEvents.requestIdCounter = queryManager.requestIdCounter;
        newEvents.queryIdCounter = queryManager.queryIdCounter;
        newEvents.mutationIdCounter = queryManager.mutationIdCounter;

        // console.log('newEvents :>> ', newEvents);

        return newEvents;
      });
    }
  });
}

// Send a message to the contentScript to get the Apollo Client cache
// Need to pass it the pre-generated eventId so it can correlate the cache + data
// with its corresponding network request
export function getApolloClient(eventId: string = 'null', event: any = null) {
  // Get the active tab and send a message to the contentScript to get the cache
  chrome.tabs.query({active: true}, function getClientData(tabs) {
    if (tabs.length) {
      // console.log(
      //   'App on tabId :>>',
      //   chrome.devtools.inspectedWindow.tabId,
      //   'sending message to tabId :>>',
      //   tabs[0].id,
      //   'to GET_CACHE',
      // );

      chrome.tabs.sendMessage(tabs[0].id, {
        type: 'GET_CACHE',
        eventId,
        event,
      });
    }
  });
}
