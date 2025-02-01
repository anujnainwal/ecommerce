import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    logo: {
      title: {
        type: String,
        required: true,
      },
      modified_title: {
        type: String,
        required: true,
      },
      path: {
        type: String,
        required: true,
      },
      size: {
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
  }
);

const BrandsModel = mongoose.model("brands", brandSchema);

export default BrandsModel;
