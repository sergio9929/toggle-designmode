const icons = {
    dark: { on: 'icons/edit_dark.png', off: 'icons/edit_off_dark.png' },
    light: { on: 'icons/edit.png', off: 'icons/edit_off.png' },
};

let scheme = 'dark'

chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.sendMessage(tab.id, { click: true });
});

// icon and title logic
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const tabId = sender.tab.id

    console.log(message)
    if (message.scheme === 'dark') {
        scheme = message.scheme
        chrome.action.setIcon({ path: icons[scheme].off, tabId })
    }
    if (message.scheme === 'light') {
        scheme = message.scheme
        chrome.action.setIcon({ path: icons[scheme].off, tabId })
    }

    if (message.designMode != undefined) {
        if (message.designMode === 'on') {
            chrome.action.setIcon({ path: icons[scheme].on, tabId })
            chrome.action.setTitle({ title: 'Turn off design mode', tabId })
        } else {
            chrome.action.setIcon({ path: icons[scheme].off, tabId })
            chrome.action.setTitle({ title: 'Turn on design mode', tabId })
        }
    }
});