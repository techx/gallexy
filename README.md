# GalleXy
An internet presence for the amazing projects created by students here at MIT. A gallery website for displaying projects for public consumption. To be used by ProjX and HackMIT.

## Features
  * A full gallery view with individual project pages.
  * Profile and Check In system for individual teams.
  * Authentication supporting profile system, along with MIT Certificate verification to allow for MIT Students
  * Author/Team pages for letting project creators show off.

## Developers
  * Angel Alvarez
  * Emily Liu

## Goals
  * populate database by allowing users (project teams) to provide check-in data
  * populate database with admin check-in system

## Getting started
#### After you download the code from this repository, your going to want to do the following things:
  1. Make sure to `npm install` in the repo, and that the NodeJS you have installed is later than `6.0.0` (For email support).
  2. Create a `settings.js` file and database folder in the `/server` folder.
    * Your settings folder should look like this:
```javascript
module.exports = {
  mongoUri: "data", /*RELATIVE TO THE Project location if using gulp and localhost*/
  mongoHost: "mongodb://localhost/",
  winMachine: false,  /* whether or not the computer is running windows, or linux/mac OS. This affects the automation of the tasks.*/
  port:3000,  /* PORT TO RUN THE SERVER, use 80 or 8080 for HTTP */
  secret: "7928xj9kd01xj0x9mu98ex", /* Secret used to create sessions. keep secret. */
  admins: ['alvareza@mit.edu'], /*you can define admins for the website using their emails. */
  verificationExpiration: 86400000, /* sets in seconds how long you want to wait for the code to expire */
  mailTransporter: { /*the mail transporter object can be customized based on the nodemailer documentation*/
    service: 'gmail',
    auth: {
      user: 'gallexy-emailer@gmail.com',
      pass: '<email-password>' //Keep this secret
    }
  },
  https: true, /* Enables use of secure cookies. */
  appURL: 'localhost:3000', /*relative to the outward facing internet, if using an http port, omit the port. */
  devMode: true /*set if you want the app to not send emails and auto register people when the sign up, good for testing. */
};
```
  3. simply run `gulp` in the `/server` folder to start the server and database.
    * If the DB doesn't work, you could run it using the `mongod` command, modify the DB URL in the `app.js`, then run the app using `npm start`
## API

All API calls are put through the API router at `\api`:

Here are the API actions:

#### Ping
`/api/ping`

You can ping the server just to make sure it's still alive. Calling a `GET` request to  `/api/ping` will return:
```JavaScript
{"message": "pong"}
```
#### Suggest
`/api/suggest/?`

This endpoint will take an incomplete string, and provide a list of recommendations based on real words, previous searches, and projects in the database.
Making a `GET` request to `/api/suggest/?query=<URL ENCODED DATA>` will perform a suggestion search. This may look something like this:
```JavaScript
{"results":
   [{"title":"Otter Solidarity Project"},
    {"title":"Tetris-3D"},
    {"title":"Studio Desk Revamp"},
    {"title":"Project Melancholy"},
    {"title":"United Makerspace"},
    {"title":"Hello World"}
  ]
}
```
#### Search
`/api/search/?`

This endpoint is designed to power the most important part of the app. The search API takes a request object with queries, filters, and locally stored IDs to ignore. The data for a `GET` request to this endpoint looks something like this:
```JavaScript
{ query: '',
  filters: [ { projectType: 'any' }, { projectOrder: 'popular' } ],
  quantity: '20',
  ignore: ['1834c875ab788f5e','adb75f7a35a85687','865dacb8a65cf05e'] 
}
```
The GalleXy search engine tries to fulfill the request:
```JavaScript
[{"picURL":"LONG PICTURE URL",
  "title":"Project Title",
  "author":"Project Author",
  "description":"Project Description",
  "status":"Started December 2015",
  "id":"189265",
  "popularity":987,
  "lastChange":"2010-12-03T21:43:23.414Z",
  "projectType":"projx"
  }, ...]
```

## Sources
* Background image (NASA JPL): https://www.jpl.nasa.gov/spaceimages/details.php?id=PIA07136
* Footer alignment: http://matthewjamestaylor.com/blog/keeping-footers-at-the-bottom-of-the-page
* sign in/up format: https://semantic-ui.com/examples/login.html
