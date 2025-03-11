import jwt from "jsonwebtoken";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import {User} from "../models/dbmodels.js";

const JWT_SECRET = "123456";

const signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Email and password are required" });
  }

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return res.status(404).json({ msg: "User doesn't exist" });
  }

  if (existingUser.password === password) {
    const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET);

    return res.status(200).json({
      token,
      message: "Login successful",
    });
  }

  return res.status(401).json({ message: "Incorrect password" });
});


export { signin };