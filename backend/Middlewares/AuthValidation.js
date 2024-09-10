const Joi = require('joi');

const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required().messages({
      'string.base': 'Username should be a type of text',
      'string.empty': 'Username cannot be empty',
      'string.min': 'Username should have a minimum length of 3',
      'string.max': 'Username should have a maximum length of 50',
      'any.required': 'Username is required'
    }),
    email: Joi.string().email().required().messages({
      'string.base': 'Email should be a type of text',
      'string.empty': 'Email cannot be empty',
      'string.email': 'Email must be a valid email',
      'any.required': 'Email is required'
    }),
    password: Joi.string().min(8).max(50).pattern(new RegExp('^(?=.*[A-Z])(?=.*[!@#$%^&*])')).required().messages({
      'string.base': 'Password should be a type of text',
      'string.empty': 'Password cannot be empty',
      'string.min': 'Password should have a minimum length of 8',
      'string.max': 'Password should have a maximum length of 50',
      'string.pattern.base': 'Password must contain at least one uppercase letter and one special character',
      'any.required': 'Password is required'
    }),
  });

  const { error } = schema.validate(req.body)

  if (error) {
    return res.status(400).json({ error: error.details[0].message })
  }
  next()
}

const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      'string.base': 'Email should be a type of text',
      'string.empty': 'Email cannot be empty',
      'string.email': 'Email must be a valid email',
      'any.required': 'Email is required'
    }),
    password: Joi.string().required().messages({
      'string.base': 'Password should be a type of text',
      'string.empty': 'Password cannot be empty',
      'any.required': 'Password is required'
    }),
  });

  const { error } = schema.validate(req.body)

  if (error) {
    return res.status(400).json({ error: error.details[0].message })
  }
  next()
}

module.exports = {
  signupValidation,
  loginValidation
}