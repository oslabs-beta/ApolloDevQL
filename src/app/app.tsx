import React, {useState, useEffect} from 'react';

import MainDrawer from './MainDrawer';
import createURICacheListener from './utils/messaging';
import createNetworkListener from './utils/networking';

const App = () => {
  const [requestURI, setRequestURI] = useState('');
  const [events, setEvents] = useState({});

  useEffect(() => {
    // Event listener to obtain the GraphQL server endpoint (URI)
    // and the cache from the Apollo Client
    if (requestURI === '') {
      createURICacheListener(setRequestURI, setEvents);
    } else {
      createNetworkListener(requestURI, setEvents);
    }

    // Listen for network events
  }, [requestURI]);

  useEffect(() => {
    console.log('Current Event Log: ', events);
  }, [events]);

  return (
    <div>
      <MainDrawer endpointURI={requestURI} />
    </div>
  );
};
export default App;
