import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    originalname: {
      type: String,
      required: false,
    },
    modified_title: {
      type: String,
      default: null,
    },
    imageUrl: {
      type: String,
      required: false,
    },
    fileSize: {
      type: Number,
      required: false,
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

const CategoryModel = mongoose.model("categories", categorySchema);

export default CategoryModel;
