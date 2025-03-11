import mongoose from "mongoose";
import { mongoUrl } from "../utils/user.js";

const connectDb = async () => {
  try {
    await mongoose.connect(mongoUrl);
    console.log("conneted to db...");
  } catch (error) {
    console.log(error.message);
  }
};

export { connectDb };
