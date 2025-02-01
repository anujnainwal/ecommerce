import Joi from "joi";

const CartItemValidation = Joi.object({
  cartItems: Joi.array().items({
    productId: Joi.string().min(1).max(50).trim().required(),
    quantity: Joi.number().positive().required(),
    price: Joi.number().positive().required(),
  }),
});

const updateCartItemsValidation = Joi.object({
  cartId: Joi.string().min(1).max(50).trim().required(),
  productId: Joi.string().min(1).max(50).trim().required(),
  quantity: Joi.number().positive().required(),
  price: Joi.number().optional(),
});

export { CartItemValidation, updateCartItemsValidation };
