const express = require('express');
var router = express.Router();
const User = require('../models/User'); //TODO: INCORPORATE INFORMATION FROM DB INTO USER ROUTES (PROFILE + ACCOUNT)


// TODO: MAKE THIS INTO A SIMPLE MIDDLEWARE (SINCE MOST OF THE TIME I'M JUST REDIRECTING YOU TO HOME
  //FOR PROTECTED ROUTES
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

/* AUTHENTICATION ROUTES */
router.get('/signin', function(req, res, next) {
  authenticate(req, res, (req, res) => {
    res.redirect('/');
  }, (req, res) => {
    res.render('signin', {title: 'GalleXy | Sign In', loggedIn:false, isAdmin:false});
  });
});

router.get('/signup', function(req, res, next) {
  authenticate(req, res, (req, res) => {
    res.redirect('/');
  }, (req, res) => {
    res.render('signup', {title: 'GalleXy | Sign Up', loggedIn:false, isAdmin:false});
  });
});

/* RENDERS AFTER YOU SUCCESSFULLY SIGNUP */
router.get('/signup2', function(req, res, next) {
  res.render('signup2', {title: 'GalleXy |  Sign Up', loggedIn:false, isAdmin:false});
});

/* GET project routes */
router.get('/project', function (req, res, next) {
  authenticate(req, res, (req, res) => {
    res.render('project', { title: 'GalleXy | Project', progress: Math.ceil(Math.random()*100), loggedIn: true, isAdmin: req.user.admin });
  }, (req, res)=>{
    res.render('project', { title: 'GalleXy | Project', progress: Math.ceil(Math.random() * 100), loggedIn: false, isAdmin: false });
  });
});

/* NEW PROJECT PAGE */
router.get('/new', function(req, res, next) {
  authenticate(req, res, (req, res) => {
    res.render('newproject', { title: 'GalleXy | New Project', loggedIn: true, isAdmin: req.user.admin });
  }, (req, res) => {
    res.redirect('/');
  });

});

/* GET user routes */
// if profile requested does not belong to the person, then render as a creator, and not as a profile
router.get('/account', function(req, res, next) {
  authenticate(req, res, (req, res) => {
    res.render('account', {
      title: 'GalleXy | ' + req.user.email,
      loggedIn: true,
      isAdmin: req.user.admin,
      /* ACCOUNT PROPERTIES*/
      public: false,
      email: 'alvareza@mit.edu',
      name: 'Angel Alvarez',
      year: '2020',
      study: 'Computer Science',
      school: 'MIT',
      bio: 'This is my biography, I guess I can be cool.',
      picURL: 'https://avatars0.githubusercontent.com/u/22334760?v=4&s=460',
      resumeURL: 'http://web.mit.edu/alvareza/www/Alvarez%20Angel%20Resume.pdf',
      projects:[
        {title:"Tetris 3D", time:"May 2016", status:"Completed", id:"9182749"},
        {title:"GalleXy", time:"September 2016", status: "Almost There", id:"18974"},
        {title: "Terminal.JS", time: "July 2017", status: "Completed", id:"129864"}
      ]
    });
  }, (req, res) => {
    res.redirect('/');
  });
});

router.get('/edit/account', function (req, res, next) {
  authenticate(req, res, (req, res) => {
    res.render('editaccount', {
      title: 'GalleXy | ' + req.user.email,
      loggedIn: true,
      isAdmin: req.user.admin,
      /* ACCOUNT PROPERTIES*/
      name: 'Angel Alvarez',
      year: '2020',
      study: 'Computer Science',
      school: 'MIT',
      bio: 'This is my biography, I guess I can be cool enough.',
      picURL: 'https://avatars0.githubusercontent.com/u/22334760?v=4&s=460',
      resumeURL: 'http://web.mit.edu/alvareza/www/Alvarez%20Angel%20Resume.pdf',
      projects: [
        { title: "Tetris 3D", time: "May 2016", status: "Completed" , id:"124986"},
        { title: "GalleXy", time: "September 2016", status: "Almost There" , id:"8971024"},
        { title: "Terminal.JS", time: "July 2017", status: "Completed" , id:"126498"}
      ]
    });
  }, (req, res) => {
    res.redirect('/');
  });
});

