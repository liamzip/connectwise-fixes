# ConnectWise Fixes

A Chrome extension that adds quality-of-life fixes to the ConnectWise service ticket portal (`na.myconnectwise.net`).

## Features

- **Ticket number in tab title** – renames the browser tab to the ticket number.
- **Middle-click to open tickets** – middle-click opens a ticket in a new tab and returns focus to your current tab.
- **Auto-open "All" notes tab** – automatically selects the ticket's All notes tab when it loads.

Each feature can be toggled independently from the settings popup, which also links back to this repo.

## Installation

1. Download or clone this repository.
2. Open `chrome://extensions` and enable **Developer mode**.
3. Click **Load unpacked** and select the `connectwise-fixes` folder.
4. Confirm the extension shows as enabled.

## Usage

- Click the extension icon in the toolbar to turn each feature on or off.
- Open a ConnectWise ticket to see the tab title update and (if enabled) the All notes tab auto-select.
- Middle-click any ticket link to open it in a new tab without losing your place.

## Project Structure

```
connectwise-fixes/
├── manifest.json      # Extension configuration
├── background.js      # Background service worker
├── content.js         # Runs on ConnectWise ticket pages
├── popup.html/popup.js # Settings popup
├── icons/             # Toolbar icon
└── README.md
```

## Support

This is an unofficial tool, not affiliated with ConnectWise. Open an issue on [GitHub](https://github.com/liamzip/connectwise-fixes) for bugs or suggestions.

## Contributing

Feel free to fork this repository and submit pull requests for improvements or bug fixes.

## License

This project is provided as-is for use with ConnectWise service portals.

## Support

If you encounter issues or have suggestions for improvements, please open an issue in this repository.

---

**Note**: This extension is an unofficial tool and is not affiliated with ConnectWise. Use at your own discretion in accordance with your organization's policies.
