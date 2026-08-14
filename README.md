# ConnectWise Fixes

A Chrome extension that enhances the ConnectWise service ticket interface with quality-of-life improvements.

## Features

- **Middle-Click Ticket Opener**: Middle-click on tickets to open them in a new tab while automatically returning focus to your current tab
- **Smart Tab Naming**: Automatically renames browser tabs with the ticket number for easier tracking across multiple open tickets
- **Seamless Integration**: Works transparently with the ConnectWise web interface at `na.myconnectwise.net`

## Installation

### Prerequisites
- Google Chrome browser (version with Manifest V3 support)
- Access to a ConnectWise service portal

### Setup Instructions

1. **Download the Extension**
   - Clone or download this repository to your computer
   - Extract the ZIP file if downloaded as an archive

2. **Enable Developer Mode in Chrome**
   - Open Chrome and navigate to `chrome://extensions`
   - Toggle **Developer mode** in the top-right corner

3. **Load the Extension**
   - Click the **Load unpacked** button
   - Navigate to and select the `connectwise-fixes` folder
   - The extension should now appear in your extensions list

4. **Verify Installation**
   - Confirm the extension shows as **Enabled** in the Chrome Extensions page
   - You should see the extension icon in your Chrome toolbar

## Usage

### Middle-Click Ticket Opener
1. Navigate to any ConnectWise ticket
2. **Middle-click** (scroll wheel click) on any clickable element
3. The ticket will open in a new tab and your original tab will regain focus automatically

### Tab Naming
- When viewing a service ticket, the browser tab title automatically updates to display the ticket number
- This makes it easier to identify tickets when you have multiple ConnectWise tabs open

## Project Structure

```
connectwise-fixes/
├── manifest.json      # Chrome extension configuration
├── background.js      # Background service worker
├── content.js         # Page content script for ticket functionality
├── popup.html         # Extension popup UI
└── README.md          # This file
```

## Technical Details

- **Manifest Version**: 3 (current Chrome extension standard)
- **Permissions**: 
  - `tabs` - Restores focus to the original ticket tab after a user middle-click action
- **Host Permissions**: Limited to `*://na.myconnectwise.net/*`

## Security Notes

- The extension does not bundle third-party packages or remote scripts.
- Runtime messages are accepted only from this extension's own ConnectWise content script context.
- Content-script automation reacts only to trusted user middle-clicks, which helps prevent page scripts from triggering extension behavior synthetically.
- The extension's permissions are intentionally limited to the ConnectWise host and the `tabs` permission required for tab-focus restoration.

## How It Works

1. **Content Script** (`content.js`):
   - Monitors middle-click events on the page
   - Intercepts middle-clicks and simulates context menu behavior
   - Extracts ticket information and updates the page title
   - Communicates with the background service worker

2. **Background Service Worker** (`background.js`):
   - Manages tab operations (opening new tabs, switching focus)
   - Handles messages from the content script
   - Maintains state about the original tab for focus restoration

## Troubleshooting

### Extension Not Working
- Ensure you've enabled Developer mode in Chrome
- Check that the extension is enabled on the Extensions page
- Verify you're on the correct ConnectWise portal (`na.myconnectwise.net`)
- Check the browser console (F12) for any error messages

### Middle-Click Not Working
- Ensure middle-click functionality is enabled in your Chrome settings
- Try a full page refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Check that your mouse supports middle-click

### Tab Title Not Updating
- Refresh the page where you're viewing the ticket
- Ensure the page has fully loaded before performing actions

## Development

This extension is built with vanilla JavaScript and uses Chrome's native Extension APIs (Manifest V3).

### File Descriptions

- **manifest.json** - Defines extension metadata, permissions, and entry points
- **background.js** - Service worker for managing browser tab interactions
- **content.js** - Runs on ConnectWise pages to handle middle-click events and tab renaming
- **popup.html** - UI shown when clicking the extension icon

## Contributing

Feel free to fork this repository and submit pull requests for improvements or bug fixes.

## License

This project is provided as-is for use with ConnectWise service portals.

## Support

If you encounter issues or have suggestions for improvements, please open an issue in this repository.

---

**Note**: This extension is an unofficial tool and is not affiliated with ConnectWise. Use at your own discretion in accordance with your organization's policies.
