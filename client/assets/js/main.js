
function contains(t1, t2) {
  if (t1.indexOf(t2) != -1) {
    return true;
  }
}

$('.searchBar').keyup(function () {
  var searchField = $(".searchBar").val().toLowerCase()
  $('.project').each( function () {
    if (!contains($(this).text().toLowerCase(), searchField)) {
      $(this).hide();
    } else {
      $(this).show();
  }
});
if (($('.project:visible').length <=3)) {
  if($(".noSearch").length) {
  } else {
    $(".projects").append("<p class='noSearch' style='font-size:2em; '>Sorry, no results found. Try a broader search or different keywords.</p>");
    console.log("hidden");
  }
} else {
  $(".noSearch").remove();
}
});
