// ... Imported Libraries
require("../config/dotEnv");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


//Register API
exports.register = async (req, res) => {
  // Our register logic starts here
  try {
    // Get user input
    const {
      fullName,
      rollNumber,
      email,
      password,
      mobileNumber,
      userType,
      deleteUser,
    } = req.body;

    // Validate user input
    if (!(email && password && fullName && mobileNumber && userType)) {
      res.status(400).send("All inputs are required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 12);

    // Create user in our database
    const user = await User.create({
      fullName,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
      mobileNumber,
      userType,
      deleteUser,
      rollNumber,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (error) {
    if (error.name === "ValidationError") {
      let errors = {};

      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });

      return res.status(401).send(errors);
    } else if (error.name === "MongoServerError") {
      console.log("Error due to => ", error.keyPattern);
      if (error.keyValue.rollNumber) {
        return res.status(409).send("Roll Number already Available");
      } else if (error.keyPattern.mobileNumber) {
        return res.status(409).send("Mobile Number already Available");
      }
    }
  }
  // Our register logic ends here
};

// ...Regiser API ENDS



// ...Login API

exports.login = async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email: email.toLowerCase() });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user

      return res.status(200).json(user);
    }

    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
};

// ...

exports.welcome = (req, res) => {
  res.status(200).send("Welcome 🙌 ");
};
