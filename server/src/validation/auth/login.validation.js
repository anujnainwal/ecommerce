import Joi from "joi";

const loginSchema = Joi.object({
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
  rememberMe: Joi.boolean().optional().default(false),
});

export default loginSchema;
