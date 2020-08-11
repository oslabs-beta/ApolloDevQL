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
  useEffect(() => {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      console.log('request received on GraphiQL tab:', request);
      setRequestURI(request.apolloURI);
      sendResponse('Hello from React');
    });
  }, []);

  return (
    <div>
      <MainDrawer endpointURI={requestURI} />
    </div>
  );
};
export default App;
