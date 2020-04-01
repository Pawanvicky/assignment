//Validation
const Joi = require('@hapi/joi');

//Register Validation
const registerValidation = data => {
  const schema = {
    name: Joi.string()
      .min(6)
      .required(),
    contact: Joi.string()
      .min(10)
      .max(10)
      .required(),  
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    username: Joi.string()
      .min(6)
      .required(),
    password: Joi.string()
      .min(6)
      .required(),
    userrole: Joi.number()
      .max(3),
    status: Joi.string()
  };
  return Joi.validate(data, schema);
};

//Login Validation
const loginValidation = data => {
  const schema = {
    username: Joi.string()
      .min(6)
      .required(),
    password: Joi.string()
      .min(6)
      .required()
  };
  return Joi.validate(data, schema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;