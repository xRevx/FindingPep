// ELEMENTS
const phoneNumberElement = document.getElementById("phoneID")
const TimeOfDayElement = document.getElementById("time of day")
const Messagelement = document.getElementById("Message")

//Buttons elements
const startButton = document.getElementById("startButton")
const stopButton = document.getElementById("stopButton")

//CheckBoxs element
const repeatCheckBox = document.getElementById("repeat")

startButton.onclick = () => {
    phoneval = phoneNumberElement.value;
    timeval = TimeOfDayElement.value;

    if(timeval){
        if(validatePhoneNumber(phoneval)){
            const prefs = {
                phoneNumber: phoneval,
                timeOfDay: timeval,
                Message: Messagelement.value,
                DoesRepeat: repeatCheckBox.checked
            }
            chrome.runtime.sendMessage({event: 'onStart', prefs})
        }
    }  
}
stopButton.onclick = () => {
    chrome.runtime.sendMessage({event: 'onStop'})

    console.log("you clicked stop")
}

chrome.storage.local.get(["phoneNumber","timeOfDay", "Message", "DoesRepeat"], (result) =>{
    const { phoneNumber, timeOfDay, Message , DoesRepeat} = result; 
    if(phoneNumber){
        phoneNumberElement.value = phoneNumber
    }

    if(timeOfDay){
        TimeOfDayElement.value = timeOfDay
    }
    if(Message){
        Messagelement.value = Message
    }

    repeatCheckBox.checked = DoesRepeat
})





function validatePhoneNumber(input_str) {
    var israeliPhoneNumberRegex = /^(\+972|0)[-\s]?[1-9]\d{1,2}[-\s]?\d{3}[-\s]?\d{4}$/;
  
    return israeliPhoneNumberRegex.test(input_str);
  } 