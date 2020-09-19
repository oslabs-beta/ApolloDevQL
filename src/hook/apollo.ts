// import onChange from '../watch';

function apollo11Callback(
  win: any,
  action: any,
  queries: any,
  mutations: any,
  inspector: any,
  initial: boolean = false,
) {
  console.log(
    'apollo11Callback win.__APOLLO_CLIENT__ :>> ',
    win.__APOLLO_CLIENT__,
  );
  console.log(
    'win.__APOLLO_CLIENT__.cache.data.data :>> ',
    win.__APOLLO_CLIENT__.cache.data.data,
  );
  const extract1 = win.__APOLLO_CLIENT__.cache.extract(true);
  console.log('extract1 :>> ', extract1);
  const extract2 = win.__APOLLO_CLIENT__.cache.extract(false);
  console.log('extract2 :>> ', extract2);
  const tempCache = win.__APOLLO_CLIENT__.cache.data.data;
  console.log('tempCache :>> ', tempCache);
  const strCache = JSON.stringify(tempCache);
  console.log('c.d.d', JSON.stringify(win.__APOLLO_CLIENT__.cache.data.data));
  console.log('strCache :>> ', strCache);

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
    queryManager.mutationStore = apolloQM.mutationStore;

    // v3 counters
    queryManager.requestIdCounter = apolloQM.requestIdCounter;
    queryManager.queryIdCounter = apolloQM.queryIdCounter;
    queryManager.mutationIdCounter = apolloQM.mutationIdCounter;

    // v2 counter
    queryManager.idCounter = apolloQM.idCounter;
  }

  if (link && link.options && link.options.uri) {
    apolloURI = link.options.uri;
    // console.log('contentScript findClient - URI exists :>>', apolloURI);
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
    cache: JSON.stringify(cache),
    apolloCache: JSON.stringify(cache),
    queryManager,
    eventId,
    apolloURI,
    requestIdCounter: queryManager.requestIdCounter,
    queryIdCounter: queryManager.queryIdCounter,
    mutationIdCounter: queryManager.mutationIdCounter,
  };

  console.log(
    'apollo11Callback sending apolloClient to contentScript :>> ',
    apolloClient,
  );
  win.postMessage(apolloClient);
}

(function hooked(win: any) {
  // function updateMutationStore() {
  //   console.log('there will be need to catalogue ');
  // }
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

      console.log(
        'contentScript injected hook found client',
        win.__APOLLO_CLIENT__,
      );

      apollo11Callback(win, null, null, null, null, true);

      // send the first message manually
      // grab all the client data
      // send first postMessage
      // --> manually invoked our callback
      win.__APOLLO_CLIENT__.__actionHookForDevTools(
        ({
          action,
          state: {queries, mutations},
          dataWithOptimisticResults: inspector,
        }) => {
          console.log(
            'INJECTED HOOK @ MODULE window.__APOLLO_CLIENT__ :>> ',
            win.__APOLLO_CLIENT__,
          );
          apollo11Callback(win, action, queries, mutations, inspector);
        },
      );

      // // eslint-disable-next-line no-param-reassign
      // win.__APOLLO_CLIENT__.queryManager.mutationStore.store = onChange(
      //   win.__APOLLO_CLIENT__.queryManager.mutationStore.store,
      //   () => updateMutationStore(),
      // );
    }
  };
  detectionInterval = setInterval(findApolloClient, 1000);
})(window);
