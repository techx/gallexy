# GalleXy
An internet presence for the amazing projects created by students here at MIT. A gallery website for displaying projects for public consumption. Will be used by ProjX and HackMIT.

## Features
  * A full gallery view with individual project pages.
  * Profile and Check In system for individual teams.
  * Authentication supporting profile system, along with MIT Certificate verification to allow for MIT Students
  * Author/Team pages for letting project creators show off.

## Developers
  * Angel Alvarez

## Goals
  * populate database by allowing users (project teams) to provide check-in data
  * populate database with admin check-in system

## Getting started
#### After you download the code from this repository, your going to want to do the following things:
  1. Make sure to `npm install` in the repo.
  2. Create a `settings.js` file and database folder in the gallexy folder.
    * Your settings folder should look like this:
```javascript
module.exports = {
 mongoUri: "data",
 port : 5000,
 winMachine: false,
 secret : "odiawjo329uj98rfoi930"
};
```
  3. simply run `gulp` to start the server and database.

## Sources
* Background image (NASA JPL): https://www.jpl.nasa.gov/spaceimages/details.php?id=PIA07136
* Footer alignment: http://matthewjamestaylor.com/blog/keeping-footers-at-the-bottom-of-the-page
* sign in/up format: https://semantic-ui.com/examples/login.html
* token authentication: https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens
