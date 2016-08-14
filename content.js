chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    console.log(tabs[0].url);
});

/* This functions converts the given 
 * currency to required currency. 
 */
function getRate() {
    return 80.5;
}
$(document).ready(function() {
    $(".a-color-price").each(function() {
        $(this).html($(this).html().replace(/&nbsp;/gi,'')); // Replacing the current trailing spaces.
        var current =  $(this).html(); // Saving the current text
        var currency = current;
        var convertedRate = Number(currency.replace(/[^0-9\.]+/g,"")).toFixed(1) * getRate();// Calculating the coversion.
        $(this).text(current + "(TK. " + convertedRate + ")");
    });
});


