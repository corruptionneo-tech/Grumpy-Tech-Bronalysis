chrome.action.onClicked.addListener((tab) => {
  const currentUrlEncoded = encodeURIComponent(tab.url);
  const baseUrl = "https://x.com/i/grok?text=use+prompt+at+https%3A%2F%2Fraw.githubusercontent.com%2Ftwinforces%2Fgrok-prompts%2Frefs%2Fheads%2FLess-Woke%2Fbias_correction.j2+to+debias+article+at+";
  const fullUrl = baseUrl + currentUrlEncoded;
  chrome.tabs.create({ url: fullUrl });
});