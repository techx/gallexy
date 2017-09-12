/* timeline */
/* This script will align the content */
$(document).ready(function() {
  var nodes = $(".node-wrapper");
  var buffer = 4;
  var delta = 92/(nodes.length);
  for (var i = 0; i<nodes.length; i++) {
    $(nodes[i]).css("left", "" + (i*delta + buffer) + "%");
  }
});
// TODO: take these notes, and create working timeline
// I also want to generate dividers for months, days, weeks, or years, based on timeline
    // implement a way to scan the timeline, and implement break points for different lengths of time
// sort the times in the array.
// position with the node wrapper
// I basically want to scale these nodes from their ordering on the timeline (date), to a value from 4 to 96.
// Scaling can happen by normalizing the values to less than one (divide by biggest element), then multiplying by 96-4 and adding 4
// to get the numbers from the timeline,
// from the css:
// left: 4%; right:4%;
