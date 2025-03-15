import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "../../components/ui/Table";
import { Plus, Trash2, Edit } from "lucide-react";
import axios from "axios";

const ManageQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [newQuestion, setNewQuestion] = useState({
    questionText: "",
    subjectCode: "",
    year: "",
    co: "",
    llo: "",
    bL: "",
    po: "",
    marks: "",
  });

  const token = localStorage.getItem("token");

  // Fetch subjects
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/qpaper/subject",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setSubjects(response.data.subjects);
      } catch (error) {
        console.error(
          "Error fetching subjects:",
          error.response?.data?.message || error.message
        );
      }
    };

    fetchSubjects();
  }, [token]);

  // Fetch questions
  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/qpaper/questions",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setQuestions(response.data.questionSets); // ✅ Correct structure
    } catch (error) {
      console.error(
        "Error fetching questions:",
        error.response?.data?.message || error.message
      );
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [token]);

  // Handle adding a new question
  const handleAddQuestion = async () => {
    if (Object.values(newQuestion).some((value) => !value)) {
      alert("Please fill all fields.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/api/qpaper/questions",
        {
          subjectCode: newQuestion.subjectCode,
          year: parseInt(newQuestion.year, 10),
          questionText: newQuestion.questionText,
          co: newQuestion.co,
          llo: newQuestion.llo,
          bL: newQuestion.bL,
          po: newQuestion.po,
          marks: parseInt(newQuestion.marks, 10),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // ✅ After adding, refetch questions to avoid structure errors
      fetchQuestions();

      // ✅ Reset input fields
      setNewQuestion({
        questionText: "",
        subjectCode: "",
        year: "",
        co: "",
        llo: "",
        bL: "",
        po: "",
        marks: "",
      });
    } catch (error) {
      console.error(
        "Error adding question:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <Plus className="mr-2" /> Manage Questions
      </h2>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <textarea
          placeholder="Question"
          value={newQuestion.questionText}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, questionText: e.target.value })
          }
          className="border border-gray-300 rounded p-2 w-full col-span-3"
        />

        <Input
          placeholder="CO (Course Outcome)"
          value={newQuestion.co}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, co: e.target.value })
          }
          className="border border-gray-300 rounded p-2 w-full"
        />

        <Input
          placeholder="LLO (Learning Level Outcome)"
          value={newQuestion.llo}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, llo: e.target.value })
          }
          className="border border-gray-300 rounded p-2 w-full"
        />

        <Input
          placeholder="BL (Bloom's Taxonomy Level)"
          value={newQuestion.bL}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, bL: e.target.value })
          }
          className="border border-gray-300 rounded p-2 w-full"
        />

        <Input
          placeholder="PO (Program Outcome)"
          value={newQuestion.po}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, po: e.target.value })
          }
          className="border border-gray-300 rounded p-2 w-full"
        />

        <select
          value={newQuestion.marks}
          onChange={(e) =>
            setNewQuestion({
              ...newQuestion,
              marks: parseInt(e.target.value, 10),
            })
          }
          className="border border-gray-300 rounded p-2 w-full"
        >
          <option value="">Select Marks</option>
          <option value="2">2 Marks</option>
          <option value="10">10 Marks</option>
        </select>

        <select
          value={newQuestion.subjectCode}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, subjectCode: e.target.value })
          }
          className="border border-gray-300 rounded p-2 w-full"
        >
          <option value="">Select Subject</option>
          {subjects.map((subject) => (
            <option key={subject.subjectCode} value={subject.subjectCode}>
              {subject.subjectName} ({subject.year})
            </option>
          ))}
        </select>

        <Input
          placeholder="Year"
          value={newQuestion.year}
          onChange={(e) =>
            setNewQuestion({
              ...newQuestion,
              year: parseInt(e.target.value, 10),
            })
          }
          className="border border-gray-300 rounded p-2 w-full"
        />

        <Button
          onClick={handleAddQuestion}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded col-span-1 md:col-span-3"
        >
          <Plus className="mr-2" /> Add Question
        </Button>
      </div>

      {/* Questions Table */}
      <Table className="w-full mt-6">
        <TableHead>
          <TableRow>
            <TableCell>Question</TableCell>
            <TableCell>Subject Code</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>CO</TableCell>
            <TableCell>LLO</TableCell>
            <TableCell>BL</TableCell>
            <TableCell>PO</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {questions.flatMap((qSet) =>
            [
              ...(qSet.twoMarksQuestions || []), // ✅ Handle undefined cases
              ...(qSet.tenMarksQuestions || []),
            ].map((q, index) => (
              <TableRow key={index}>
                <TableCell>{q.questionText}</TableCell>
                <TableCell>{qSet.subjectId.subjectCode}</TableCell>
                <TableCell>{qSet.subjectId.year}</TableCell>
                <TableCell>{q.co}</TableCell>
                <TableCell>{q.llo}</TableCell>
                <TableCell>{q.bL}</TableCell>
                <TableCell>{q.po}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageQuestions;
