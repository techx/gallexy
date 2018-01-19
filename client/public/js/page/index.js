$(document).ready(() => {
  // Store of all the local projects
  localProjects = [];

  // Projects to actually be rendered, post-filtering
  renderedProjects = [];


  let searchQuery = '';
  
  let color = sessionStorage.getItem('color');
  let projectType = 'any';
  if (color) {
    projectType = color;
    $('#project-type').dropdown('set value', projectType);
  }
  let projectOrder = 'popular';
  let projectContainer = $('#project-container');
  let extended = false;
  let searchObj = $('.ui.search');
  $.fn.api.settings.api = {
    'suggest': '/api/suggest?query={query}'
  }

  $('.ui.dropdown').dropdown({
    on: 'hover',
    transition: 'drop',
    action: 'activate',
  });

  // TODO: fix search results
  searchObj.search({
    minCharacters: 3,
    showNoResults: true,
    searchDelay: 500,
    apiSettings: {
      action: 'suggest'
    },
    fields: {
      results: 'results'
    },
    onSelect: function (query) {
      getProjects(updateProjects);
      searchObj.search('hide results');
    }
  }).keypress(function (event) {
    if (event.key == 'Enter') {
      getProjects(updateProjects);
      searchObj.search('hide results');
    }
  });

  //searchbar extend functionality
  $(".search-container").bind("mouseenter", function (event) {
    extendBar(".search-container");
  }).bind("mouseleave", function (event) {
    retractBar(".search-container");
  });

  console.log("Searchbar loaded");
  
  // set query to appropriate values
  onLoad();
  console.log(searchQuery);

  $('#project-type').dropdown({
    onChange: function(text, value) {
      changeColor(text);
      projectType = text;
      getProjects(updateProjects);
    }
  });
  $('#project-order').dropdown({
    onChange: function (text, value) {
      projectOrder = text;
      getProjects(updateProjects);
    }
  });

  

  // get projects on load
  getProjects(updateProjects);

  function onLoad() {
    // on load I know that i cna be coming from a different location, so I want to get the query, and set the searchbar value to it.
    var URLquery = window.location.search.substring(1);
    var qs = parse_query_string(URLquery);
    if (qs) {
      if (qs["query"]) {
        searchQuery = qs.query;
        searchObj.search('set value', searchQuery);
        extendBar(".search-container");

      }
    }
  }

  function updateSearchQuery() {
    searchQuery = searchObj.search('get value');
  }

  function parse_query_string(query) {
    var vars = query.split("&");
    var query_string = {};
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      // If first entry with this name
      if (typeof query_string[pair[0]] === "undefined") {
        query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
      } else if (typeof query_string[pair[0]] === "string") {
        var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
        query_string[pair[0]] = arr;
        // If third or later entry with this name
      } else {
        query_string[pair[0]].push(decodeURIComponent(pair[1]));
      }
    }
    return query_string;
  }

  /* THE FOLLOWING TWO FUNCTIONS ARE USED TO UPDATE THE ANIMATION OF THE SEARCH BAR*/
  function extendBar(searchbar) {
    if (!extended) {
      $(searchbar).animate({
        width: "50%"
      }, "fast");
      extended = true;
    }
  };

  function retractBar(searchbar) {
    if ($(".search input").val() == "") {
      $(searchbar).stop(true).animate({
        width: "25%"
      }, "fast");
      extended = false;
    }
  };

  /* THE FOLLOWING FUNCTIONS ARE USED IN THE getProjects(updateProjects) CALL STACK*/
  function getProjects(cb) {
    new Promise((resolve, reject) => {
      updateSearchQuery();
      resolve();
    }).then(() => {
      $.ajax({
        url: '/api/search',
        method: 'GET',
        data: {
          query: searchQuery,
          filters: [{ projectType: projectType }, { projectOrder: projectOrder }],
          quantity: 20,
          ignore: stripProjects(localProjects)
        },
        success: cb
      });
    });
  }

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

    if (projectOrder == "random") {
      renderedProjects = randomSort(renderedProjects);
    } else if (projectOrder == "popular") {
      renderedProjects = popularSort(renderedProjects);
    } else if (projectOrder == "recent") {
      renderedProjects = recentSort(renderedProjects);
    }
  }

  /* SORTING ROUTINES THAT ARE USED BY sortAndFilterLocal */
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

  /* CARD GENERATOR FUNCTION THAT IS USED BY THE render METHOD*/
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

  console.log('Index Page JavaScript Loaded');

});