import mongoose from "mongoose";

const address_Schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    locality: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    landmark: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    address: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
    city: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    state: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    country_code: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 10,
    },
    country: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    zip: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 10,
      // min: 1000,
      // max: 99999,/
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
      unique: true,
      validate: {
        validator: (v) => /\d{10}/.test(v),
        message: "Invalid phone number format.",
      },
    },
    phoneNumber2: {
      type: String,
      trim: true,
      maxlength: 20,
      unique: true,
      validate: {
        validator: (v) => /\d{10}/.test(v),
        message: "Invalid phone number format.",
      },
    },
    addressType: {
      type: String,
      required: true,
      enum: ["home", "work", "other"],
      default: "home",
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const AddressModel = new mongoose.model("addressess", address_Schema);

export default AddressModel;
