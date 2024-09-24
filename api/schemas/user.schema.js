const Joi = require('joi');

const id = Joi.number();
const email = Joi.string().email();
const password = Joi.string()
        .alphanum()
        .min(5)
        .max(30)
        .required();
const role =Joi.string().min(5);


const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role: role.required(),
});

const updateUserSchema = Joi.object({
  // email: email.required(),
  password: password.required(),
  role: role,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };
