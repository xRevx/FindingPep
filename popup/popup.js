// ELEMENTS
const phoneNumberElement = document.getElementById("phoneID")
const FullNameElement = document.getElementById("Full name")

//Buttons elements
const startButton = document.getElementById("startButton")

//CheckBoxs element
const facebookCheckBox = document.getElementById("facebook")
const instagramCheckBox = document.getElementById("instagram")
const tiktokCheckBox = document.getElementById("tiktok")
const twitterCheckBox = document.getElementById("twitter")
const googleCheckBox = document.getElementById("google")
const whatsappCheckBox = document.getElementById("whatsapp")

startButton.onclick = () => {
    phoneval = phoneNumberElement.value;

        const prefs = {
            phoneNumber: phoneval,
            FullName: FullNameElement.value,
            FaceCB: facebookCheckBox.checked,
            InsCB: instagramCheckBox.checked,
            TikCB: tiktokCheckBox.checked,
            TwittCB: twitterCheckBox.checked,
            GooCB: googleCheckBox.checked,
            WhatsCB: whatsappCheckBox.checked,
        }
        chrome.runtime.sendMessage({event: 'onStart', prefs})
}

chrome.storage.local.get(["phoneNumber", "FullName", "FaceCB", "InsCB", "TikCB", "TwittCB", "GooCB", "WhatsCB"], (result) =>{
    const { phoneNumber, FullName, FaceCB, InsCB, TikCB, TwittCB, GooCB, WhatsCB} = result; 
    if(phoneNumber){
        phoneNumberElement.value = phoneNumber
    }

    FullNameElement.value = FullName
    facebookCheckBox.checked = FaceCB
    instagramCheckBox.checked = InsCB
    tiktokCheckBox.checked = TikCB
    twitterCheckBox.checked = TwittCB
    googleCheckBox.checked = GooCB
    whatsappCheckBox.checked = WhatsCB
})





function validatePhoneNumber(input_str) {
    const numericPhoneNumber = input_str.replace(/\D/g, '');

    // Define regular expression patterns for valid phone number formats
    const patterns = [
        /^\+972\d{9}$/,      // +972 52-205-8139
        /^[5-9]\d{8}$/,       // 522058139
        /^[5-9]\d{2}-\d{3}-\d{3}$/, // 52-205-8139
        /^0[5-9]\d{8}$/       // 0522058139 or 052-205-8139
    ];

    // Check if the numericPhoneNumber matches any of the patterns
    return patterns.some(pattern => pattern.test(numericPhoneNumber));
  } 