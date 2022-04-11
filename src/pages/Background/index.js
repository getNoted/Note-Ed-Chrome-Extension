chrome.runtime.onMessageExternal.addListener(
  (request, sender, sendResponse) => {
    console.log(request);
    if (request.authInfo) {
      let parsedAuthInfo = JSON.parse(request.authInfo);
      sendResponse({
        success: true,
        message: 'Auth Info has been received by background page',
      });

      if (parsedAuthInfo.loggedInStatus) {
        chrome.storage.sync.set({ loggedInStatus: true }, function () {
          console.log('loggedInStatus is true');
        });
      } else if (!parsedAuthInfo.loggedInStatus) {
        chrome.storage.sync.set({ loggedInStatus: false }, function () {
          console.log('loggedInStatus is false');
        });
      }
    } else {
      console.log('Auth info not received!');
      sendResponse({
        success: false,
        message: 'Auth info not received by background page!',
      });
    }
  }
);
