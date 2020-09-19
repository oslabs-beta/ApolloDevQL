console.log('Executing contentScript.ts...');

// Need to inject our script as an IIFE into the DOM
// This will allow us to obtain the __APOLLO_CLIENT__ object
// on the application's window object.
// https://stackoverflow.com/questions/12395722/can-the-window-object-be-modified-from-a-chrome-extension
const injectScript = () => {
  if (document instanceof HTMLDocument) {
    const s = document.createElement('script');
    s.setAttribute('data-version', chrome.runtime.getManifest().version);
    s.src = chrome.extension.getURL('bundles/apollo.bundle.js');
    document.body.appendChild(s);
  }
};

// Listen for messages from the App
// If a message to get the cache is received, it will inject the detection code
chrome.runtime.onMessage.addListener((request, sender) => {
  console.log(
    'contentScript onMessage listener received request :>>',
    request,
    'from sender :>>',
    sender,
  );

  if (request && request.type && request.type === 'GET_CACHE') {
    injectScript();
  }
});

// Listen for messages from the injected script
// Once a message is received, it will send a message to the App
// with the Apollo Client URI and cache
window.addEventListener(
  'message',
  function sendClientData(event) {
    console.log('contentScript window listener got event.data :>>', event.data);

    // We only accept messages from ourselves
    if (event.source !== window) {
      // console.log('contentScript window listener ignoring event :>>', event);
      return;
    }

    if (event.data.type && event.data.type === 'URI_CACHE') {
      // console.log(
      //   'contentScript window listener parsing eventId :>>',
      //   event.data.eventId,
      // );

      const apolloURICacheEvent = {
        type: event.data.type,
        message: event.data.text,
        apolloURI: event.data.apolloURI,
        apolloCache: event.data.apolloCache,
        eventId: event.data.eventId,
        event: event.data.event,
        queryIdCounter: event.data.queryIdCounter,
        mutationIdCounter: event.data.mutationIdCounter,
        requestIdCounter: event.data.requestIdCounter,
      };

      console.log(
        'contentScript sending Apollo URI & cache to App :>>',
        apolloURICacheEvent,
        'for eventId :>>',
        event.data.eventId,
      );

      // send the apolloclient URI and cache to the App
      chrome.runtime.sendMessage(apolloURICacheEvent, response => {
        console.log(
          'contentScript sendMessage got back response :>>',
          response,
        );
      });
    } else if (event.data.type && event.data.type === 'APOLLO_CLIENT') {
      const apolloClient = {
        action: event.data.action,
        queries: event.data.queries,
        mutations: event.data.mutations,
        inspector: event.data.inspector,
        type: event.data.type,
        message: event.data.text,
        cache: event.data.cache,
        queryManager: event.data.queryManager,
        eventId: event.data.eventId,
      };

      console.log(
        'contentScript sending Apollo Client to App :>>',
        apolloClient,
      );

      chrome.runtime.sendMessage(apolloClient, response => {
        console.log(
          'contentScript sendMessage got back response :>>',
          response,
        );
      });
    }
  },
  false,
);

// Immediately inject the detection code once the contentScript is loaded every time
// we navigate to a new website
// This mitigates issues where the App panel has already mounted and sent its initial
// requests for the URI and cache, but there isn't any website loaded yet (i.e. empty tab)

injectScript();
