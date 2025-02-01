import mongoose from "mongoose";

let cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: false,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
          min: [1, "Quantity must be at least 1."],
        },
        price: {
          type: Number,
          required: true,
        },
        addAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    totalPrice: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

//Cart Items
cartSchema.pre("save", function (next) {
  let totalPrice = 0;
  this.items.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });
  this.totalPrice = totalPrice;
  next();
});

let CartItems = mongoose.model("cart-items", cartSchema);

export default CartItems;
