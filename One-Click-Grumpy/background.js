chrome.action.onClicked.addListener((tab) => {
  const currentUrlEncoded = encodeURIComponent(tab.url);
  const baseUrl = "https://grok.com/?q=use+x+thread+fetch+on+%40twinforces+%28Post%20ID%3A1976324406357184544%29+and+apply+to+content+from+browse_page+tool+on+URL+";
  const fullUrl = baseUrl + currentUrlEncoded;
  chrome.tabs.create({ url: fullUrl });
});