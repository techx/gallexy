// THIS IS THE FUNCTIONALITY OF THE SEARCHBAR WHEN ON PAGES THAT ARE NOT THE INDEX PAGE
// SEARCHBAR FUNCTION OF INDEX PAGE DEFINED ON THE INDEX PAGE

// THIS SHOULD:
/* Perform animations of the searchbar.
    if the searchbar is typed into, under certain conditions, (like having at least 3 characters),
    then it should call the server suggest API
    if a query is actually entered, then the server should redirect the client to the index page, with the given query in the searchbar.

*/

$(document).ready(function() {
    
    $.fn.api.settings.api = {
        'suggest': '/api/suggest?query={query}'
    }

    // TODO: fix search results
    $('.ui.search').search({
        minCharacters:3,
        showNoResults:true,
        searchDelay:500,
        apiSettings: {
            action: 'suggest'
        },
        fields: {
            results: 'results'
        },
        onResults: function(response) {
            console.log("we got data back!");
            console.log(response);
        }
    });


// ------------------------------------------------------------------
// DO NOT TOUCH BELOW THIS LINE - Fancy search bar widening animation
// ------------------------------------------------------------------

    let extended = false; //this letiable prevents the overflow being forced into a constant animation loop on mouseenter
    $(".search-container").bind("mouseenter", function (event) {
        if (!extended) {
            $(this).animate({
                width: "50%"
            }, "fast");
            extended = true;
        }
    }).bind("mouseleave", function (event) {
        if ($(".search input").val() == "") {
            $(this).stop(true).animate({
                width: "25%"
            }, "fast");
            extended = false;
        }
    });

    console.log("Searchbar loaded");
});










/* this is the old code:

//Define the API used by the semantic UI JS
    $.fn.api.settings.api = {
        'search': '/api/search?query={value}' // value is already defined by the semantic specification
    }
    // Search related functions
    $('.ui.search').api({
        action: 'search',
        on: 'onsubmit',
        beforeSend: function () {
            console.log("query occured");
        }
    });

    // local search exclusion TODO finish local exclusion of projects that are out of search context.
    // try to maintain a minimum amount of search results, and if exceeded, then request more from server
    // TODO make sure local search also integrates sorts and filters && render webpage content based on the queries
    function contains(t1, t2) {
        if (t1.indexOf(t2) != -1) {
            return true;
        }
    }

    $('.input').keyup(function () {
        let searchField = $(".input").val().toLowerCase()

        // this should do the filtering and render of the projects
        $('.card').each(function () {
            if (!contains($(this).text().toLowerCase(), searchField)) {
                $(this).hide();
            } else {
                $(this).show();
            }
        });

        if (($('.card:visible').length)) {
            $("#noSearch").remove();
        } else {
            if ($("#noSearch").length) {
            } else {
                $("#projects").append("<p id='noSearch' style='font-size:2em; '>Sorry, no results found. Try a broader search or different keywords.</p>");
            }
        }
        //
    });



*/