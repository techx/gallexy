
function contains(t1, t2) {
  if (t1.indexOf(t2) != -1) {
    return true;
  }
}

$('#search-bar').keyup(function () {
  var searchField = $("#search-bar").val().toLowerCase()
  $('.project').each( function () {
    if (!contains($(this).text().toLowerCase(), searchField)) {
      $(this).hide();
    } else {
      $(this).show();
  }
  });
  if (($('.project:visible').length)) {
    $("#noSearch").remove();
  } else {
    if($("#noSearch").length) {
    } else {
      $("#projects").append("<p id='noSearch' style='font-size:2em; '>Sorry, no results found. Try a broader search or different keywords.</p>");
    }
  }
});

function signInClicked() {
  window.location.href = "/signin";
}

function signUpClicked() {
  window.location.href = "/signup";
}
