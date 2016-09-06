
// Global Variable.
var currUrl = "about_blank";
var numberPattern = /[+-]?\d+(\.\d+)?/g;
var curr_from = "USD";
var curr_to = "BDT";
var rate = 0.0;

/*
 * This functions sends out
 * an GET request.
 */
function httpGet(theUrl)
{
    var xmlHttp = null;                     // Initialization.
    xmlHttp = new XMLHttpRequest();         // Creating the object.
    xmlHttp.open( "GET", theUrl, false );   // Opening the request.
    xmlHttp.send( null );                   // Sending the request.
    return xmlHttp.responseText;            // Returning the response of the request.
}

/*
 * This functions converts currency
 * using yahoo finance.
 */
function currencyConverter(curr_from,curr_to)
{
    // Initialization.
    var yql_base_url = "https://query.yahooapis.com/v1/public/yql";
    var yql_query = 'select%20*%20from%20yahoo.finance.xchange%20where%20pair%20in%20("'+ curr_from + curr_to +'")';
    var yql_query_url = yql_base_url + "?q=" + yql_query + "&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";

    // Sending the get request.
    var http_response = httpGet(yql_query_url);

    // Parsing the json to get the currency rate.
    var http_response_json = JSON.parse(http_response);
    return http_response_json.query.results.rate.Rate;
}



/*
 * This functions converts the given
 * currency to required currency.
 */
function getRate() {

    // Initialization.
    var conv_rate = 0.0;

    if(currUrl.includes(".com")){
        curr_from = "USD";                                // Setting the currency to be converted to American Dollar.
        conv_rate = currencyConverter(curr_from,curr_to); // Cov the currency rate.
        return conv_rate;                                 // Returning the rate.
    }
    else if(currUrl.includes(".co.uk")){
        curr_from = "GBP";                                // Setting the currency to be converted to British Pounds.
        conv_rate = currencyConverter(curr_from,curr_to); // Getting the currency rate.
        return conv_rate;                                 // Returning the rate.
    }
    else if(currUrl.includes(".ca")){
        curr_from = "CAD";                                // Setting the currency to be converted to Canadian Dollar.
        conv_rate = currencyConverter(curr_from,curr_to); // Getting the currency rate.
        return conv_rate;                                 // Returning the rate.
    }

}

// Gets the current url.
currUrl = window.location.href;

// Getting the converted currency rate.
rate = getRate();

// Checks if the document is ready.
$(document).ready(function() {

    // Goes through every element with the matching name.
    $(".a-color-price").each(function() {

        // Initialization.
        var convertedRate = 0.00;

        // Replacing the current trailing spaces.
        $(this).html($(this).html().replace(/&nbsp;/gi,''));

        // Saving the current text
        var current =  $(this).html();

        // Looking for floating numbers.
        var curr_text = $(this).text();
        var numbers = (curr_text).match(numberPattern);

        // If matches were found.
        if(numbers != null){

            /*
             * If the price tag is range. ie. $X - $Z
             * It checks if the tag contains %. If it contains
             * % then that means it is "You save" tag. So we only fetch
             * the total saved.
             */
            if(numbers.length > 1 && (!curr_text.includes("%")) ){

                // Going through each matches.
                for(i = 0; i < numbers.length - 1; i++){

                    // Converting the currency.
                    var currency = current;
                    convertedRate = (parseFloat(numbers[i]).toFixed(1) * rate).toFixed(1);

                    // Updating the price tag with added converted currency.
                    $(this).html(current + "(TK. " + convertedRate + " - ");

                    // Saving the current text.
                    var current =  $(this).html();
                }

                // Converting the currency and updating the pricetag.
                convertedRate = (parseFloat(numbers[numbers.length - 1]) * rate).toFixed(1);
                $(this).html(current + "TK. " + convertedRate + ")");
            }
            // If the price tag is not a range. ie. $X
            else{

                // Converting the currency and updating the pricetag.
                convertedRate = (parseFloat(numbers[0]).toFixed(1) * rate).toFixed(1);
                $(this).html(current + "(TK. " + convertedRate + ")");
            }
        }
    });
});
