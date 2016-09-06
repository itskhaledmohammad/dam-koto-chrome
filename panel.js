// Initialization
var currUrl, selCur;

// Waiting for the DOM to be loaded.
document.addEventListener('DOMContentLoaded', function () {

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

      // Changing the flag to the country's flag that is selected.
      imgel = document.getElementById('flagsel');
      imgel.src = "flags/" + this.value + ".png";
    }

    // When the Save button is clicked.
    document.getElementById('save').onclick = function(){

            // Getting the value of the selected item.
            selCur = document.getElementById('selection').value;

            // Saving the value.
            chrome.storage.sync.clear(function(){});
            chrome.storage.sync.set({ "selectedCurr" : selCur }, function() {
                if (chrome.runtime.error) {
                    alert("There was an error.");
                }
                else{
                    alert("Setting are saved.");
                }
            });
        }
});
