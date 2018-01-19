$(document).ready(function() {
    let searchObj = $('.ui.search');
    $.fn.api.settings.api = {
        'suggest': '/api/suggest?query={query}'
    }

    // TODO: fix search results
    searchObj.search({
        minCharacters:3,
        showNoResults:true,
        searchDelay:500,
        apiSettings: {
            action: 'suggest'
        },
        fields: {
            results: 'results'
        },
        onSelect: function(query) {
            let str = encodeURIComponent(searchObj.search('get value'));
            window.location.replace("/?query=" + str);
        }
    }).keypress(function(event) {
        if (event.key == 'Enter') {
            let str = encodeURIComponent(searchObj.search('get value'));
            window.location.replace("/?query=" + str);
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
