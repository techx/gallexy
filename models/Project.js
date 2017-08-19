var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// TODO make sure the timeline elements have URLS arrays to images
// TODO creat ENUM for project type **IMPORTANT**

var projectSchema = Schema({
  about: {
    dateStarted: {type: Date, required: true, default: Date.now},
    projectType: {type: String, enum: ['PROJX', 'HACKMIT', 'THINK', 'MAKEMIT'], required: true},
    creator: {type: Schema.Types.ObjectId, required: true},
    team: [{type: Schema.Types.ObjectId, required: false}],
    teamPermissions: {type: String, enum: ['NONE', 'EDIT', 'ADMIN'], default: 'NONE'},
    title: {type: String, required: true},
    description: {type: String, required: true},
    brief: {type: String, required: true},
    visible: {type: Boolean, required: true}
  },
  planning: {
    milestones: [{
      goal: {type: String, required: true},
      state: {type: String, enum: ['PENDING','COMPLETE','UNSUCCESFUL'], required: true},
      date: {type: Date, required: true},
      notes: {type: String, required: false}
    }],
    plannedBudget: {
      total: {type: Number, required: true, default: 0},
      items: [{
        item: {type: String, required: true},
        notes: {type: String, required: false},
        cost: {type: Number, required: true}
      }]
    }
  },
  status: {
    estimatedProgress: {type: Number, default: 0, required: true},
    achieved: {type: String, enum: ['PENDING', 'COMPLETE', 'UNSUCCESFUL'], required: true},
    reflection: {type: String, required: false},
    timeline: [{

    }],
    actualBudget: {
      total: {type: Number, required: true, default: 0},
      items: [{
        item: {type: String, required: true},
        notes: {type: String, required: false},
        cost: {type: Number, required: true}
      }]
    }
  },
  meta: {
    views: {type: Number, default: 0}   //TODO: update whenever project is viewed
  }
});

/**
* Since the project ID is the only thing that's unique about the project, find that Project and return it to the callback
* @param err {Error} - If error passed to this function, then pass to next middleware
* @param projectID {string} - used to identify the project
* @param next {function} - call next middleware in the stack
*/

projectSchema.statics.getProject = function(err, projectID, next) {
  if (err) {
    next(err);
  } else {
    Project.findById(projectID, function(err, project) {
      if (err) {
        next(err);
      } else if (project == null) {
        next('User not found');
      } else {
        next(null, project);
      }
    });
  }
};

/**
* create and store a new project with the following properties in the DB
* @param err {Error} - If error passed to this function, then pass to next middleware
* @param project {object} - new JSON to be created
* @param next {function} - call next middleware in the stack
*/

projectSchema.statics.createProject = function(err, project, next) {
  if (err) {
    next(err);
  } else {
    var newProject = new Project(project);
    newProject.save(function (err) {
      if (err) {
        next('Error saving project: ' + err);
      } else {
        next(null, newProject);
      }
    });
  }
};

/**
* update all the fields of a project
* @param err {Error} - If error passed to this function, then pass to next middleware
* @param projectID {string} - ID of the original project
* @param project {object} - New object to update into that save
* @param next {function} - call next middleware in the stack
*/

projectSchema.statics.updateProject = function(err, projectID, project, next) {
  if (err) {
    next(err);
  } else {
    Project.getProject(null, projectID, function (err, oldProject) {
      if (err) {
        next(err);
      } else {
        for (field in Project.schema.paths) {
          oldProject[field.split(".")[0]] = project[field.split(".")[0]];
        };
        oldUser.save(function (err) {
          if (err) next('Error saving user: ' + err);
          else next(null, oldUser);
        });
      }
    });
  }
};

var Project = mongoose.model('Project', projectSchema);
module.exports = Project;
