import Joi from "joi";

const Brand_Validation = Joi.object({
  name: Joi.string().required().min(2).max(50).trim(),
  description: Joi.string(),
});

export { Brand_Validation };
