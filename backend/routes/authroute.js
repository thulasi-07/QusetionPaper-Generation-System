import express from "express";
import { signin } from "../controllers/authcontoller.js";
import {  getAllUsers, signupUser } from "../controllers/userDataController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/signin").post(signin);
router.route("/signup").post(signupUser);
router.route("/getUserDetails").get(getAllUsers);
router.route("/users").get(authMiddleware, getAllUsers)

export default router;
