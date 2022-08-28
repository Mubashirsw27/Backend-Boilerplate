const bodyParser = require("body-parser"); //Middlewares
const morgan = require("morgan"); //Middlewares

module.exports = {
  morgan: morgan("tiny"),
  bodyParser: bodyParser.json(),
};
