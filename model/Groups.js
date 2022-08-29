const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Groups = new Schema({
  groupID: { type: String, required: true },
  groupsMembers: { type: [String],},
  bids: { type: [String], required: true, unique: true },
  projectAdvisor: { type: String, default: null },
  uploadedBy: {
    type: String,
    required: true,
  },
  delete: { type: Boolean, default: false },
});
module.exports = mongoose.model("Groups", Groups);
