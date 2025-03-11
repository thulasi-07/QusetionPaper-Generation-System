import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role:{type : String ,default:"user"}
});

const QuestionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    co: { type: String, required: true },
    llo: { type: String, required: true },
    bL: { type: String, required: true },
    po: { type: String, required: true }
});

const QuestionSetSchema = new mongoose.Schema({
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    twoMarksQuestions: [QuestionSchema],
    tenMarksQuestions: [QuestionSchema]
});

const QuestionPaperSchema = new mongoose.Schema({
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    totalMarks: { type: Number, required: true },
    twoMarksQuestions: [QuestionSchema],
    tenMarksQuestions: [QuestionSchema]
});

const SubjectSchema = new mongoose.Schema({
    subjectName: { type: String, required: true },
    subjectCode: { type: String, required: true, unique: true },
    course: { type: String, default: 'MCA' },
    year: { type: Number, required: true }
});

export const User = mongoose.model('User', UserSchema);
export const QuestionSet = mongoose.model('QuestionSet', QuestionSetSchema);
export const QuestionPaper = mongoose.model('QuestionPaper', QuestionPaperSchema);
export const Subject = mongoose.model('Subject', SubjectSchema);
