const DEFAULT_SETTINGS = {
  enableTabRename: true,
  enableMiddleClick: true,
  enableAutoAllTab: false,
};

const checkboxes = {
  enableTabRename: document.getElementById("enableTabRename"),
  enableMiddleClick: document.getElementById("enableMiddleClick"),
  enableAutoAllTab: document.getElementById("enableAutoAllTab"),
};

const statusEl = document.getElementById("status");
let statusTimeout = null;

function showSaved() {
  statusEl.textContent = "Saved";
  clearTimeout(statusTimeout);
  statusTimeout = setTimeout(() => {
    statusEl.textContent = "";
  }, 1200);
}

// Load current settings into the checkboxes
chrome.storage.sync.get(DEFAULT_SETTINGS, (items) => {
  for (const key in checkboxes) {
    checkboxes[key].checked = !!items[key];
  }
});

// Persist changes as soon as a checkbox is toggled
for (const key in checkboxes) {
  checkboxes[key].addEventListener("change", () => {
    chrome.storage.sync.set({ [key]: checkboxes[key].checked }, showSaved);
  });
}
