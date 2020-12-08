// Executed on first time run of the extension.
chrome.runtime.onInstalled.addListener(function(details){

    // Setting default value to Bangladeshi taka.
    if(details.reason == "install"){
        chrome.storage.sync.set({ "selectedCurr" : "BDT" });
    }
});
