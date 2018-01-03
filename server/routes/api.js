const express = require('express');
const router = express.Router();

const Project = require('../models/Project');


/* IN THIS CONTEXT, API WILL BE DEFINED TO BE THE URLS THAT AREN'T REQUESTS, BUT ARE EXTRA FUNCTIONALITY */


function authenticate(req, res, AuthCallback, UnauthCallback) {
  if (req.isAuthenticated()) {
    AuthCallback(req, res);
  } else {
    UnauthCallback(req, res);
  }
}

// A way to ping the server over HTTP, also a way to test API
router.get('/ping', (req, res, next) => {
  res.status(200).json({'message':'pong'});
});

router.get("/search", (req, res, next) => {
  console.log(req.query);
  res.status(200).json([
    {
      picURL: "http://www.clockworktalent.com/wp-content/uploads/2015/06/Wearable-tech.jpg",
      title: "Project Melancholy",
      author: "Chet Oswald",
      description: "I am trying to create a wearable that can detect emotions, using analytics and artificial intelligence on an array of sensory inputs.",
      status: "Started December 2015",
      id: "189265",
      popularity: 987,
      lastChange: new Date(2010, 11,3,16,43,23,414),
      projectType: "projx"
    },
    {
      picURL: "https://www.designnews.com/sites/default/files/desk-features.jpg",
      title: "Studio Desk Revamp",
      author: "Claire onyx",
      description: "I am incorporating a bit of augmented reality into my desk, by adding projectors and AR optical markers.",
      status: "Started June 2017",
      id: "1982765",
      popularity: 47,
      lastChange: new Date(2012, 11, 3, 32, 43, 23, 414),
      projectType: "projx"
    },
    {
      picURL: "https://github.com/AngelAlvie/Tetris-3D/blob/master/3DTetris/resources/logo.png?raw=true",
      title: "Tetris 3D",
      author: "Angel Alvarez",
      description: "A 3D version of the classic game of Tetris, using Java Swing.",
      status: "Completed May 2016",
      id: "765123",
      popularity: 1,
      lastChange: new Date(2014, 11, 3, 16, 43, 23, 414),
      projectType: "hack"
    },
    {
      title: "Title",
      author: "Author",
      description: "This is an example project, this is where a description of the project goes.",
      status: "Project Status.",
      id: "019383",
      popularity: 97,
      lastChange: new Date(2015, 1, 4, 16, 43, 23, 414),
      projectType: "make"
    },
    {
      picURL: "https://www.montereybayaquarium.org/-/m/images/animal-guide/marine-mammals/sea-otter-mom-pup.jpg?mh=916&mw=1222&usecustomfunctions=1&centercrop=1",
      title: "Sea Otter Solidarity Project",
      author: "Emmet Otterton",
      id: "349864",
      description: "We aim to bring otters back into society as a force for social good.",
      status: "Completed March 2010",
      popularity: 18,
      lastChange: new Date(2000, 11, 3, 16, 35, 23, 414),
      projectType: "think"
    },
    {
      picURL: "https://blog.therestaurantzone.com/wp-content/uploads/2017/01/restaurant-recruiting-tools.jpg",
      title: "United Makerspace",
      author: "James Jasonson",
      description: "For too long, course 6ers and mechies have been divided. We want to open this makerspace to heal this divide.",
      status: "Started November 2016",
      id: "198742",
      popularity: 74,
      lastChange: new Date(2018, 0, 1, 16, 43, 3, 414),
      projectType: "hack"
    }
  ]);
});

router.get('/suggest', (req, res, next) => {
  console.log(req.query);
  // just give them the same recommendations for now (stubbed)
  res.status(200).json(
    {
      "results": [
        {"title":"Otter Solidarity Project"},
        {"title":"Tetris-3D"},
        {"title":"Studio Desk Revamp"},
        {"title":"Project Melancholy"},
        {"title":"United Makerspace"}]
    }
    
  );
});

module.exports = router;
