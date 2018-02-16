# GalleXy Documentation

GalleXy is a gallery of projects completed for various TechX evenets. This documentation is designed to provide some insight into how GalleXy works. 

## File Structure

The Repo is separated into two components, a client and a server. The client composes all the client side JavaScript, CSS and templates for pages that are served by the server.

The server is broken up into several parts: 
* `controllers`
  * These scripts perform various operations that are not related to routing, but are called by the router to perform various actions like sending emails, adding users to the DB, etc.
* `models`
  * These are schemas for the various objects stored in the DB. We are using a MongoDB as our DB, as it maps well to JavaScript. The models include projects and users. 
* `routes`
  * This folder contains all the routers that serve pages. These routers include:
    * '/api' - serves requests to the GalleXy API.
    * '/auth' - serves pages that authenticate users.
    * '/' (INDEX) - main router, serves the main page, all other routers are relative to this one.
    * '/project' - serves project pages. This is what most of the users will be looking for.
    * '/user' - serves user pages. These are pages with information about users, and where users can manage their projects.

## Starting up GalleXy

1. Ensure that you have `node.js`, `npm` and `mongodb` installed. 
    * On debian based Linux, this is as simple as `$ sudo apt-get install nodejs npm mongodb`. 
2. Make sure to have cloned the repo: `$ git clone git@github.com:techx/gallexy.git` for SSH users or `$ git clone https://github.com/techx/gallexy.git`
3. Navigate to the directory in which you have cloned the repository. Once you're there, you will want to run `$ npm install` to install all the project dependencies.
4. You will want to create a `settings.js` file. This provides default configurations that the website will use for setup. An example of `settings.js` might look like this:
```JavaScript
module.exports = {
  mongoUri: "data",
  mongoHost:"mongodb://localhost/",
  winMachine: false, //changes the path to the directory that the database uses.
  port:3000,
  secret: "some_random_arrangement_of_symbols_that_is_a_private_key",
  admins: ['alvareza@mit.edu'],
  verificationExpiration: 86400000, // time in milliseconds
  mailTransporter: {
    // This mail transporter object is defined by the nodemailer spec that you can reference here:
    // https://nodemailer.com/about/
    // please don't include your actual password here. 
    }
  },
  https: false,
  appURL: 'localhost:3000', //relative to the outward facing internet, if using an http port, omit the port.
  devMode: true  //set if you want the app to not send emails and auto register people when the sign up, good for testing.
}
```
   * If I have time, I might create a script that auto generates one of these for you, and add it to the package.json
5. All your dependencies will be installed, assuming that you have followed all of these steps. `cd` into the `/server`folder and run the following command:
  * `$ gulp`
  Alternatively, you can run the mongo database at the location you want to serve the DB: `$ mongod --dbpath <path_to_db_here>`. Add an `&` at the end to run it in the background. Alternatively, you could open up a new screen or terminal instance and type in the following (in the `/server` folder): `$ npm start`.

6. If this doesn't work, or the program throws errors, I hope you know your way around an express app. Otherwise you could email the TechX dev-ops lead or email the original developer (alvareza@mit.edu) with a bug report including: 
  * The issue you are having.
  * What you expect the program to do.
  * What it actually did and/or an error stacktrace.
  * How you got the problem in the first place, if you can replicate it predictably.

## ROUTES
The project is broken up into 5 routers, each serving a different part of the app:

### INDEX
 Serves `GET` request to the main page.
* GET `/`
### API 
Serves various GalleXy APIs
 * GET `/api/ping`    - simple ping to the server
    * Expects: `{}`
    * Returns: `{"message":"pong"}`
 * GET `/api/suggest` - 
    * Expects: `{"query": String}`
    * Returns: A list of recommended searches.
    ```JSON
    {
      "results": [
        {"title":"title1"},
        {"title":"title2"},
        {"title":"title3"},
        {"title":"title4"},
        {"title":"title5"}]
    }
    ```
 * GET `/api/search`
    * Expects:
    ```JavaScript
    {
          "query": String,
          "filters": [{ projectType: String }, { projectOrder: String }],
          "quantity": Int,
          "ignore": [ProjectID]
    }
    ```
    * Returns: List of projects that you have searched for:s
    ```JavaScript
    [{
      picURL: String(URl),
      title: String,
      author: String,
      description: String,
      status: String,
      id: ProjectID,
      popularity: Int,
      lastChange: Date,
      projectType: String
    }]
    ```

### AUTHENTICATION
Authentication happens using the `passport.js` local strategy.
 * GET `/auth/signin` - serves page that lets users sign in.
 * GET `/auth/signup` - serves page that signs up new users.
 * POST `/auth/signup` - adds user to the DB, but in unaccessable mode. sends email to the user to verify that they are who they say they are.
 * POST `/auth/signin` - creates session and serializes user.
 * GET `/auth/signout` - deserializes user.
 * GET `/auth/verify` - verify the email and user using the time sensitive code sent to their email.
 * GET `signup2` - page alerting the user to the fact that an email was sent to them.
### PROJECT
Serves project pages. This is what most of the users will be looking for.
* GET `/project/?project=id` - serves page that corresponds to the project you were looking for.
* GET `/project/new` - serves form to create new projects.
* GET `/project/edit` - serves form to edit existing projects.
* GET `/project/update` - serves form to provide project updates.
* GET `/project/plan` - serves form that helps user plan out project.
  
### USER
Serves user pages. These are pages with information about users, and where users can manage their projects.
* GET `\user\account` - serves the account page of the user in question.
* GET `\user\account\edit` - provides a view for the user to edit their profile.
* POST `\user\account\edit` - form submission to update user's profile.
* GET `\user\profile?user=userID` - serves the outward facing page of the user in question.
* GET `\user\admin` - allows user to manage project data if they are an admin.
* GET `\user\account\email` - allows user to change their email
* GET `\user\account\password` - allows user to change password. Must go through email confirmation.
* POST `\user\account\delete` - deletes user account after confirmation
## CLIENT-SIDE HELPER FUNCTIONS
Here is a list of functions that are included on all pages since they are convienient.

changeColor - updates "GalleXy" color to new color.
renderColor - updates pages to render "GalleXy" color.

qsort - quick sort implementation

createDynamicTable - constructor for a dynamic table that is a JavaScript object tied down to a `<div>` that has been converted into a "dynamic table". this is an object that can generate it's own list structure of output (upon form submission). as well as dynamically check and adjust it's input size.
TODO: complete dynamic table implementation. Implemented for only one page, need to generalize implementation. 

## ACTIVE BUGS

You may want to look where ever there is a TODO or a BUG comment. That is the most likely pointers to bugs in the code.