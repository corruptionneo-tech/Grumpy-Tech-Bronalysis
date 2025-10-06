chrome.action.onClicked.addListener((tab) => {
  const currentUrlEncoded = encodeURIComponent(tab.url);
  const baseUrl = "https://grok.com/?q=use+browse_page+on+URL+https%3A%2F%2Fx.com%2Ftwinforces%2Fstatus%2F1974839758271783080+apply+to+content+from+browse_page+tool+on+URL+";
  const fullUrl = baseUrl + currentUrlEncoded;
  chrome.tabs.create({ url: fullUrl });
});