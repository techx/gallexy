console.log('Index Page JavaScript Loaded');

// Store of all the local projects
localProjects = [];

// Projects to actually be rendered, post-filtering
renderedProjects = [];

let projectType = 'any';
let projectOrder = 'popular';
let projectContainer = $('#project-container');


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
      getProjects(updateProjects);
    }
  });
  $('#project-order').dropdown({
    onChange: function (text, value) {
      console.log('changed project ordering to '+ text);
      projectOrder = text;
      getProjects(updateProjects);
    }
  });
  
  // get projects on load
  getProjects(updateProjects);
});


function stripProjects(projectList) {
  ids = [];
  projectList.forEach(element => {
    ids.push(element.id);
  });
  return ids;
}

function updateProjects(data, status, jqXHR) {
  localProjects = data;
  render();
}

function getProjects(cb) {
  $.ajax({
    url: '/api/search',
    method: 'GET',
    data: {
      query: null,
      filters: [{ projectType: projectType},{projectOrder: projectOrder}],
      quantity:20,
      ignore: stripProjects(localProjects)
    },
    success: cb
  });
}

function render() {
  sortAndFilterLocal();
  projectContainer.html("");
  renderedProjects.forEach(element => {
    projectContainer.append(createProjectCard(element));  
  });
}

function sortAndFilterLocal() {
  if (projectType != "any") {
    renderedProjects = localProjects.filter((project) => {
      return project.projectType == projectType;
    });
  } else {
    renderedProjects = localProjects.slice();;
  }

  console.log(projectOrder);
  if (projectOrder == "random") {
    renderedProjects = randomSort(renderedProjects);
  } else if (projectOrder == "popular") {
    renderedProjects = popularSort(renderedProjects);
  } else if (projectOrder == "recent") {
    renderedProjects = recentSort(renderedProjects);
  } else {
    console.log("no sort applied");
  }
}

// cmp is true when greater, false otherwise


function randomSort(arr) {
  return qsort(arr, (a, b) => {
    return Math.random() < 0.5;
  });
}
function popularSort(arr) {
  return qsort(arr, (a, b) => { 
    return a.popularity > b.popularity; //TODO use the metadata timesvisited 
  });
}
function recentSort(arr) {
  return qsort(arr, (a, b) => { 
    return a.lastChange > b.lastChange;
  });
}

function createProjectCard(project) {
  let html = `<a class = "ui orange card centered" href="/project?id=${project.id}"><div class = "image">`;
  if (project.picURL) {
    html += `<img src="${project.picURL}">`;
  } else {
    html += `<img src = "/img/placeholder.png">`;
  }
  html += `</div><div class="content"><div class="header">${project.title}</div>`;
  if (project.author) {
    html += `<div class="meta"><span class="author">${project.author}</span></div>`;
  }
  html += `
        <div class="description">
          <p>${project.description}</p>
        </div>
      </div>
      <div class="extra content">
        <p>${project.status}</p>
      </div>
    </a>`;
  return html
}