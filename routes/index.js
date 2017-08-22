const express = require('express');
var router = express.Router();
const Project = require('../models/Project');


function authenticate(req, res, AuthCallback, UnauthCallback) {
  if (req.isAuthenticated()) {
    AuthCallback(req, res);
  } else {
    UnauthCallback(req, res);
  }
}

/* ROOT ROUTE, main gallery page */
router.get('/', function(req, res, next) {
  authenticate(req, res, (req, res) => {
    res.render('index', {
      title: 'GalleXy',
      loggedIn:true,
      isAdmin: req.user.admin,
      projects:[
        {picURL:"https://www.montereybayaquarium.org/-/m/images/animal-guide/marine-mammals/sea-otter-mom-pup.jpg?mh=916&mw=1222&usecustomfunctions=1&centercrop=1",
         title:"Sea Otter Solidarity Project",
         author: "Emmet Otterton",
         id: "189265",
         description: "We aim to bring otters back into society as a force for social good.",
         status:"Completed 2010"
        },
        {title:"Title",
         author: "Author",
         description: "Description",
         status:"Not finished",
         id: "189265"
        },
        {picURL:"https://blog.therestaurantzone.com/wp-content/uploads/2017/01/restaurant-recruiting-tools.jpg",
         title:"United Makerspace",
         author: "James Jasonson",
         description: "For too long, course 6ers and mechies have been divided. We want to open this makerspace to heal this divide.",
         status: "Started november 2016",
         id: "189265"
        }
      ]
    });
  }, (req, res) => {
    res.render('index', {
      title: 'GalleXy',
      loggedIn:false,
      isAdmin:false,
      projects:[
        {picURL:"https://www.montereybayaquarium.org/-/m/images/animal-guide/marine-mammals/sea-otter-mom-pup.jpg?mh=916&mw=1222&usecustomfunctions=1&centercrop=1",
         title:"Sea Otter Solidarity Project",
         author: "Emmet Otterton",
         description: "We aim to bring otters back into society as a force for social good.",
         status:"Completed 2010",
         id: "189265"
        },
        {title:"Title",
         author: "Author",
         description: "Description",
         status:"Not finished",
         id: "189265"
        },
        {picURL:"https://blog.therestaurantzone.com/wp-content/uploads/2017/01/restaurant-recruiting-tools.jpg",
         title:"United Makerspace",
         author: "James Jasonson",
         description: "For too long, course 6ers and mechies have been divided. We want to open this makerspace to heal this divide.",
         status: "Started november 2016",
         id: "189265"
        }
      ] });
  });
});


module.exports = router;
