// setup variables
// ==================
var authKey = "JP6847d6Z8mIUs7HCE4VRfbeZxrgl9ouPvM59fpzsIbRyVYdfMNO0nk3ZVzyYAbg";

// spotify authorization key "client secret"
var authkey2 = "208e416b49e542b7aac6952632d085d9";

var searchTerm = "";
var numPlaylists = 0;
var startZipcode = 0;
var endZipcode = 0;

// url of api authorization
var queryURLBase = "https://www.zipcodeapi.com/rest/<api_key>/info.<format>/<zip_code>/<units>" + authKey;

// url of spotify api "client id"
var spotifyURLBase = "5c75e2b44daf4f32854be392b513b05d" + authKey2;

// variable to track number of playlists
var playlistCounter = 0;

// functions
// ==================

function runQuery(numPlaylists, queryURL, _spotifyURLBase) {
console.log(queryURL, spotifyURLBase)
    $.ajax({ url: queryURL, spotifyURLBase, method: "GET" })
        .done(function(LocationData) {


            // for loop to go thru the numArticles and send to the console.log

            // clear the wells frp, the previous run
            $('#wellSection').empty();

            for (var i = 0; i < numPlaylists; i++) {
                
                // starting to send to HTML here
                var wellSection = $('<div>');
                wellSection.addClass("well");
                wellSection.attr('id', 'articleWell-' + i);
                // grab the well section and append to it
                $('#wellSection').append(wellSection);

                // checks if things exist
                if (LocationData.response.docs[i].headline != "null") {
                    console.log(LocationData.response.docs[i].headline.main);
                    $("#articleWell-" + i).append("<h3>" + LocationData.response.docs[i].headline.main + "</h3>");
                }

                // checks if the byline exist
                if (NYTData.response.docs[i].byline && LocationData.response.docs[i].byline.hasOwnProperty("original")) {
                    console.log(LocationData.response.docs[i].byline.original);
                    $("#articleWell-" + i).append("<h5>" + LocationData.response.docs[i].byline.original + "</h5>");
                }


                // attached the content to the appropriate well, adds a target of blank to open URLs in new window

                $('a[href^="http://"], a[href^="https://"]').attr('target', '_blank');
                $("#articleWell-" + i).append("<h5>" + LocationData.response.docs[i].section_name + "</h5>");
                $("#articleWell-" + i).append("<h5>" + LocationData.response.docs[i].pub_date + "</h5>");
                $("#articleWell-" + i).append("<a href=" + LocationData.response.docs[i].web_url + ">" + LocationData.response.docs[i].web_url + "</a>");

            }

        }).fail(function(err) {
            throw err;
        });

}

// main processes
// ==================


// on click this pulls the query from the api 

$('#searchBtn').on('click', function() {

    searchTerm = $('#search').val().trim();
    // console.log(searchTerm);

    var newURL = queryURLBase + "&q=" + searchTerm;
    // console.log(newURL);

    // get the number of results		
    numPlaylists = $('#numPlaylists').val();


    // get the start and end Zipcode
    startYear = $('#startZipcode').val().trim();
    endYear = $('#endZipcode').val().trim();


    if (parseInt('startZipcode')) {

        // add the needed field to the url
        startZipcode = startZipcode + +"0101";

        // add the date information to the url
        newURL = newURL + "&begin_date=" + startZipcode;
    }

    if (parseInt('endZipcode')) {

        // add the needed field to the url
        endZipcode = endZipcode + +"0101";

        // add the date information to the url
        newURL = newURL + "&end_date=" + endZipcode;
    }


    // var newURL = newURL + "&begin_date=" + startYear + "&end_date=" + endYear;
    // console.log(newURL);


    runQuery(numPlaylists, newURL);
    return false;

})

$(".reset").click(function() {
    $(this).closest('form').find("input[type=text], textarea").val("");
});


// Psuedocoding
// ==================
// 1 - retrieves user inputs and convert to variables
// 2 - use those variables to run an ajax call to the New York Times
// 3 - breakdown the NYT object into usrable fields
// 4 - dynamically generate the html content
// 5 - deal with 'edge cases' -- bugs or situations that are not intuitive.
