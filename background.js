

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
    // normalizedNumber = '+' + normalizedNumber;
    console.log("normalized",normalizedNumber)
    console.log("message",prefs.Message)
    openTabGroup(prefs.FullName, normalizedNumber)
   // win.focus();
}
function openTabGroup(fullname, normalizedNumber, prefs) {
    const urls = [
        `https://www.facebook.com/search/top?q=${fullname}`,
        `https://www.instagram.com/${fullname}/`,
        `https://www.tiktok.com/search?q=${fullname}`,
        `https://twitter.com/search?q=${fullname}&src=typed_query&f=top`,
        `https://wa.me/${normalizedNumber}`
    ];
    

    for (const url of urls) {
        chrome.tabs.create({ url: url});
    }
}
