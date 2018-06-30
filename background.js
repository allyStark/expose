chrome.runtime.onMessage.addListener(
  function(arg, sender, sendResponse) {
    if (arg === "getToken") {
        chrome.identity.getAuthToken({interactive: true}, function(token) {
            alert(token);
          });
    } else {
        chrome.downloads.download({
        url: arg,
        filename: "test.zip",
       saveAs: false
       });
    }
});

  function sendResponse(){
  }
