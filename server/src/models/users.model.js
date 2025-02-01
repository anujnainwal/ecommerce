import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },

    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false, // Do not return password in response
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    loginHistory: [
      {
        timestamp: {
          type: Date,
          default: Date.now,
        },
        location: {
          ip: String, // Store IP address
          country: String, // Optional: Add country if using a geo-location service
          city: String, // Optional: Add city if using a geo-location service
          coordinates: {
            latitude: Number,
            longitude: Number,
          },
        },
      },
    ],
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

// Pre-save hook for password hashing
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const UsersModel = mongoose.model("users", userSchema);

export default UsersModel;
