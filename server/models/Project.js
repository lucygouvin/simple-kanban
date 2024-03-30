const { Schema, model } = require("mongoose");

const projectSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  boardArray:[{
    type: Schema.Types.ObjectId,
    ref: 'Board',
  }],
},
{ timestamps: true },
);

const Project = model('Project', projectSchema);
module.exports = Project;