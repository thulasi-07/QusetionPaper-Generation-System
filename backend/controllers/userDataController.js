import { asyncHandler } from "../middlewares/asyncHandler.js";
import { User } from "../models/dbmodels.js";

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("name email role");

  if (!users || users.length === 0) {
    return res.status(404).json({ message: "No users found" });
  }

  res.status(200).json({ users });
});

const signupUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({ name, email, password });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
});

const getUserDetails = asyncHandler(async (req, res) => {
  const userId = req.userId; // Extract userId from middleware

  if (!userId) {
    return res
      .status(401)
      .json({ message: "Unauthorized: No user ID provided" });
  }

  const user = await User.findById(userId).select("name role"); // Fetch user details

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({ user });
});

export { signupUser, getAllUsers, getUserDetails };
