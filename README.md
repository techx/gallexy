# Gallexy
An internet presence for the amazing projects created by students here at MIT. A gallery website for displaying projects for public consumption. Will be used by ProjX and HackMIT.

## Features
  * A full gallery view with individual project pages.
  * Profile and Check In system for individual teams.
  * Authentication supporting profile system, along with MIT Certificate verification to allow for MIT Students
  * Author/Team pages for letting project creators show off.

## Developers
  * Angel Alvarez
  * ~~Michael Silver~~

## Goals
  * populate database by allowing users (project teams) to provide check-in data
  * populate database with admin check-in system

## Getting started
#### After you download the code from this repository, your going to want to do the following things:
  1. make sure to `npm install` in the repo.
  2. create a `config.js` file. the server uses this to set various settings. it should include a `mongoUri`(relative to the app), `port` and a `winMachine` boolean.
  3. if you want the mongo server to run locally, create a `data` folder in your project. then set your `mongoUri` to `data` directory.
  5. run `gulp` to start the server
