let previousTabId = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received:", message); // Debugging log

  if (message.action === "saveCurrentTab") {
    // Save the current active tab ID
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      previousTabId = tabs[0].id;
      console.log("Saved current tab ID:", previousTabId); // Debugging log
    });
  } else if (message.action === "openTicket") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      previousTabId = tabs[0].id; // Save the current tab ID
      console.log("Previous tab ID:", previousTabId); // Debugging log
      chrome.tabs.create({ url: message.url }, (newTab) => {
        console.log("New tab created:", newTab); // Debugging log
        chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
          if (tabId === newTab.id && info.status === "complete") {
            chrome.tabs.onUpdated.removeListener(listener);
            console.log("New tab loaded, switching back to previous tab"); // Debugging log
          }
        });
      });
    });
  } else if (message.action === "focusOriginalTab" && previousTabId !== null) {
    // Switch back to the original tab
    chrome.tabs.update(previousTabId, { active: true }, () => {
      console.log("Switched back to the original tab:", previousTabId); // Debugging log
    });
  }
});
