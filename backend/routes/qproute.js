import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  addSubject,
  deleteSubject,
  getAllSubjects,
} from "../controllers/subjectController.js";
import {
  addQuestion,
  getAllQuestionSets,
} from "../controllers/questionController.js";
import { generateQuestionPaper } from "../controllers/generateQpController.js";

const qprouter = express.Router();

qprouter
  .route("/subject")
  .post(authMiddleware, addSubject)
  .get(authMiddleware, getAllSubjects)
  .delete(authMiddleware, deleteSubject);
qprouter
  .route("/questions")
  .post(authMiddleware, addQuestion)
  .get(authMiddleware, getAllQuestionSets);
qprouter.route("/generateqp").post(authMiddleware, generateQuestionPaper);

export default qprouter;
