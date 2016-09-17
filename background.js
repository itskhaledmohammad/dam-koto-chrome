chrome.runtime.onInstalled.addListener(function(details){
    // If it is first time install.
    if(details.reason == "install"){
        chrome.storage.sync.set({ "selectedCurr" : "BDT" });
    }
});
