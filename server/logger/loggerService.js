const morganLogger = require("./morgan/morganLogger");
require("dotenv").config();
//testtest
const logger = process.env.LOGGER;

const loggerMiddleware = () => {
  if (logger === "morgan") {
    return morganLogger;
  }
};

module.exports = loggerMiddleware;
