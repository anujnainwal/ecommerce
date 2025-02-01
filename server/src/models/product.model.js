import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      default: "inr",
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    modified_price: {
      type: Number,
      default: 0,
      min: 0,
    },
    stockQuantity: {
      type: Number,
      min: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
    },
    images: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "images",
      },
    ],
    discount: {
      type: Number,
      min: 0,
    },

    sizes: {
      small: {
        type: Number,
        default: 0,
      },
      medium: {
        type: Number,
        default: 0,
      },
      large: {
        type: Number,
        default: 0,
      },
      extraLarge: {
        type: Number,
        default: 0,
      },
      doubleXL: {
        type: Number,
        default: 0,
      },
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    updated_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        return ret;
      },
    },
  }
);
productSchema.index({ name: "text", description: "text" });

const ProductModel = mongoose.model("products", productSchema);

export default ProductModel;
