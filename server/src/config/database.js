import mongoose from "mongoose";

const connectionDatabase = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectionDatabase;
