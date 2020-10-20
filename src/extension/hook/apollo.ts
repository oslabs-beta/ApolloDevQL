// This callback is injected into the Apollo Client and will be invoked whenever
// there is a query or mutation operation
//
// When invoked, it will collect the Apollo Client cache and related stores to
// send to the contentScript for further processing in our extension
function apollo11Callback(
  win: any,
  action: any,
  queries: any,
  mutations: any,
  inspector: any,
  initial: boolean = false,
) {
  // If the callback is invoked with a special HEARTBEAT action,
  // it will simply return the HEARTBEAT to show that it is still
  // "alive" -- i.e., injected in the Apollo Client
  if (action === 'HEARTBEAT') {
    return 'APOLLO11_CALLBACK_HEARTBEAT';
  }

  const queryManager: any = {};

  const apolloCache = win.__APOLLO_CLIENT__.cache;
  let cache: any = {};
  if (apolloCache && apolloCache.data && apolloCache.data.data) {
    cache = apolloCache.data.data;
  }

  const apolloQM = win.__APOLLO_CLIENT__.queryManager;
  if (apolloQM) {
    const store: any = {};
    if (apolloQM.queries instanceof Map) {
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
    }

    queryManager.queriesStore = store;
    queryManager.mutationStore = apolloQM.mutationStore.store;

    // The counters below were being used to determine when new queries
    // or mutations were handled in the Apollo Client.  They're no longer
    // used as we are now diffing the object structure but are still
    // being sent for the time being

    // v3 counters
    queryManager.requestIdCounter = apolloQM.requestIdCounter;
    queryManager.queryIdCounter = apolloQM.queryIdCounter;
    queryManager.mutationIdCounter = apolloQM.mutationIdCounter;

    // v2 counter
    queryManager.idCounter = apolloQM.idCounter;
  }

  const {link} = win.__APOLLO_CLIENT__;
  let apolloURI = '';
  if (link && link.options && link.options.uri) {
    apolloURI = link.options.uri;
  }

  // If this is the very first (i.e. INITIAL) invocation of the callback,
  // set the eventId to 0 so that the app knows how to handle the very first
  // cache in the client, which might be empty
  const type = initial ? 'INITIAL' : 'APOLLO_CLIENT';
  const eventId = initial ? '0' : new Date().getTime().toString();
  const apolloClient = {
    type,
    eventId,
    apolloURI,
    cache,
    action,
    inspector,
    queries,
    mutations,
    queryManager,
  };

  win.postMessage(apolloClient);
  return undefined;
}

// Injects our callback into the Apollo Client by invoking the built-in hook
// It does not preserve any other callback that might have been injected into
// it previously
const injectApollo11Callback = (win: any) => {
  if (win.__APOLLO_CLIENT__) {
    win.__APOLLO_CLIENT__.__actionHookForDevTools(
      ({
        action,
        state: {queries, mutations},
        dataWithOptimisticResults: inspector,
      }) => {
        const heartbeat = apollo11Callback(
          win,
          action,
          queries,
          mutations,
          inspector,
        );
        return heartbeat;
      },
    );
  }
};

// This HEARTBEAT "listener" will invoke our injected callback and if it
// doesn't get a HEARTBEAT response, it means our callback has been
// overwritten by another extension.
//
// It will the attempt to re-inject our callback into the devToolsHookCb
const heartbeatListener = () => {
  const win: any = window;
  const options = {
    action: 'HEARTBEAT',
    state: {queries: {}, mutations: {}},
    dataWithOptimisticResults: {},
  };
  const heartbeat = win.__APOLLO_CLIENT__.devToolsHookCb(options);
  if (heartbeat !== 'APOLLO11_CALLBACK_HEARTBEAT') {
    injectApollo11Callback(win);
  }
};

// This IIFE will be invoked by the contentScript whenever the user navigates
// to a new website.  It will set up an interval timer that will wait for the
// presence of an __APOLLO_CLIENT__ object on the window.
// If it finds it, it will invoke and inject our callback into the Apollo Client
// and clear the interval timer previously set.
// Once injected, it will also set up a HEARTBEAT listener to ensure that our
// callback has not been removed or overwritten by another extension.
(function hooked(win: any) {
  // eslint-disable-next-line no-undef
  let detectionInterval: NodeJS.Timeout;
  const findApolloClient = () => {
    if (win.__APOLLO_CLIENT__) {
      clearInterval(detectionInterval);

      // Immediately invoke the callback to retrieve the initial state of the
      // Apollo Client cache
      apollo11Callback(win, null, null, null, null, true);
      injectApollo11Callback(win);
      setInterval(heartbeatListener, 1000);
    }
  };
  detectionInterval = global.setInterval(findApolloClient, 1000);
})(window);
