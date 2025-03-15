import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Subject, QuestionSet, QuestionPaper } from "../models/dbmodels.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generateQuestionPaper = async (req, res) => {
  try {
    const { subjectId, maxMarks } = req.body;
    const course = "Master of Computer Application";
    const userId = req.userId;

    // Fetch subject details
    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    // Check if PDF already exists
    const existingFilePath = path.join(
      __dirname,
      "../questionPapers",
      `QuestionPaper_${subject.subjectCode}_${maxMarks}.pdf`
    );
    if (fs.existsSync(existingFilePath)) {
      return res.download(existingFilePath);
    }

    // Fetch all questions for the subject
    const questionSets = await QuestionSet.find({ subjectId });

    let twoMarkQuestions = [];
    let tenMarkQuestions = [];

    questionSets.forEach((set) => {
      twoMarkQuestions.push(...set.twoMarksQuestions);
      tenMarkQuestions.push(...set.tenMarksQuestions);
    });

    // Shuffle questions
    const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
    twoMarkQuestions = shuffleArray(twoMarkQuestions);
    tenMarkQuestions = shuffleArray(tenMarkQuestions);

    // Select required number of questions
    const selectedTwoMarks = twoMarkQuestions.slice(
      0,
      maxMarks === 100 ? 10 : 5
    );
    const selectedTenMarks = tenMarkQuestions.slice(
      0,
      maxMarks === 100 ? 8 : 4
    );

    // Create directory for PDFs
    const questionPapersDir = path.join(__dirname, "../questionPapers");
    if (!fs.existsSync(questionPapersDir)) {
      fs.mkdirSync(questionPapersDir, { recursive: true });
    }

    // Generate PDF
    const filePath = path.join(
      questionPapersDir,
      `QuestionPaper_${subject.subjectCode}_${maxMarks}.pdf`
    );
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    // PDF Header
    doc
      .fontSize(16)
      .text("ST JOSEPH ENGINEERING COLLEGE, MANGALURU", { align: "center" })
      .moveDown();
    doc.fontSize(12).text(course, { align: "center" });
    doc.text(`Subject: ${subject.subjectName} (${subject.subjectCode})`, {
      align: "center",
    });
    doc.text(
      `Duration: ${
        maxMarks === 100 ? "3 Hrs" : "1.5 Hrs"
      }  |  Maximum Marks: ${maxMarks}`,
      { align: "center" }
    );

    doc.moveDown();
    doc.text("USN: ___________________________", { align: "right" });
    doc.moveDown(2);

    doc.text("PART-A (2 Marks Questions)", { underline: true, bold: true });
    selectedTwoMarks.forEach((q, i) => {
      doc.text(`${i + 1}. ${q.questionText}`);
    });

    doc.moveDown();

    doc.text("PART-B (10 Marks Questions)", { underline: true, bold: true });
    selectedTenMarks.forEach((q, i) => {
      doc.text(`${i + 1}. ${q.questionText}`);
    });

    doc.end();

    // Save question paper in database
    const newQuestionPaper = new QuestionPaper({
      subjectId,
      generatedBy: userId,
      twoMarksQuestions: selectedTwoMarks,
      tenMarksQuestions: selectedTenMarks,
      totalMarks: maxMarks,
    });

    await newQuestionPaper.save();

    // Return the PDF
    writeStream.on("finish", () => res.download(filePath));
  } catch (error) {
    console.error("Error generating question paper:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllGeneratedPapers = async (req, res) => {
  try {
    const papers = await QuestionPaper.find().populate(
      "subjectId",
      "subjectName subjectCode"
    );
    res.status(200).json(papers);
  } catch (error) {
    console.error("Error fetching question papers:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Download generated question paper PDF
const getDownloadPdf = async (req, res) => {
  try {
    const { subjectId, maxMarks } = req.body;
    // Validate input
    if (!subjectId || !maxMarks) {
      return res
        .status(400)
        .json({ message: "Subject ID and Marks are required." });
    }

    // Fetch subject details
    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    // Construct the file path
    const filePath = path.join(
      __dirname,
      "../questionPapers",
      `QuestionPaper_${subject.subjectCode}_${maxMarks}.pdf`
    );

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return res
        .status(404)
        .json({ message: "Generated question paper file not found" });
    }

    // Send the file for download
    return res.download(
      filePath,
      `QuestionPaper_${subject.subjectCode}_${maxMarks}.pdf`,
      (err) => {
        if (err) {
          console.error("Error sending file:", err);
          return res.status(500).json({ message: "Error downloading file" });
        }
      }
    );
  } catch (error) {
    console.error("Error fetching question paper PDF:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { generateQuestionPaper, getAllGeneratedPapers, getDownloadPdf };
