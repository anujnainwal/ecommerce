import Joi from "joi";

const createProductValidation = Joi.object({
  name: Joi.string().required().min(3).trim(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  stockQuantity: Joi.number().optional().positive(),
  category_id: Joi.string().required(),
  brand_id: Joi.string().required(),
  //   specifications: Joi.object().required(),
  colorCode: Joi.string().optional(),
  colorName: Joi.string().optional(),
  small: Joi.number().optional(),
  medium: Joi.number().optional(),
  large: Joi.number().optional(),
  extraLarge: Joi.number().optional(),
  extraExtraLarge: Joi.number().optional(),
  extraExtraExtraLarge: Joi.number().optional(),
  extraExtraExtraExtraLarge: Joi.number().optional(),
});

export { createProductValidation };
