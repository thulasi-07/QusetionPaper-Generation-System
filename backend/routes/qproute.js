import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { addSubject } from "../controllers/subjectController.js";
import { addQuestion } from "../controllers/questionController.js";
import { generateQuestionPaper } from "../controllers/generateQpController.js";

const qprouter = express.Router();

qprouter.route("/subject").post(authMiddleware,addSubject);
qprouter.route("/question").post(authMiddleware,addQuestion);
qprouter.route("/generateqp").get(authMiddleware,generateQuestionPaper);


export default qprouter;
