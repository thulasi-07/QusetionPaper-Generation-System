import { asyncHandler } from "../middlewares/asyncHandler.js";
import { Subject } from "../models/dbmodels.js";

const addSubject = asyncHandler(async (req, res) => {
    const { subjectName, subjectCode, course, year } = req.body;

    if (!subjectName || !subjectCode || !year) {
        return res.status(400).json({ message: "Please provide all required fields" });
    }

    const subjectExists = await Subject.findOne({ subjectCode });
    if (subjectExists) {
        return res.status(400).json({ message: "Subject with this code already exists" });
    }

    const subject = await Subject.create({ subjectName, subjectCode, course, year });

    res.status(201).json(subject);
});

const getAllSubjects = asyncHandler(async (req, res) => {
    const subjects = await Subject.find();

    if (!subjects || subjects.length === 0) {
        return res.status(404).json({ message: "No subjects found" });
    }

    res.status(200).json({ subjects });
});

const deleteSubject = asyncHandler(async (req, res) => {
    const { subjectCode } = req.params;

    const subject = await Subject.findOneAndDelete({ subjectCode });
    if (!subject) {
        return res.status(404).json({ message: "Subject not found" });
    }

    res.status(200).json({ message: "Subject deleted successfully" });
});

export { addSubject, getAllSubjects, deleteSubject };
