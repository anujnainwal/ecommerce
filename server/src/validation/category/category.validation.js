import Joi from "joi";

const create_category_schema = Joi.object({
  name: Joi.string().required().min(3).max(50).required(),
});

export { create_category_schema };
