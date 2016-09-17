// Initialization
var currUrl, selCur, settingStatus;

// Waiting for the DOM to be loaded.
document.addEventListener('DOMContentLoaded', function () {

    // Setting the selected item from the list.
    chrome.storage.sync.get("selectedCurr", function(items) {
        document.getElementById('selection').value = items['selectedCurr'];

        // Changing the flag to the country's flag that is selected.
        document.getElementById('flagsel').src = "flags/" + document.getElementById('selection').value + ".png";
     });




    // Geting all the anchor tags of the page.
    var links = document.getElementsByTagName("a");

    // Going throug each anchor tags found.
    for (var i = 0; i < links.length; i++) {
        (function () {
            var ln = links[i];
            var location = ln.href;
            ln.onclick = function () {

                // Opening a new tab for the link clicked.
                chrome.tabs.create({active: true, url: location});
            };
        })();
    }

    // Waiting for the item selected in the country list to change.
    document.getElementById('selection').onchange = function(){
      settingStatus = document.getElementById('settings-saved');
      settingStatus.style.visibility = "hidden";

      // Changing the flag to the country's flag that is selected.
      var imgel = document.getElementById('flagsel');
      imgel.src = "flags/" + this.value + ".png";
    }

    // When the Save button is clicked.
    document.getElementById('save').onclick = function(){

            // Getting the value of the selected item.
            selCur = document.getElementById('selection').value;
            settingStatus = document.getElementById('settings-saved');
            settingStatus.style.visibility = "visible";

            document.getElementById('settings-saved')
            // Saving the value.
            chrome.storage.sync.clear(function(){});
            chrome.storage.sync.set({ "selectedCurr" : selCur }, function() {
                if (chrome.runtime.error) {
                    settingStatus.innerHTML = "There was an error.";
                }
                else{
                    settingStatus.innerHTML = "Settings Saved.";
                }
            });
        }
});
