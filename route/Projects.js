//3rd Party Modules
const express = require("express");

//User Defined Modules
const controller = require("../controllers/Projects");
const auth = require("../middlewares/auth");

//Router Container
const router = express.Router();

router.post("/postproject", controller.postproject);

module.exports = router;
