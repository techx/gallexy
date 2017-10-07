const mongoose = require('mongoose'),
      Schema = mongoose.Schema;


const projectSchema = Schema({
  about: {
    dateStarted: {type: Date, required: true, default: Date.now},
    projectType: {type: String, enum: ['PROJX', 'HACKMIT', 'THINK', 'MAKEMIT'], required: true},
    creator: {type: Schema.Types.ObjectId, required: true},
    team: [{
      teammate_id: {type: Schema.Types.ObjectId},
      permissionLevel: {type: String, enum: ['NONE', 'EDIT', 'ADMIN'], default: 'NONE' }
    }],
    
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
      //TODO: Figure out how to store all the necesary things for this timeline.
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

projectSchema.statics.getProject = (projectID, next) => {
  Project.findById(projectID, (err, project) => {
    if (err) {
      next(err);
    } else if (project == null) {
      next('User not found');
    } else {
      next(null, project);
    }
  });
};

projectSchema.statics.createProject = (project, next) => {
  let newProject = new Project(project);
  newProject.save((err) =>  {
    if (err) {
      next('Error saving project: ' + err);
    } else {
      next(null, newProject);
    }
  });
};

projectSchema.statics.updateProject = (projectID, project, next) => {
  Project.getProject(projectID, (err, oldProject) => {
    if (err) {
      next(err);
    } else {
      for (field in Project.schema.paths) {
        oldProject[field.split(".")[0]] = project[field.split(".")[0]];
      };
      oldUser.save((err) => {
        if (err) next('Error saving user: ' + err);
        else next(null, oldUser);
      });
    }
  });
};

let Project = mongoose.model('Project', projectSchema);
module.exports = Project;
