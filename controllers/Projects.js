require("../config/dotEnv");
const Projects = require("../model/Projects");

exports.postproject = async (req, res) => {
  try {
    const {
      projectName,
      projectID,
      projectDescription,
      projectAdvisor,
      uploadedBy,
    } = req.body;

    if (!(projectName && projectDescription && projectAdvisor && uploadedBy)) {
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
    }
  }
};
