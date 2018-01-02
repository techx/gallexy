const express = require('express');
let router = express.Router();
const Project = require('../models/Project');


function authenticate(req, res, AuthCallback, UnauthCallback) {
  if (req.isAuthenticated()) {
    AuthCallback(req, res);
  } else {
    UnauthCallback(req, res);
  }
}

/* ROOT ROUTE, main gallery page */
router.get('/', (req, res, next) => {
  authenticate(req, res, (req, res) => {
    res.render('index', {
      title: 'GalleXy',
      loggedIn:true,
      isAdmin: req.user.admin,
      projects:[
        {picURL:"http://www.clockworktalent.com/wp-content/uploads/2015/06/Wearable-tech.jpg",
          title:"Project Melancholy",
         author: "Chet Oswald",
         description: "I am trying to create a wearable that can detect emotions, using analytics and artificial intelligence on an array of sensory inputs.",
         status:"Started December 2015",
         id: "189265"
        },
        {picURL:"https://www.designnews.com/sites/default/files/desk-features.jpg",
          title:"Studio Desk Revamp",
         author: "Claire onyx",
         description: "I am incorporating a bit of augmented reality into my desk, by adding projectors and AR optical markers.",
         status:"Started June 2017",
         id: "189265"
        },
        {picURL:"https://github.com/AngelAlvie/Tetris-3D/blob/master/3DTetris/resources/logo.png?raw=true",
         title:"Tetris 3D",
         author: "Angel Alvarez",
         description: "A 3D version of the classic game of Tetris, using Java Swing.",
         status:"Completed May 2016",
         id: "189265"
        },
        {title:"Title",
         author: "Author",
         description: "This is an example project, this is where a description of the project goes.",
         status:"Project Status.",
         id: "189265"
        },
        {picURL:"https://www.montereybayaquarium.org/-/m/images/animal-guide/marine-mammals/sea-otter-mom-pup.jpg?mh=916&mw=1222&usecustomfunctions=1&centercrop=1",
         title:"Sea Otter Solidarity Project",
         author: "Emmet Otterton",
         id: "189265",
         description: "We aim to bring otters back into society as a force for social good.",
         status:"Completed March 2010"
        },
        {picURL:"https://blog.therestaurantzone.com/wp-content/uploads/2017/01/restaurant-recruiting-tools.jpg",
         title:"United Makerspace",
         author: "James Jasonson",
         description: "For too long, course 6ers and mechies have been divided. We want to open this makerspace to heal this divide.",
         status: "Started November 2016",
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
        {picURL:"http://www.clockworktalent.com/wp-content/uploads/2015/06/Wearable-tech.jpg",
          title:"Project Melancholy",
         author: "Chet Oswald",
         description: "I am trying to create a wearable that can detect emotions, using analytics and artificial intelligence on an array of sensory inputs.",
         status:"Started December 2015",
         id: "189265"
        },
        {picURL:"https://www.designnews.com/sites/default/files/desk-features.jpg",
          title:"Studio Desk Revamp",
         author: "Claire onyx",
         description: "I am incorporating a bit of augmented reality into my desk, by adding projectors and AR optical markers.",
         status:"Started June 2017",
         id: "189265"
        },
        {picURL:"https://github.com/AngelAlvie/Tetris-3D/blob/master/3DTetris/resources/logo.png?raw=true",
         title:"Tetris 3D",
         author: "Angel Alvarez",
         description: "A 3D version of the classic game of Tetris, using Java Swing.",
         status:"Completed May 2016",
         id: "189265"
        },
        {picURL:"https://blog.therestaurantzone.com/wp-content/uploads/2017/01/restaurant-recruiting-tools.jpg",
         title:"United Makerspace",
         author: "James Jasonson",
         description: "We wanted to create a makerspace that would be as much a workshop as it was a place for people to meetup.",
         status: "Started november 2016",
         id: "189265"
       },
        {title:"Title",
         author: "Author",
         description: "Description",
         status:"Not finished",
         id: "189265"
        },
        {picURL: "http://www.jeffgeerling.com/sites/jeffgeerling.com/files/raspberry-pi-dramble-cluster_1.jpg",
          title:"Title",
         author: "Author",
         description: "Description",
         status:"Not finished",
         id: "189265"
        },
        {picURL: "https://www.3dhubs.com/s3fs-public/talk/attachments/3D_PRINTED_EXOSKELETON_HAND_large.png",
          title:"Title",
         author: "Author",
         description: "Description",
         status:"Not finished",
         id: "189265"
        },
        {picURL:"https://www.montereybayaquarium.org/-/m/images/animal-guide/marine-mammals/sea-otter-mom-pup.jpg?mh=916&mw=1222&usecustomfunctions=1&centercrop=1",
         title:"Sea Otter Solidarity Project",
         author: "Emmet Otterton",
         description: "We aim to bring otters back into society as a force for social good.",
         status:"Completed 2010",
         id: "189265"
        }
      ] });
  });
});


module.exports = router;
