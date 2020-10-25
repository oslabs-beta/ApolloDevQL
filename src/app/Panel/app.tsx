import React, {useState, useEffect} from 'react';

import createNetworkEventListener from '../utils/networking';
import createApolloClientListener, {getApolloClient} from '../utils/messaging';
import EventLogDataObject from '../utils/managedlog/lib/eventLogData';
import EventLogTreeContainer from '../utils/managedlog/eventObject';
import MainDrawer from './MainDrawer';

type UseEffectListener = {
  setupApolloClientListener(): void;
  setupApolloClient(): void;
  setupNetworkEventListener(): void;
};

const App = () => {
  const EventList = EventLogTreeContainer(new EventLogDataObject());
  const [apolloURI, setApolloURI] = useState('');
  const [networkURI, setNetworkURI] = useState('');
  const [events, setEvents] = useState<EventLogDataObject>(() =>
    EventList.getDataStore(),
  );
  const [networkEvents, setNetworkEvents] = useState({});

  // need to use a UseRef to resolve ths linting situation
  //    React Hook useEffect has a missing dependency: 'EventList'. Either include it or remove the dependency array
  const useEffectListeners = React.useRef<UseEffectListener>();

  useEffectListeners.current = {
    setupApolloClientListener() {
      // Event listener to obtain the GraphQL server endpoint (URI)
      // and the cache from the Apollo Client
      createApolloClientListener(setApolloURI, EventList, setEvents);
    },
    setupApolloClient() {
      // Initial load of the App, so send a message to the contentScript to get the cache
      getApolloClient();
    },
    setupNetworkEventListener() {
      // Listen for network events
      createNetworkEventListener(setNetworkURI, setNetworkEvents);
    },
  };

  // Only create the listener when the App is initially mounted
  useEffect(() => {
    useEffectListeners.current.setupApolloClientListener();
    useEffectListeners.current.setupApolloClient();
    useEffectListeners.current.setupNetworkEventListener();
  }, []);

  return (
    <div>
      <MainDrawer
        endpointURI={apolloURI}
        events={events}
        networkEvents={networkEvents}
        networkURI={networkURI}
      />
    </div>
  );
};

export default App;
