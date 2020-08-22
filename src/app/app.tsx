import React, {useState, useEffect} from 'react';

import MainDrawer from './MainDrawer';
import createURICacheEventListener, {getApolloClient} from './utils/messaging';
import createNetworkListener from './utils/networking';

const App = () => {
  const [apolloURI, setApolloURI] = useState('');
  const [events, setEvents] = useState({});

  // Only create the listener when the App is initially mounted
  useEffect(() => {
    // Event listener to obtain the GraphQL server endpoint (URI)
    // and the cache from the Apollo Client
    createURICacheEventListener(setApolloURI, setEvents);

    // Initial load of the App, so send a message to the contentScript to get the cache
    getApolloClient();

    // Listen for network events only when we have a valid Apollo Client URI
    createNetworkListener(setApolloURI);
  }, []);

  useEffect(() => {
    console.log('Current Event Log :>>', events);
    // dump in hook
  }, [events]);

  return (
    <div>
      <MainDrawer endpointURI={apolloURI} events={events} />
    </div>
  );
};
export default App;
