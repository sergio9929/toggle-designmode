document.addEventListener('click', preventDefault, true)

detectColorScheme()

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.click) {
        toggleDesignMode()
    }
});

function toggleDesignMode() {
    if (document.designMode == 'off') {
        document.designMode = 'on'
        chrome.runtime.sendMessage({ designMode: 'on' });
    } else {
        document.designMode = 'off'
        chrome.runtime.sendMessage({ designMode: 'off' });
    }
}

function preventDefault(event) {
    if (document.designMode == 'on') {
        event.preventDefault()
        event.stopPropagation()
    }
}

function detectColorScheme() {
    const isDark = matchMedia('(prefers-color-scheme: dark)').matches
    chrome.runtime.sendMessage({ scheme: isDark ? 'dark' : 'light' })

    matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({ matches }) => {
        chrome.runtime.sendMessage({ scheme: matches ? 'dark' : 'light' })
    })
}