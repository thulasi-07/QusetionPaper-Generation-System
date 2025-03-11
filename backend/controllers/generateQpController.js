import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {Subject,QuestionSet,QuestionPaper} from "../models/dbmodels.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generateQuestionPaper = async (req, res) => {
  try {
    const { subjectId, maxMarks } = req.body;
    const course = "Master of Computer Application";
    const exportFormat = "PDF";
    const userId = req.userId;

    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    const existingFilePath = path.join(
      __dirname,
      "../questionPapers",
      `QuestionPaper_${subject.code}_${maxMarks}.pdf`
    );
    if (fs.existsSync(existingFilePath)) {
      return res.download(existingFilePath);
    }

    const questionSets = await QuestionSet.find({ subjectId });
    let twoMarkQuestions = [],
        tenMarkQuestions = [];

    questionSets.forEach((set) => {
      set.questionData.forEach((q) => {
        if (q.questionMark === "2-marks") twoMarkQuestions.push(q);
        if (q.questionMark === "10-marks") tenMarkQuestions.push(q);
      });
    });

    // Shuffle questions to avoid repetition
    const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
    twoMarkQuestions = shuffleArray(twoMarkQuestions);
    tenMarkQuestions = shuffleArray(tenMarkQuestions);

    const selectedTwoMarks = twoMarkQuestions.slice(0, maxMarks === 100 ? 10 : 5);
    const selectedTenMarks = tenMarkQuestions.slice(0, maxMarks === 100 ? 8 : 4);

    const requiredModules = maxMarks === 100 ? [1, 2, 3, 4] : [1, 2];
    let moduleQuestions = requiredModules.map((moduleNo) => ({
      moduleNo,
      questions: selectedTenMarks.splice(0, 2),
    }));

    const questionPapersDir = path.join(__dirname, "../questionPapers");
    if (!fs.existsSync(questionPapersDir)) {
      fs.mkdirSync(questionPapersDir, { recursive: true });
    }

    const filePath = path.join(
      questionPapersDir,
      `QuestionPaper_${subject.code}_${maxMarks}.pdf`
    );
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    doc.fontSize(16).text("ST JOSEPH ENGINEERING COLLEGE, MANGALURU", { align: "center" });
    doc.fontSize(12).text(course, { align: "center" });
    doc.text(`Subject: ${subject.name} (${subject.code})`, { align: "center" });
    doc.text(`Duration: ${maxMarks === 100 ? "3 Hrs" : "1.5 Hrs"}  |  Maximum Marks: ${maxMarks}`, { align: "center" });

    doc.moveDown();
    doc.text("USN: ___________________________", { align: "right" });
    doc.moveDown(2);

    doc.text("Note:", { underline: true });
    doc.text("1. Answer all questions.");
    doc.moveDown();

    doc.text("PART-A (2 Marks Questions)", { underline: true, bold: true });
    selectedTwoMarks.forEach((q, i) => {
      doc.text(`${i + 1}. ${q.questionText}`);
    });

    doc.moveDown();
    doc.text("PART-B (10 Marks Questions)", { underline: true, bold: true });
    moduleQuestions.forEach((mod, index) => {
      doc.text(`Module ${mod.moduleNo}:`);
      mod.questions.forEach((q, qIndex) => {
        doc.text(`${index * 2 + qIndex + 1}. ${q.questionText}`);
      });
      doc.moveDown();
    });

    doc.end();

    const newQuestionPaper = new QuestionPaper({
      subjectId,
      generatedBy: userId,
      shortQuestionsJson: selectedTwoMarks,
      moduleQuestionsJson: moduleQuestions,
      totalMarks: maxMarks,
      exportFormat,
    });

    await newQuestionPaper.save();
    writeStream.on("finish", () => res.download(filePath));
  } catch (error) {
    console.error("Error generating question paper:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllQuestionPapers = async (req, res) => {
  try {
    const questionPapers = await QuestionPaper.find().populate("subjectId", "name code");

    const response = questionPapers.map((qp) => ({
      id: qp._id,
      subjectId: qp.subjectId._id,
      subjectName: qp.subjectId.name,
      subjectCode: qp.subjectId.code,
      totalMarks: qp.totalMarks,
      numberOfQuestions: qp.shortQuestionsJson.length + qp.moduleQuestionsJson.reduce((acc, mod) => acc + mod.questions.length, 0),
      shortQuestions: qp.shortQuestionsJson,
      moduleQuestions: qp.moduleQuestionsJson,
    }));

    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching question papers:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { generateQuestionPaper, getAllQuestionPapers };