const User = require("../models/mongodb/User");
const loginValidation = require("./Joi/loginValidation");
const registerValidation = require("./Joi/registerValidation");
const updateValidation = require("./Joi/updateValidation");
require("dotenv").config();
//testtest
const VALIDATOR = process.env.VALIDATOR;

const validateRegistertion = (user) => {
  if (VALIDATOR === "Joi") {
    const { error } = registerValidation(user);
    if (error) return error.details.map((detail) => detail.message);
    return "";
  }
};

const validateLogin = (user) => {
  if (VALIDATOR === "Joi") {
    const { error } = loginValidation(user);
    console.log(error);
    if (error) return error.details.map((detail) => detail.message);
    return "";
  }
};

const validateUpdateUser = (user) => {
  if (VALIDATOR === "Joi") {
    const { error } = updateValidation(user);
    if (error) return error.details.map((detail) => detail.message);
    return "";
  }
};

module.exports = { validateLogin, validateRegistertion, validateUpdateUser };
