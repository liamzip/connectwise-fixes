try {
  // Function to rename the tab based on the specified element
  function renameTabIfElementExists() {
    const element = document.querySelector(".gwt-Label.mm_label.GMDB3DUBDDL.detailLabel.cw_CwLabel"); // Adjust selector as needed
    if (element && element.textContent) {
      let title = element.textContent.trim();
      title = title.replace(/^Service Ticket\s*/, ""); // Remove "Service Ticket" prefix
      console.log("Element found for renaming tab:", title); // Debugging log
      document.title = title; // Update the <title> tag
    } else {
      console.log("No element found for renaming tab"); // Debugging log
    }
  }

  // Run the renameTabIfElementExists function when the page loads
  document.addEventListener("DOMContentLoaded", renameTabIfElementExists);
  renameTabIfElementExists(); // Run immediately in case the DOM is already loaded

  // Observe DOM changes to handle dynamic content loading or navigation
  const observer = new MutationObserver(() => {
    renameTabIfElementExists();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // Middle-click functionality
  document.addEventListener("mousedown", (event) => {
    if (event.button === 1) { // Middle mouse button
      console.log("Middle click detected"); // Debugging log
      const targetElement = event.target;
      if (targetElement) {
        console.log("Target element found:", targetElement); // Debugging log
        event.preventDefault();

        // Check if chrome.runtime is available
        if (chrome.runtime && chrome.runtime.sendMessage) {
          // Notify background script to save the current tab ID
          chrome.runtime.sendMessage({ action: "saveCurrentTab" });

          // Simulate a right-click
          const rightClickEvent = new MouseEvent("contextmenu", {
            bubbles: true,
            cancelable: true,
            view: window,
            clientX: event.clientX,
            clientY: event.clientY,
          });
          targetElement.dispatchEvent(rightClickEvent);

          // Simulate moving down and to the right
          setTimeout(() => {
            const leftClickEvent = new MouseEvent("click", {
              bubbles: true,
              cancelable: true,
              view: window,
              clientX: event.clientX + 50, // Adjust offset as needed
              clientY: event.clientY + 20, // Adjust offset as needed
            });
            document.elementFromPoint(event.clientX + 50, event.clientY + 20)?.dispatchEvent(leftClickEvent);
            console.log("Left click simulated at offset position"); // Debugging log

            // Notify background script to switch back to the original tab
            chrome.runtime.sendMessage({ action: "focusOriginalTab" });
          }, 100); // Delay to simulate movement
        } else {
          console.error("chrome.runtime.sendMessage is not available in this context.");
        }
      } else {
        console.log("No target element found for middle click"); // Debugging log
      }
    }
  });
} catch (error) {
  console.error("Error in content script:", error);
}
