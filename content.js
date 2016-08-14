// Global Variable.
var currUrl = "about_blank";

/* This functions converts the given 
 * currency to required currency. 
 */
function getRate() {
    if(currUrl.includes(".com")){
        return 78.36;
    }
    else if(currUrl.includes(".co.uk")){
        return 101.23;
    }

}

// Checks if the document is ready.
$(document).ready(function() {
    
    // Gets the current url.
    currUrl = window.location.href;
    
    // Goes through every element with the matching name.
    $(".a-color-price").each(function() {
        $(this).html($(this).html().replace(/&nbsp;/gi,'')); // Replacing the current trailing spaces.
        var current =  $(this).html(); // Saving the current text
        var currency = current;
        var convertedRate = Number(currency.replace(/[^0-9\.]+/g,"")).toFixed(1) * getRate(); // Calculating the coversion.
        $(this).text(current + "(TK. " + convertedRate + ")");  // Adds coverted currency beside the current.
    });
});


