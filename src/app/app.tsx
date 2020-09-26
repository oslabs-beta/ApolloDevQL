import React, {useState, useEffect} from 'react';

import createNetworkEventListener from './utils/networking';
import createURICacheEventListener, {getApolloClient} from './utils/messaging';
import EventLogDataObject from './utils/managedlog/lib/eventLogData';
import EventLogContainer from './utils/managedlog/eventObject';
import {EventStore} from './utils/managedlog/lib/apollo11types';
import MainDrawer from './MainDrawer';

const App = () => {
  // const eventLogList = new EventLogDataObject();
  // const EventList = EventLogContainer(eventLogList);
  const EventList = EventLogContainer(new EventLogDataObject());
  const [apolloURI, setApolloURI] = useState('');
  const [networkURI, setNetworkURI] = useState('');
  const [events, setEvents] = useState<EventLogDataObject>(() =>
    EventList.getDataStore(),
  );
  const [stores, setStores] = useState<EventStore>({});
  const [networkEvents, setNetworkEvents] = useState({});

  // Only create the listener when the App is initially mounted
  useEffect(() => {
    // Event listener to obtain the GraphQL server endpoint (URI)
    // and the cache from the Apollo Client
    createURICacheEventListener(setApolloURI, setStores, EventList, setEvents);

    // Initial load of the App, so send a message to the contentScript to get the cache
    getApolloClient();

    // Listen for network events
    createNetworkEventListener(setNetworkURI, setNetworkEvents);
  }, []);

  useEffect(() => {
    console.log('Current stores :>> ', stores);
    // if (stores && stores.lastEventId) {
    //   console.log('Curretn lastest Stores Id :: ', stores.lastEventId);
    //   const storeIdx = stores.lastEventId;
    //   EventList.sequenceApolloLog(
    //     {
    //       queryManager: (stores[storeIdx] as any).queryManager,
    //       eventId: stores.lastEventId,
    //       cache: (stores[storeIdx] as any).cache,
    //     },
    //     setEvents,
    //   );
    // }
    // do something with the stores
    // ie update the actual Event Log
  }, [stores]); // EventList

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
