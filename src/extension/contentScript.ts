console.log('Executing contentScript.ts...');

interface IApolloClientHook {
  Apollo11Client: any;
}

// This code will be injected into the DOM of the website
// It will set up an interval timer to try and detect the Apollo Client object
// every 1000ms.  Once it finds it, the interval timer will be cleared
//
// The eventId will be null if this is very first time we are injecting this script
// Otherwise, it will contain the pre-generated unix Epoch time of a GraphQL network event
function detectApolloClient(
  window: any,
  eventId: string = null,
  event: any = null,
) {
  const apolloClientHook: IApolloClientHook = {
    Apollo11Client: null,
  };

  // console.log('Detect Apollo Client with :: ', eventId);

  // Need to add this eslint global to mitigate the following error:
  //   22:26  error    'NodeJS' is not defined       no-undef
  /* global NodeJS */
  let detectionInterval: NodeJS.Timeout;

  // Helper function to actually detect the Apollo Client
  // This function will be executed by the interval timer
  function findApolloClient() {
    if (window.__APOLLO_CLIENT__) {
      apolloClientHook.Apollo11Client = window.__APOLLO_CLIENT__;
      clearInterval(detectionInterval);
      console.log(
        'contentScript findClient - found Apollo client :>>',
        apolloClientHook.Apollo11Client,
      );

      let apolloURI = '';
      // Check if the uri exists on the client object
      if (
        apolloClientHook.Apollo11Client.link &&
        apolloClientHook.Apollo11Client.link.options &&
        apolloClientHook.Apollo11Client.link.options.uri
      ) {
        apolloURI = apolloClientHook.Apollo11Client.link.options.uri;
        // console.log('contentScript findClient - URI exists :>>', apolloURI);
      }

      console.log('findApolloClient event', event);
      // console.log('findApolloClient json event', JSON.parse(event));
      const apolloURICacheEvent = {
        eventId,
        event,
        type: 'FROM_PAGE',
        text: 'Apollo Client URI',
        apolloURI,
        apolloCache: apolloClientHook.Apollo11Client.cache.data.data,
      };
      console.log(
        'contentScript findClient - posting message :>>',
        apolloURICacheEvent,
      );
      // Send a message from the injected script to the contentScript
      // with the Apollo Client URI and the Apollo Client cache
      window.postMessage(apolloURICacheEvent, '*');
    }
  }

  // TODO: We are only clearing the timer if the Apollo client is found, otherwise it will
  // keep running indefinitely.  We should consider stopping it after some extended period
  // of time, such as 10 minutes?  The original Apollo client code stopped after 10 seconds.
  detectionInterval = setInterval(findApolloClient, 1000);
}

// Need to inject our script as an IIFE into the DOM
// This will allow us to obtain the __APOLLO_CLIENT__ object
// on the application's window object.
// https://stackoverflow.com/questions/12395722/can-the-window-object-be-modified-from-a-chrome-extension
const injectScript = (eventId: any = null, event: any = null) => {
  if (document instanceof HTMLDocument) {
    const script = document.createElement('script');
    script.textContent = `;(${detectApolloClient.toString()})(window, '${eventId}', ${JSON.stringify(
      event,
    )})`;
    document.documentElement.appendChild(script);
    script.parentNode.removeChild(script);
  }
};

/* //This message can be recieved by the React app

chrome.runtime.sendMessage({message: 'hello from bg'}, function (response) {
  console.log('response from react', response);
}); */

// chrome.runtime.connect();

// Listen for messages from the App
// If a message to get the cache is received, it will inject the detection code
chrome.runtime.onMessage.addListener(request => {
  console.log('contentScript message received with request :>>', request);
  if (request && request.type && request.type === 'GET_CACHE') {
    injectScript(request.eventId, request.event);
  }
});

// Listen for messages from the injected script
// Once a message is received, it will send a message to the App
// with the Apollo Client URI and cache
window.addEventListener(
  'message',
  function sendClientData(event) {
    console.log('event.data :>> ', event.data);
    // We only accept messages from ourselves
    if (event.source !== window) return;

    if (event.data.type && event.data.type === 'FROM_PAGE') {
      const apolloURICacheEvent = {
        message: event.data.text,
        apolloURI: event.data.apolloURI,
        apolloCache: event.data.apolloCache,
        eventId: event.data.eventId,
        event: event.data.event,
      };
      console.log(
        'contentScript sending Apollo Client to App :>>',
        apolloURICacheEvent,
      );
      // send the apolloclient URI and cache to the App
      chrome.runtime.sendMessage(apolloURICacheEvent);
    }
  },
  false,
);

// Immediately inject the detection code once the contentScript is loaded every time
// we navigate to a new website
// This mitigates issues where the App panel has already mounted and sent its initial
// requests for the URI and cache, but there isn't any website loaded yet (i.e. empty tab)
injectScript();
