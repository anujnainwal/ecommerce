import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    orderItems: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      default: 0,
    },
    orderStatus: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    deliveryAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "addresses",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

orderSchema.pre("save", async function (next) {
  const order = this;

  order.totalAmount = order.orderItems.reduce((sum, item) => {
    return sum + item.quantity * item.price;
  }, 0);
});

const OrderModel = mongoose.model("orders", orderSchema);

export default OrderModel;
