import Joi from "joi";

const registerSchema = Joi.object({
  firstname: Joi.string()
    .pattern(/^[a-zA-Z\s]+$/)
    .min(3)
    .max(30)
    // .required()
    .optional()
    .trim()
    .messages({
      "string.pattern.base": "First name can only contain letters and spaces.",
      "string.min": "First name must be at least 3 characters long.",
      "string.max": "First name can be at most 30 characters long.",
      "any.required": "First name is required.",
    }),

  lastname: Joi.string()
    .pattern(/^[a-zA-Z\s]+$/)
    .min(3)
    .max(30)
    .optional()
    .trim()
    .messages({
      "string.pattern.base": "Last name can only contain letters and spaces.",
      "string.min": "Last name must be at least 3 characters long.",
      "string.max": "Last name can be at most 30 characters long.",
      "any.required": "Last name is required.",
    }),

  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .lowercase()
    .required()
    .trim()
    .messages({
      "string.alphanum": "Username can only contain letters and numbers.",
      "string.min": "Username must be at least 3 characters long.",
      "string.max": "Username can be at most 30 characters long.",
      "string.lowercase": "Username must be lowercase.",
      "any.required": "Username is required.",
    }),

  email: Joi.string()
    .email({
      tlds: { allow: false },
    })
    .trim()
    .lowercase()
    .required()
    .messages({
      "string.email": "Invalid email format.",
      "string.lowercase": "Email must be in lowercase.",
      "any.required": "Email is required.",
    }),

  password: Joi.string().min(8).max(30).required().trim().messages({
    "string.min": "Password must be at least 8 characters long.",
    "string.max": "Password can be at most 30 characters long.",
    "any.required": "Password is required.",
  }),
});

export default registerSchema;
