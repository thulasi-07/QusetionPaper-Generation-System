import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import { Button } from "../../components/ui/Button";
import { Select, SelectItem } from "../../components/ui/Select";
import { FileText, Download } from "lucide-react";

const GeneratePaper = () => {
  const [subjects, setSubjects] = useState([]);
  const [subjectId, setSubjectId] = useState("");
  const [maxMarks, setMaxMarks] = useState("");
  const [allQuestions, setAllQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [generatedPaper, setGeneratedPaper] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/qpaper/subject",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSubjects(response.data.subjects);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, [token]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/qpaper/questions",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAllQuestions(response.data.questionSets || []);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [token]);

  useEffect(() => {
    if (subjectId) {
      const filteredSets = allQuestions.filter(
        (q) => q.subjectId._id === subjectId
      );

      const twoMarks = filteredSets.flatMap((set) => set.twoMarksQuestions);
      const tenMarks = filteredSets.flatMap((set) => set.tenMarksQuestions);

      setFilteredQuestions([...twoMarks, ...tenMarks]);
    } else {
      setFilteredQuestions([]);
    }
  }, [subjectId, allQuestions]);

  const countQuestions = (questions) => {
    const twoMarks = questions.filter((q) => parseInt(q.marks, 10) === 2);
    const tenMarks = questions.filter((q) => parseInt(q.marks, 10) === 10);
    return { twoMarks, tenMarks };
  };

  const { twoMarks, tenMarks } = countQuestions(filteredQuestions);

  const isSufficientQuestions =
    (maxMarks === "50" && twoMarks.length >= 5 && tenMarks.length >= 4) ||
    (maxMarks === "100" && twoMarks.length >= 10 && tenMarks.length >= 8);

  const handleGenerate = async () => {
    if (!subjectId || !maxMarks) {
      alert("Please select both Subject and Marks Type!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/qpaper/generateqp",
        { subjectId, maxMarks },
        { responseType: "blob", headers: { Authorization: `Bearer ${token}` } }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      setGeneratedPaper(url);
    } catch (error) {
      console.error("Error generating question paper:", error);
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <FileText className="mr-2" /> Generate Question Paper
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Select Subject
          </label>
          <Select
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
          >
            {subjects.length > 0 ? (
              subjects.map((subject) => (
                <SelectItem key={subject._id} value={subject._id}>
                  {subject.subjectName} ({subject.subjectCode})
                </SelectItem>
              ))
            ) : (
              <SelectItem disabled>No subjects available</SelectItem>
            )}
          </Select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Select Marks Type
          </label>
          <Select
            value={maxMarks}
            onChange={(e) => setMaxMarks(e.target.value)}
          >
            <SelectItem value="50">50 Marks</SelectItem>
            <SelectItem value="100">100 Marks</SelectItem>
          </Select>
        </div>

        {!isSufficientQuestions && (
          <p className="text-red-600 font-semibold">
            Not enough questions available! Please add more questions.
          </p>
        )}

        <Button
          onClick={handleGenerate}
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-bold py-2 px-4 rounded"
          disabled={!isSufficientQuestions}
        >
          Generate Paper
        </Button>

        {generatedPaper && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-inner text-gray-700">
            <p>Question Paper Generated Successfully!</p>
            <a
              href={generatedPaper}
              download="QuestionPaper.pdf"
              className="mt-4 inline-flex items-center bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
            >
              <Download className="mr-2" /> Download PDF
            </a>
          </div>
        )}

        {filteredQuestions.length > 0 && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-inner">
            <h3 className="font-semibold mb-2">Filtered Questions:</h3>
            <ul className="list-disc list-inside">
              {filteredQuestions.map((q) => (
                <li key={q._id} className="text-gray-700">
                  {q.questionText} ({q.marks} Marks)
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneratePaper;
