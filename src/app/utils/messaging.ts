import React from 'react';

// Listen for messages from the contentScript
// The contentScript will send to the App:
// - Apollo Client URI
// - Apollo Client cache
export default function createURICacheEventListener(
  setApolloURI: React.Dispatch<React.SetStateAction<string>>,
  setStores: React.Dispatch<React.SetStateAction<{}>>,
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
      console.log('App got initial URI_CACHE data :>>', request);

      setApolloURI(request.apolloURI);

      setStores((prevEvents: any) => {
        const newEvents = {...prevEvents};
        let {eventId} = request;
        const {event} = request;

        // Check if this is the initial message sent by the contentScript
        // i.e., received without a pre-generated eventId,
        // so set eventId to zero so it is the smallest value key in the events object
        // This keeps the first cache sent to be chronologically the first one in the events object
        if (eventId === 'null') {
          console.log('createURICacheEventListener eventId is null');
          eventId = '0';
        }

        if (!newEvents[eventId]) {
          console.log(
            'createURICacheEventListener eventId not found on events',
          );
          newEvents[eventId] = {};
        }

        newEvents[eventId] = {...prevEvents[eventId], ...event};
        newEvents[eventId].cache = request.apolloCache;
        newEvents.queryIdCounter = request.queryIdCounter;
        newEvents.mutationIdCounter = request.mutationIdCounter;
        newEvents.requestIdCounter = request.requestIdCounter;
        newEvents.lastEventId = eventId;

        console.log(
          'App on tabId :>>',
          tabId,
          'createURICacheEventListener setEvent :>>',
          newEvents,
        );

        return newEvents;
      });
    } else {
      // v2 has idCounter
      // v3 has requestIdCounter, queryIdCounter, mutationIdCounter
      // Bail out if we don't see the v3 counters for now
      // TODO: support v2 clients
      if (request.queryManager.requestIdCounter === undefined) {
        console.log('App ignoring v2 data', request);
        return;
      }

      console.log('App got client data :>> ', request);

      setStores((prevEvents: any) => {
        const newEvents = {...prevEvents};
        const {
          queryManager,
          action,
          queries,
          mutations,
          inspector,
          eventId,
        } = request;

        const event: any = {};

        if (!newEvents[eventId]) {
          // console.log('newEvents does not have eventId :>> ', eventId);
          newEvents[eventId] = {};
        } else {
          // console.log('newEvents already has eventId :>> ', eventId);
        }

        newEvents[eventId] = {...prevEvents[eventId], ...event};
        newEvents[eventId].cache = request.cache;

        newEvents[eventId].action = action;
        newEvents[eventId].queries = queries;
        newEvents[eventId].mutations = mutations;
        newEvents[eventId].inspector = inspector;
        newEvents[eventId].queryManager = queryManager;

        console.log('newEvents :>> ', newEvents);

        return newEvents;
      });
    }
  });
}

// Send a message to the contentScript to get the Apollo Client cache
// Need to pass it the pre-generated eventId so it can correlate the cache + data
// with its corresponding network request
export function getApolloClient() {
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
      });
    }
  });
}
