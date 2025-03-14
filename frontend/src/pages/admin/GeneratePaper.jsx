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
  const [generatedPaper, setGeneratedPaper] = useState(null);
  const token = localStorage.getItem("token");

  // Fetch subjects from backend
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/qpaper/subject",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log(response.data.subjects);
        setSubjects(response.data.subjects);
      } catch (error) {
        console.error(
          "Error fetching subjects:",
          error.response?.data?.message || error.message
        );
      }
    };

    fetchSubjects();
    console.log(subjects);
  }, [token]);

  // Handle question paper generation
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
      console.error(
        "Error generating question paper:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <FileText className="mr-2" /> Generate Question Paper
      </h2>

      <div className="space-y-4">
        {/* Subject Selection */}
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

        {/* Marks Selection */}
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

        {/* Generate Paper Button */}
        <Button
          onClick={handleGenerate}
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-bold py-2 px-4 rounded"
        >
          Generate Paper
        </Button>
      </div>

      {/* Display Download Button */}
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
    </div>
  );
};

export default GeneratePaper;
