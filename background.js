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
    chrome.storage.local.set(prefs)
}

const handleOnStop = () => {
    console.log("on stop bg")
}

