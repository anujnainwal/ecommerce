import Joi from "joi";

const register_address_validation = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .regex(/^[a-zA-Z\s]+$/)
    .required()
    .messages({
      "string.base": "Name must be a string.",
      "string.empty": "Name cannot be empty.",
      "string.min": "Name must be at least 3 characters long.",
      "string.max": "Name cannot exceed 50 characters.",
      "string.pattern.base": "Name can only contain alphabets and spaces.",
      "any.required": "Name is required.",
    }),

  phoneNumber: Joi.string()
    .pattern(/^\d{10}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone number must be exactly 10 digits.",
      "any.required": "Phone number is required.",
    }),

  phoneNumber2: Joi.string()
    .pattern(/^\d{10}$/)
    .optional()
    .allow("")
    .messages({
      "string.pattern.base":
        "Alternate phone number must be exactly 10 digits.",
    }),

  address: Joi.string().min(5).max(100).required().messages({
    "string.min": "Address must be at least 5 characters long.",
    "string.max": "Address cannot exceed 100 characters.",
    "any.required": "Address is required.",
  }),

  locality: Joi.string().min(3).max(50).optional().allow("").messages({
    "string.min": "Locality must be at least 3 characters long.",
    "string.max": "Locality cannot exceed 50 characters.",
  }),

  landmark: Joi.string().min(3).max(50).optional().allow("").messages({
    "string.min": "Landmark must be at least 3 characters long.",
    "string.max": "Landmark cannot exceed 50 characters.",
  }),

  city: Joi.string().min(3).max(50).required().messages({
    "string.min": "City must be at least 3 characters long.",
    "string.max": "City cannot exceed 50 characters.",
    "any.required": "City is required.",
  }),

  state: Joi.string().min(2).max(50).required().messages({
    "string.min": "State must be at least 2 characters long.",
    "string.max": "State cannot exceed 50 characters.",
    "any.required": "State is required.",
  }),

  zip: Joi.string()
    .pattern(/^\d{5,10}$/)
    .required()
    .messages({
      "string.pattern.base": "ZIP code must be between 5 and 10 digits.",
      "any.required": "ZIP code is required.",
    }),

  country: Joi.string()
    .min(2)
    .max(50)
    .regex(/^[a-zA-Z\s]+$/)
    .required()
    .messages({
      "string.base": "Country must be a string.",
      "string.empty": "Country cannot be empty.",
      "string.min": "Country must be at least 2 characters long.",
      "string.max": "Country cannot exceed 50 characters.",
      "string.pattern.base": "Country can only contain alphabets and spaces.",
      "any.required": "Country is required.",
    }),
  addressType: Joi.string().required().valid("Home", "Work"),
});

export { register_address_validation };
