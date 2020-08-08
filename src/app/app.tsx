import React from 'react';
import MainDrawer from './MainDrawer';

/* 
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'Hi from the background!')
    sendResponse({message: 'hi back from react'});
});
 */

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('request recieved on react:', request);
  sendResponse('Hello from React');
});

class App extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      traffic: {},
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <MainDrawer />
      </div>
    );
  }
}
export default App;
