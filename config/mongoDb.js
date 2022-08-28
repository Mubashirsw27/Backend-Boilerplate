require("./dotEnv");

const mongoose = require("mongoose");

mongoose
  .connect(process.env.URL)
  .then((response) => {
    console.log("Database is Connected");
  })
  .catch((err) => {
    console.log(err);
  });
