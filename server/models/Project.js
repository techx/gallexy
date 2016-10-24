var mongoose = require('mongoose');
var User = require('./User');

var projectSchema = mongoose.Schema({
    name: { type: String, required: true },
    visibility: { type: String }, // one of: team, mit, public; default to team
    public: {
        team: [{ type: String }], // list of valid emails
        teamDescription: { type: String },
        projectPitch: { type: String },
        projectDescription: { type: String },
    },
    private: {
        primary: { type: String }, // valid email, should be on team
        budgetAmount: { type: Number },
        budgetUsed: { type: Number },
        budgetBreakdown: { type: String },
        otherFunding: { type: String },
        timeline: { type: String },
        point: { type: String }, // valid email, should be admin
        batch: { type: String },
        status: { type: String }
    },
    admin: {
        comments: { type: String }
    }
});

projectSchema.statics.validate = function (project, cb) {
    // TODO
    // Primary is valid email on team
    // Point is valid email for admin
    // budgetAmount <= max funding for semester?
    // status is one of 'pending', 'funded', 'complete'?
    cb(true);
}

module.exports = mongoose.model('Project', projectSchema);
