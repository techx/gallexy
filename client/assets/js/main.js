
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
  }});
});
