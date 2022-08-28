//3rd Party Modules
const express = require("express");

//User Defined Modules
const controller = require("../controllers/User");
const auth = require("../middlewares/auth");

//Router Container
const router = express.Router();

// router.get("/login", controller.get);
router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/welcome", auth, controller.welcome);
// router.post("/welcome", controller.post);

module.exports = router;
