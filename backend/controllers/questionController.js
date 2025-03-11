import { asyncHandler } from "../middlewares/asyncHandler.js";
import { Subject } from "../models/dbmodels.js";
import { QuestionSet } from "../models/dbmodels.js";


const addQuestion = asyncHandler(async (req, res) => {
    const { subjectCode, year, questionText, co, llo, bL, po, marks } = req.body;

    if (!subjectCode || !year || !questionText || !co || !llo || !bL || !po || !marks) {
        return res.status(400).json({ message: "Please provide all required fields" });
    }

    const subject = await Subject.findOne({ subjectCode, year });
    if (!subject) {
        return res.status(404).json({ message: "Subject not found" });
    }

    let questionSet = await QuestionSet.findOne({ subjectId: subject._id });
    
    if (!questionSet) {
        questionSet = new QuestionSet({ subjectId: subject._id, twoMarksQuestions: [], tenMarksQuestions: [] });
    }

    const newQuestion = { questionText, co, llo, bL, po };

    if (marks === 2) {
        questionSet.twoMarksQuestions.push(newQuestion);
    } else if (marks === 10) {
        questionSet.tenMarksQuestions.push(newQuestion);
    } else {
        return res.status(400).json({ message: "Invalid marks. Only 2 or 10 allowed." });
    }

    await questionSet.save();

    res.status(201).json({ message: "Question added successfully", questionSet });
});

//get all question

const getAllQuestionSets = asyncHandler(async (req, res) => {
    const questionSets = await QuestionSet.find().populate("subjectId");

    if (!questionSets || questionSets.length === 0) {
        return res.status(404).json({ message: "No question sets found" });
    }

    res.status(200).json({ questionSets });
});

export {addQuestion,getAllQuestionSets}