router.post('/edit/account', function (req, res, next) {
  authenticate(req, res, (req, res) => {
    console.log("We've got a form action");
    console.log(req.body.name);
    console.log(req.body.year);
    console.log(req.body.study);
    console.log(req.body.school);
    console.log(req.body.bio);

    res.redirect('/account');
  }, (req, res) => {
    res.redirect('/');
  });
});


/* DISPLAYS A USER PROFILE BASED ON THE USER'S EMAIL */
router.get('/profile', function(req, res, next) {
  authenticate(req, res, (req, res) => {
    res.render('profile', {
      title: 'GalleXy | ' + req.query.email,
      loggedIn: true,
      isAdmin: req.user.admin,
      name: 'Angel Alvarez',
      year: '2020',
      study: 'Computer Science',
      school: 'MIT',
      bio: 'This is my biography, I guess I can be cool enough.',
      picURL: 'https://avatars0.githubusercontent.com/u/22334760?v=4&s=460',
      resumeURL: 'http://web.mit.edu/alvareza/www/Alvarez%20Angel%20Resume.pdf',
      projects: [
        { title: "Tetris 3D", description: "A game you can play", status: "Completed May 2016" , id:"124986", author: "Angel Alvarez"},
        { title: "GalleXy", description: "A website you can visit", status: "Almost There" , id:"8971024", author: "Angel Alvarez"},
        { title: "Terminal.JS", description: "A terminal you can use", status: "Completed" , id:"126498", author: "Angel Alvarez"}
      ]
     });
  }, (req, res) => {
    res.render('profile', { title: 'GalleXy | ' + req.query.email,
      loggedIn: false,
      isAdmin: false,
      name: 'Angel Alvarez',
      year: '2020',
      study: 'Computer Science',
      school: 'MIT',
      bio: 'This is my biography, I guess I can be cool enough.',
      picURL: 'https://avatars0.githubusercontent.com/u/22334760?v=4&s=460',
      resumeURL: 'http://web.mit.edu/alvareza/www/Alvarez%20Angel%20Resume.pdf',
      projects: [
        { title: "Tetris 3D", description: "A game you can play", status: "Completed May 2016" , id:"124986", author: "Angel Alvarez"},
        { title: "GalleXy", description: "A website you can visit", status: "Almost There" , id:"8971024", author: "Angel Alvarez"},
        { title: "Terminal.JS", description: "A terminal you can use", status: "Completed" , id:"126498", author: "Angel Alvarez"},
        { picURL:"https://www.montereybayaquarium.org/-/m/images/animal-guide/marine-mammals/sea-otter-mom-pup.jpg?mh=916&mw=1222&usecustomfunctions=1&centercrop=1",
          title:"Sea Otter Solidarity Project",
          author: "Emmet Otterton",
          description: "We aim to bring otters back into society as a force for social good.",
          status:"Completed 2010",
          id: "189265"
        }
      ]
    });
  });
});

/* ADMIN PAGE FOR MANAGING PROJECTS */
/* TODO MAKE TYPES OF ADMINS FOR DIFFERENT TECHX ORGANIZATIONS */

router.get('/admin', function(req, res, next) {
  authenticate(req, res, (req, res)=> {
    if (req.user.admin) {
      res.render('admin', {
        title: 'GalleXy | Admin',
        loggedIn: true,
        isAdmin: true,
        users: [{email:"alvarea@mit.edu", id:"100", info:JSON.stringify({bio:"extra", date:100}), projects:[199,109,672].toString()},
                {email:"emmabat@mit.edu", id:"101", info:JSON.stringify({bio:"test", date:10}), projects:[191,129,172].toString()}],
        projects: [{title:"Cool Project", id:"1249876", description:"good project idea", status: "complete"}]
      });
    } else {
      res.redirect('/');
    }
  }, (req, res) => {
    res.redirect('/');
  });
});

module.exports = router;
