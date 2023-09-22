
var port = chrome.runtime.connectNative("native_message_host");

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
        case 'onStop':
            handleOnStop();
            break;

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

const handleOnStop = () => {
    console.log("on stop bg")
}

function send_handle(prefs){
    var normalizedNumber = prefs.phoneNumber.replace(/\D/g, '');
    // normalizedNumber = '+' + normalizedNumber;
    console.log("normalized",normalizedNumber)
    console.log("message",prefs.Message)

    var whatsappUrl = `https://wa.me/${normalizedNumber}?text=I'm%20interested%20in%20your%20car%20for%20sale`;
    chrome.tabs.create({url: whatsappUrl});
   // win.focus();
  }

