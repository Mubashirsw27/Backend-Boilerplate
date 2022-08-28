const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;
const User = new Schema({
  fullName: { type: String, required: true },
  rollNumber: { type: String, unique: true, sparse: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Please enter a valid E-mail!");
      }
    },
  },
  password: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isLength(value, { min: 6, max: 1000 })) {
        throw new Error("Please enter a valid Password!");
      }
    },
  },
  mobileNumber: { type: String, required: true, unique: true },
  userType: {
    type: String,
    required: true,
    enum: ["Teacher", "Student", "Industry Leader"],
  },
  deleteUser: { type: Boolean, default: false },
  token: { type: String, required: true, unique: true },
});
module.exports = mongoose.model("User", User);
