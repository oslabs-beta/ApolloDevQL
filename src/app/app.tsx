import React, {useState, useEffect} from 'react';
import MainDrawer from './MainDrawer';

/*
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'Hi from the background!')
    sendResponse({message: 'hi back from react'});
});
 */

const App = () => {
  const [requestURI, setRequestURI] = useState('');
  const [queries, setQueries] = useState([]);
  const [mutations, setMutations] = useState([]);

  useEffect(() => {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      console.log('request received on GraphiQL tab:', request);
      setRequestURI(request.apolloURI);
      sendResponse('Hello from React');
    });
    chrome.devtools.network.onRequestFinished.addListener((httpReq: any) => {
      if (
        httpReq.request.url === requestURI &&
        httpReq.request.method === 'POST'
      ) {
        console.log('GraphQL Request: ', httpReq);
        const query = JSON.parse(httpReq.request.postData.text);
        if (query.query.startsWith('query')) {
          setQueries(prevQueries => [...prevQueries, query]);
        } else if (query.query.startsWith('mutation')) {
          setMutations(prevMutations => [...prevMutations, query]);
        }
      }
    });
  }, [requestURI]);

  useEffect(() => {
    console.log('Current Queries', queries);
    console.log('Current Mutations: ', mutations);
  }, [queries, mutations]);

  return (
    <div>
      <MainDrawer endpointURI={requestURI} />
    </div>
  );
};
export default App;
