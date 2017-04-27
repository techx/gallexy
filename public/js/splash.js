$.fn.api.settings = {
  search : "/search/?query={value}"
}

$(".project-search").api({
  action:"search",
  stateContext:"loading",
  on:"oninput"
});
