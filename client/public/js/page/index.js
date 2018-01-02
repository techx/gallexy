// TODO: implement sort dropdown
console.log('Index Page JavaScript Loaded');

localProjects = []; //list of projects that we already have

let projectType = 'projX';
let projectOrder = 'popular';

$(document).ready(() => {
  $('.ui.dropdown').dropdown({
    on: 'hover',
    transition: 'drop',
    action: 'activate',
  });
  $('#project-type').dropdown({
    onChange: function(text, value) {
      console.log('changed project type');
      changeColor(text);
      projectType = text;
      $.ajax({
        url:'/api/search',
        method:'GET',
        data: {
          projectType: projectType,
          projectOrder: projectOrder,
          filters: [] 
        },
        success: function(data, status, jqXHR) {
          console.log("successful API call");
          console.log(data);
        }
      });
    }
  });
  $('#project-order').dropdown({
    onChange: function (text, value) {
      console.log('changed project ordering');
      projectOrder = text;
    }
  });
  //include transactions to request more data about particular projects
  
});
