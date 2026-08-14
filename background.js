let previousTabId = null;

function isAllowedConnectWiseUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname === "na.myconnectwise.net";
  } catch {
    return false;
  }
}

function isTrustedSender(sender) {
  return sender.id === chrome.runtime.id
    && sender.tab?.id !== undefined
    && isAllowedConnectWiseUrl(sender.tab.url);
}

chrome.runtime.onMessage.addListener((message, sender) => {
  if (!message || typeof message !== "object" || !isTrustedSender(sender)) {
    return;
  }

  if (message.action === "saveCurrentTab") {
    previousTabId = sender.tab.id;
    return;
  }

  if (message.action === "focusOriginalTab" && previousTabId !== null) {
    chrome.tabs.update(previousTabId, { active: true }, () => {
      if (chrome.runtime.lastError) {
        previousTabId = null;
      }
    });
  }
});
