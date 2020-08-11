console.log('this is background.ts');

/* //Listen for message from content script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('request', request);
  console.log(
    sender.tab
      ? 'from a content script:' + sender.tab.url
      : 'from the extension',
  );
  if (request.greeting == 'hello') sendResponse({farewell: 'goodbye'});
});

//Send a message to the react app
chrome.runtime.sendMessage({message: 'Hi from the background!'}, res => {
  console.log('response from react:', (res as any).message);
}); */
