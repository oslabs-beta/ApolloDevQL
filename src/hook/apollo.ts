function apollo11Callback(
  win: any,
  action: any,
  queries: any,
  mutations: any,
  inspector: any,
  initial: boolean = false,
) {
  // console.log(
  //   'apollo11Callback win.__APOLLO_CLIENT__ :>> ',
  //   win.__APOLLO_CLIENT__,
  // );

  // console.log('RECEIVED action :>> ', action);

  if (action === 'HEARTBEAT') {
    // console.log('Sending HEARTBEAT');
    return 'APOLLO11_CALLBACK_HEARTBEAT';
  }

  const {link} = win.__APOLLO_CLIENT__;
  let apolloURI = '';

  const apolloCache = win.__APOLLO_CLIENT__.cache;
  const apolloQM = win.__APOLLO_CLIENT__.queryManager;
  let cache: any = {};
  const queryManager: any = {};
  if (apolloCache && apolloCache.data && apolloCache.data.data) {
    cache = apolloCache.data.data;
  }
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
    } else {
      console.log('apolloQM.queries is not a Map :>> ', apolloQM.queries);
    }
    queryManager.queriesStore = store;
    queryManager.mutationStore = apolloQM.mutationStore.store;

    // v3 counters
    queryManager.requestIdCounter = apolloQM.requestIdCounter;
    queryManager.queryIdCounter = apolloQM.queryIdCounter;
    queryManager.mutationIdCounter = apolloQM.mutationIdCounter;

    // v2 counter
    queryManager.idCounter = apolloQM.idCounter;
  }

  if (link && link.options && link.options.uri) {
    apolloURI = link.options.uri;
  }

  const type = initial ? 'URI_CACHE' : 'APOLLO_CLIENT';

  const eventId = initial ? '0' : new Date().getTime().toString();
  const apolloClient = {
    type,
    text: 'Apollo Client',
    action,
    queries,
    mutations,
    inspector,
    cache,
    apolloCache: cache,
    queryManager,
    eventId,
    apolloURI,
    requestIdCounter: queryManager.requestIdCounter,
    queryIdCounter: queryManager.queryIdCounter,
    mutationIdCounter: queryManager.mutationIdCounter,
  };

  // console.log(
  //   'apollo11Callback sending apolloClient to contentScript :>> ',
  //   apolloClient,
  // );
  win.postMessage(apolloClient);
  return undefined;
}

const reInjectApollo11Callback = (win: any) => {
  if (win.__APOLLO_CLIENT__) {
    win.__APOLLO_CLIENT__.__actionHookForDevTools(
      ({
        action,
        state: {queries, mutations},
        dataWithOptimisticResults: inspector,
      }) => {
        // console.log(
        //   'INJECTED HOOK @ MODULE window.__APOLLO_CLIENT__ :>> ',
        //   win.__APOLLO_CLIENT__,
        // );
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

const heartbeatListener = () => {
  const win: any = window;
  const options = {
    action: 'HEARTBEAT',
    state: {queries: {}, mutations: {}},
    dataWithOptimisticResults: {},
  };
  const heartbeat = win.__APOLLO_CLIENT__.devToolsHookCb(options);
  // console.log('heartbeat :>> ', heartbeat);
  if (heartbeat !== 'APOLLO11_CALLBACK_HEARTBEAT') {
    console.log('HEARTBEAT not found, re-injecting');
    reInjectApollo11Callback(win);
  }
};

(function hooked(win: any) {
  // eslint-disable-next-line no-undef
  let detectionInterval: NodeJS.Timeout;

  const findApolloClient = () => {
    if (
      win.__APOLLO_CLIENT__ &&
      win.__APOLLO_CLIENT__.cache &&
      win.__APOLLO_CLIENT__.cache.data &&
      win.__APOLLO_CLIENT__.cache.data.data &&
      Object.entries(win.__APOLLO_CLIENT__.cache.data.data).length > 0
    ) {
      clearInterval(detectionInterval);

      // console.log(
      //   'contentScript injected hook found client',
      //   win.__APOLLO_CLIENT__,
      // );

      apollo11Callback(win, null, null, null, null, true);

      win.__APOLLO_CLIENT__.__actionHookForDevTools(
        ({
          action,
          state: {queries, mutations},
          dataWithOptimisticResults: inspector,
        }) => {
          // console.log(
          //   'INJECTED HOOK @ MODULE window.__APOLLO_CLIENT__ :>> ',
          //   win.__APOLLO_CLIENT__,
          // );
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

      console.log('Setting up HEARTBEAT listener');
      setInterval(heartbeatListener, 1000);
    }
  };
  detectionInterval = global.setInterval(findApolloClient, 1000);
})(window);
