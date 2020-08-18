import React, {useState, useEffect} from 'react';

import MainDrawer from './MainDrawer';
import createURICacheListener, {getApolloClient} from './utils/messaging';
import createNetworkListener from './utils/networking';

const App = () => {
  const [requestURI, setRequestURI] = useState('');
  const [events, setEvents] = useState({});

  useEffect(() => {
    // Only create the listener when the App is initially mounted
    // i.e., when the requestURI is empty
    // Otherwise we will be creating multiple listeners
    if (requestURI === '') {
      // Event listener to obtain the GraphQL server endpoint (URI)
      // and the cache from the Apollo Client
      createURICacheListener(setRequestURI, setEvents);

      // Initial load of the App, so send a message to the contentScript to get the cache
      getApolloClient();
    } else {
      // Listen for network events only when we have a valid Apollo Client URI
      createNetworkListener(requestURI, setEvents);
    }
  }, [requestURI]);

  useEffect(() => {
    console.log('Current Event Log: ', events);
  }, [events]);

  return (
    <div>
      <MainDrawer endpointURI={requestURI} eventLog={events} />
    </div>
  );
};
export default App;
