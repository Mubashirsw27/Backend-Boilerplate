require("../config/dotEnv");
const Projects = require("../model/Projects");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.postproject = async (req, res) => {
  try {
    const {
      projectName,
      projectID,
      projectDescription,
      projectAdvisor,
      uploadedBy,
    } = req.body;

    if (
      !(
        projectName &&
        projectID &&
        projectDescription &&
        projectAdvisor &&
        uploadedBy
      )
    ) {
      console.log(
        projectName,
        projectID,
        projectDescription,
        projectAdvisor,
        uploadedBy
      );
      return res.status(401).send("All inputs are required");
    }

    const oldProject = await Projects.findOne({ projectID });
    if (oldProject) {
      return res.status(409).send("Project with similar ID exists");
    }

    const project = await Projects.create({
      projectID,
      projectName,
      projectDescription,
      projectAdvisor,
      uploadedBy,
    });

    res.status(201).send(project);
  } catch (err) {
    if (err.name === "ValidationError") {
      let errors = {};

      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });

      return res.status(401).send(errors);
    } else if (err.name === "MongoServerError") {
      console.log("Error due to => ", err.keyPattern);
      // if (error.keyValue.rollNumber) {
      //   return res.status(409).send("Roll Number already Available");
      // } else if (error.keyPattern.mobileNumber) {
      //   return res.status(409).send("Mobile Number already Available");
      // }
    }
  }
};
