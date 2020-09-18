import onChange from '../watch';

(function hooked(win: any) {
  function updateMutationStore() {
    console.log('there will be need to catalogue ');
  }
  // eslint-disable-next-line no-undef
  let detectionInterval: NodeJS.Timeout;

  const findApolloClient = () => {
    if (win.__APOLLO_CLIENT__) {
      clearInterval(detectionInterval);

      console.log(
        'contentScript injected hook found client',
        win.__APOLLO_CLIENT__,
      );

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
              console.log(
                'apolloQM.queries is not a Map :>> ',
                apolloQM.queries,
              );
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

          win.postMessage(apolloClient);
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
