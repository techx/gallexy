
//Define the API used by the semantic UI JS
$.fn.api.settings.api = {
    'search': '/api/search?query={value}' // value is already defined by the semantic specification
}

// Search related functions
$('.search input').api({
    action: 'search',
    on: 'onsubmit',
    beforeSend: function () {
        console.log("query occured");
    }
});

//local search exclusion TODO finish local exclusion of projects that are out of search context. try to maintain a minimum amount of search results, and if exceeded, then request more from server
// TODO make sure local search also integrates sorts and filters && render webpage content based on the queries
function contains(t1, t2) {
    if (t1.indexOf(t2) != -1) {
        return true;
    }
}

$('.input').keyup(function () {
    var searchField = $(".input").val().toLowerCase()
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
});


//temporarilly filled with data TODO: remove this in the future (after it works)
var content = [
    { title: "Pepe" },
    { title: "Feels good man" },
    { title: "Rufus" },
    { title: "Darningo" },
    { title: "Salty Sally" }
];

// TODO: fix search results
$('.ui.search').search({
    source: content
});

// Fancy search bar widening animation
var extended = false; //this variable prevents the overflow being forced into a constant animation loop on mouseenter
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
