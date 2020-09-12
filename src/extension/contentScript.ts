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
        'contentScript findApolloClient found :>>',
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

      // console.log('findApolloClient event', event);
      // console.log('findApolloClient json event', JSON.parse(event));
      const apolloURICacheEvent = {
        eventId,
        event,
        type: 'URI_CACHE',
        text: 'Apollo Client URI',
        apolloURI,
        apolloCache: apolloClientHook.Apollo11Client.cache.data.data,
        queryIdCounter:
          apolloClientHook.Apollo11Client.queryManager.queryIdCounter,
        mutationIdCounter:
          apolloClientHook.Apollo11Client.queryManager.mutationIdCounter,
        requestIdCounter:
          apolloClientHook.Apollo11Client.queryManager.requestIdCounter,
      };

      // console.log(
      //   'contentScript findClient - posting message :>>',
      //   apolloURICacheEvent,
      // );

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

const apolloHook = (window: any) => {
  let detectionInterval: NodeJS.Timeout;

  const findApolloClient = () => {
    if (window.__APOLLO_CLIENT__) {
      clearInterval(detectionInterval);

      console.log(
        'contentScript injected hook found client',
        window.__APOLLO_CLIENT__,
      );

      window.__APOLLO_CLIENT__.__actionHookForDevTools(
        ({
          action,
          state: {queries, mutations},
          dataWithOptimisticResults: inspector,
        }) => {
          const apolloCache = window.__APOLLO_CLIENT__.cache;
          const apolloQM = window.__APOLLO_CLIENT__.queryManager;
          let cache: any = {};
          const queryManager: any = {};
          if (apolloCache && apolloCache.data && apolloCache.data.data) {
            cache = apolloCache.data.data;
          }
          if (apolloQM) {
            const store: any = {};
            apolloQM.queries.forEach((info: any, queryId: any) => {
              store[queryId] = {
                variables: info.variables,
                networkStatus: info.networkStatus,
                networkError: info.networkError,
                graphQLErrors: info.graphQLErrors,
                document: info.document,
                diff: info.diff,
              };
            });
            queryManager.mutationIdCounter = apolloQM.mutationIdCounter;
            queryManager.mutationStore = apolloQM.mutationStore;
            queryManager.queriesStore = store;
            queryManager.queryIdCounter = apolloQM.queryIdCounter;
            queryManager.requestIdCounter = apolloQM.requestIdCounter;
          }
          const eventId = new Date().getTime().toString();
          const apolloClient = {
            type: 'APOLLO_CLIENT',
            text: 'Apollo Client',
            action,
            queries,
            mutations,
            inspector,
            cache,
            queryManager,
            eventId,
          };
          window.postMessage(apolloClient);
        },
      );
    }
  };
  detectionInterval = setInterval(findApolloClient, 1000);
};

const injectHook = () => {
  if (document instanceof HTMLDocument) {
    const script = document.createElement('script');
    script.textContent = `;(${apolloHook.toString()})(window)`;
    document.documentElement.appendChild(script);
    script.parentNode.removeChild(script);
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
    injectScript(request.eventId, request.event);
  }
});

// Listen for messages from the injected script
// Once a message is received, it will send a message to the App
// with the Apollo Client URI and cache
window.addEventListener(
  'message',
  function sendClientData(event) {
    // console.log('contentScript window listener got event.data :>>', event.data);

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

injectHook();

// Immediately inject the detection code once the contentScript is loaded every time
// we navigate to a new website
// This mitigates issues where the App panel has already mounted and sent its initial
// requests for the URI and cache, but there isn't any website loaded yet (i.e. empty tab)
injectScript();
