import Joi, { ObjectSchema } from 'joi';

export const registerValidation: ObjectSchema = Joi.object({
  username: Joi.string()
    .pattern(/^[A-Za-z]+(\s[A-Za-z]+)*$/)
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.empty': 'Username is required',
      'string.min': 'Username must be at least 3 characters long',
      'string.max': 'Username cannot exceed 50 characters',
      'string.pattern.base': "Username can only contain letters and spaces (e.g., 'John Doe')",
      'any.required': 'Username is required',
    }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': 'Invalid email format',
      'string.empty': 'Email is required',
      'any.required': 'Email is required',
    }),

  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)
    .required()
    .messages({
      'string.empty': 'Password is required',
      'string.pattern.base':
        'Password must include at least one uppercase, one lowercase, one number, one special character, and be at least 6 characters long',
      'any.required': 'Password is required',
    }),

  role: Joi.string().valid('user', 'admin').default('user').messages({
    'any.only': "Role must be either 'user' or 'admin'",
  }),

  age: Joi.number().min(18).max(120).optional().messages({
    'number.base': 'Age must be a number',
    'number.min': 'Age must be at least 18',
    'number.max': 'Age cannot exceed 120',
  }),
}).options({
  abortEarly: false, // show all errors, not just first one
  allowUnknown: true, // ignore extra fields instead of throwing error
});
