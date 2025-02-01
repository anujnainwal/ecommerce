import Joi from "joi";

const Brand_Validation = Joi.object({
  name: Joi.string().required().min(3).max(50).trim(),
});

export { Brand_Validation };
