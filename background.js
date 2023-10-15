

function callSendHandle(data) {
  port.postMessage({ action: "call_send_handle", data: data });
}

chrome.runtime.onInstalled.addListener(
    details =>{
        console.log("onInstall reason: ", details.reason)
    }
)

chrome.runtime.onMessage.addListener(data => {
    const {event, prefs} = data
    switch(event){
        case 'onStart':
            handleOnStart(prefs);
            
        break;
 
        default:
            break;
    }

})

const handleOnStart = (prefs) => {
    
    console.log("on start bg")
    console.log("data sent", prefs)
    send_handle(prefs);
    chrome.storage.local.set(prefs)
}

function send_handle(prefs){
    var normalizedNumber = prefs.phoneNumber.replace(/\D/g, '');
    if (normalizedNumber.charAt(0) === '0') {
        // If it is, remove the first character
        normalizedNumber = normalizedNumber.slice(1);
    }
    // normalizedNumber = '+' + normalizedNumber;
    console.log("normalized",normalizedNumber)
    console.log("message",prefs.Message)
    openTabGroup(prefs.FullName, normalizedNumber,prefs)
   // win.focus();
}
function openTabGroup(fullname, normalizedNumber, prefs) {
    const urls = [
        [`https://www.facebook.com/search/top?q=${fullname}`,prefs.FaceCB],
        [`https://imgsed.com/search/?q=${fullname}`, prefs.InsCB],
        [`https://www.tiktok.com/search?q=${fullname}`, prefs.TikCB],
        [`https://twitter.com/search?q=${fullname}&src=typed_query&f=top`, prefs.TwittCB],
        [`https://www.google.com/search?q=${fullname}`, prefs.GooCB],
        [`https://wa.me/${normalizedNumber}`, prefs.WhatsCB]
    ];
    

    const urlsToOpen = urls
        .filter(([url, isChecked]) => isChecked)
        .map(([url]) => url);

    if (urlsToOpen.length > 0) {
        const windowOptions = {
            url: urlsToOpen,
            focused: true // Set to false if you don't want the window to be focused
        };

        chrome.windows.create(windowOptions, (window) => {
            console.log("Window created with tabs:", window.tabs);
        });
    }

}
