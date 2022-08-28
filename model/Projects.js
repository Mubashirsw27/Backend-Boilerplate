const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Projects = new Schema({
  projectName: { type: String, required: true },
  projectID: { type: String, unique: true, sparse: true },
  projectDescription: { type: String, required: true, unique: true },
  projectAdvisor: { type: String, default: null },
  uploadedBy: {
    type: String,
    required: true,
  },
  delete: { type: Boolean, default: false },
});
module.exports = mongoose.model("Projects", Projects);
