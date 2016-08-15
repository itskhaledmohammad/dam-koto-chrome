// Global Variable.
var currUrl = "about_blank";
var numberPattern = /[+-]?\d+(\.\d+)?/g;

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
    else if(currUrl.includes(".ca")){
        return 60.50;
    }

}

// Checks if the document is ready.
$(document).ready(function() {
    
    // Gets the current url.
    currUrl = window.location.href;
    
    // Goes through every element with the matching name.
    $(".a-color-price").each(function() {
        
        // Initialization.
        var convertedRate = 0.00;
        
        // Replacing the current trailing spaces.
        $(this).html($(this).html().replace(/&nbsp;/gi,'')); 
        
        // Saving the current text
        var current =  $(this).html(); 
        
        // Looking for floating numbers.
        var numbers = current.match(numberPattern);
        
        // If matches were found.
        if(numbers != null){
            
            // Going through each matches.
            for(i = 0; i < numbers.length - 1; i++){
                
                // Converting the currency.
                var currency = current;
                convertedRate = (parseFloat(numbers[i]).toFixed(1) * getRate()).toFixed(1); 
                
                // Updating the price tag with added converted currency.
                $(this).html(current + "(TK. " + convertedRate + " - "); 
                
                // Saving the current text.
                var current =  $(this).html(); 
            }
            
            // If the price tag is range. ie. $X - $Z
            if(numbers.length > 1){
                
                // Converting the currency and updating the pricetag.
                convertedRate = (parseFloat(numbers[numbers.length - 1]) * getRate()).toFixed(1);
                $(this).html(current + "TK. " + convertedRate + ")");
            }
            // If the price tag is not a range. ie. $X
            else{
                
                // Converting the currency and updating the pricetag.
                convertedRate = (parseFloat(numbers[0]).toFixed(1) * getRate()).toFixed(1);
                $(this).html(current + "(TK. " + convertedRate + ")");
            }
        }
    });
});


