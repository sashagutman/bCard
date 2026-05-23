const Joi = require("joi");

const updateValidation = (user) => {
  const schema = Joi.object({
    name: Joi.object({
      first: Joi.string().min(2).max(256).required(),
      middle: Joi.string().allow(""),
      last: Joi.string().min(2).max(256).required(),
    }),
    phone: Joi.string().min(9).max(15).required(),
    email: Joi.string().email(),
    image: Joi.object({
      url: Joi.string().uri().allow(""),
      alt: Joi.string().allow(""),
    }),
    address: Joi.object({
      state: Joi.string().allow(""),
      country: Joi.string().required(),
      city: Joi.string().required(),
      street: Joi.string().required(),
      houseNumber: Joi.number().required(),
      zip: Joi.number().allow(null, ""),
    }),
  });

  return schema.validate(user);
};

module.exports = updateValidation;
