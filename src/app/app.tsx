import React, {useState, useEffect} from 'react';

import MainDrawer from './MainDrawer';
import createURICacheEventListener, {getApolloClient} from './utils/messaging';
import createNetworkEventListener from './utils/networking';

const App = () => {
  const [apolloURI, setApolloURI] = useState('');
  const [networkURI, setNetworkURI] = useState('');
  const [events, setEvents] = useState({});
  const [stores, setStores] = useState({});
  const [networkEvents, setNetworkEvents] = useState({});

  // Only create the listener when the App is initially mounted
  useEffect(() => {
    // Event listener to obtain the GraphQL server endpoint (URI)
    // and the cache from the Apollo Client
    createURICacheEventListener(setApolloURI, setStores);

    // Initial load of the App, so send a message to the contentScript to get the cache
    getApolloClient();

    // Listen for network events
    createNetworkEventListener(setNetworkURI, setNetworkEvents);
  }, []);

  useEffect(() => {
    console.log('Current stores :>> ', stores);
    // do something with the stores
    // ie update the actual Event Log
  }, [stores]);

  useEffect(() => {
    console.log('Current Event Log :>>', events);
    // dump in hook
  }, [events]);

  useEffect(() => {
    console.log('Current Network Log :>>', networkEvents);
    // dump in hook
  }, [networkEvents]);

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
