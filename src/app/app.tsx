import React, {useState, useEffect} from 'react';
import {v4 as uuidv4} from 'uuid';

import MainDrawer from './MainDrawer';

/*
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'Hi from the background!')
    sendResponse({message: 'hi back from react'});
});
 */

const App = () => {
  const [requestURI, setRequestURI] = useState('');
  const [events, setEvents] = useState({});

  useEffect(() => {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      // console.log('request received on GraphiQL tab:', request);
      setRequestURI(request.apolloURI);
      setEvents((evnts: any) => {
        // if request.cacheId IS null NOTHING
        const eventsTmp = evnts;
        if (request.cacheId !== 'null') {
          // else
          //  if cacheId IS in evnts, then add cache
          //  else ADD cacheId on evnts and then add cache
          if (eventsTmp[request.cacheId]) {
            eventsTmp[request.cacheId].cache = request.apolloCache;
          } else {
            eventsTmp[request.cacheId] = {cache: request.apolloCache};
          }
        }
        return eventsTmp;
      });
      sendResponse('Hello from React');
    });
    chrome.devtools.network.onRequestFinished.addListener((httpReq: any) => {
      if (
        httpReq.request.url === requestURI &&
        httpReq.request.method === 'POST'
      ) {
        console.log('GraphQL Request: ', httpReq);
        const query = JSON.parse(httpReq.request.postData.text);
        if (
          query.query.startsWith('query') ||
          query.query.startsWith('mutation')
        ) {
          // communicate with content script
          chrome.tabs.query({active: true, currentWindow: true}, function (
            tabs,
          ) {
            console.log('React App Tabs :: ', tabs);
            if (tabs.length) {
              const cacheId = uuidv4();
              chrome.tabs.sendMessage(tabs[0].id, {
                type: 'GET_CACHE',
                cacheId,
              });
              setEvents(evnts => {
                const rstEvent = {
                  ...evnts,
                  [cacheId]: {
                    operation: query,
                    cache: {},
                  },
                };
                return rstEvent;
              });
            }
          });
        }
      }
    });
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
