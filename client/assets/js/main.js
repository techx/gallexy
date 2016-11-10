/*
* Most of this script should be used just for search functionality,
*or anything else I can think of
*
* does not work right now, I will put more serious work into it over weekend.
*
*/

console.log("script running");

  var searchFields = $('.project');

function search() {
  var search = $('searchBar');

  for (project in searchFields)

  if(searchBar.value === searchFields[project].get(2)) {
    searchFields[project].show();
  } else {
    searchFields[project].hide();
  }

}
