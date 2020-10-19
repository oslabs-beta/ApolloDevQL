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
chrome.runtime.onMessage.addListener(request => {
  if (request && request.type && request.type === 'GET_APOLLO_CLIENT') {
    injectScript();
  }
});

// Listen for messages from the injected script
// Once a message is received, it will send a message to the App
// with the Apollo Client URI and cache
window.addEventListener(
  'message',
  function sendClientData(event) {
    // We only accept messages from ourselves
    if (event.source !== window) {
      return;
    }

    const apolloClient = {
      type: event.data.type,
      eventId: event.data.eventId,
      apolloURI: event.data.apolloURI,
      cache: event.data.cache,
      action: event.data.action,
      inspector: event.data.inspector,
      queries: event.data.queries,
      mutations: event.data.mutations,
      queryManager: event.data.queryManager,
    };
    console.log('apolloClient :>> ', apolloClient);
    chrome.runtime.sendMessage(apolloClient);
  },
  false,
);

// Immediately inject the detection code once the contentScript is loaded every time
// we navigate to a new website
// This mitigates issues where the App panel has already mounted and sent its initial
// requests for the URI and cache, but there isn't any website loaded yet (i.e. empty tab)
injectScript();
