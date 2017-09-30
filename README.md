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
  2. Create a `settings.js` file and database folder in the gallexy folder.
    * Your settings folder should look like this:
```javascript
module.exports = {
  mongoUri: "data", /*RELATIVE TO THE PROJECT LOCATION*/
  winMachine: false,  /* whether or not the computer is running windows, or linux/mac OS. This affects the automation of the tasks.*/
  port:3000,  /* PORT TO RUN THE SERVER, use 80 or 8080 for HTTP */
  secret: "7928xj9kd01xj0x9mu98ex", /* Secret used to create sessions. keep secret. */
  admins: ['alvareza@mit.edu'], /*you can define admins for the website using their emails. */
  verificationExpiration: 86400000,
  mailTransporter: { /*the mail transporter object can be customized based on the nodemailer documentation*/
    service: 'gmail',
    auth: {
      user: 'gallexy-emailer@gmail.com',
      pass: '<email-password>' //Keep this secret
    }
  },
  https: true, /* Enables use of secure cookies. */
  appURL: 'localhost:3000', /*relative to the outward facing internet, if using an http port, omit the port. */
  devMode: true
};
```
  3. simply run `gulp` to start the server and database.
    * If the DB doesn't work, you could run it using the `mongod` command, modify the DB URL in the `app.js`, then run the app using `npm start`
## API
#### Documentation coming soon 

## Sources
* Background image (NASA JPL): https://www.jpl.nasa.gov/spaceimages/details.php?id=PIA07136
* Footer alignment: http://matthewjamestaylor.com/blog/keeping-footers-at-the-bottom-of-the-page
* sign in/up format: https://semantic-ui.com/examples/login.html
