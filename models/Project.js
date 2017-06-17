var mongoose = require('mongoose');

var projectSchema = mongoose.Schema({
  title:{type: String, required: true},
  quickDescription: {type: String, required: true},
  description:{type: String, required: true},
  owners: [{type: String}], //store emails
  timeline: [{
    name: {type: String, required: true},
    time: {type: Date, required: true, default: Date.now}
  }],
  budget: [{
    item: {type: String, required: true},
    cost: {type: Number, required: true}
  }]
});

/**
* Since the project ID is the only thing that's unique about the project, find that Project and return it to the callback
* @param err {Error} - If error passed to this function, then pass to next middleware
* @param projectID {Schema.Types.ObjectId} - used to identify the project
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
    var newProject = new User(project);
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
* @param projectID {Schema.Types.ObjectId} - ID of the original project
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
