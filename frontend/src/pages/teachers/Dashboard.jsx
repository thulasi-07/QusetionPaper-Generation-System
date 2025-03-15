import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [questionPapers, setQuestionPapers] = useState([]);

  useEffect(() => {
    const fetchQuestionPapers = async () => {
      const token = localStorage.getItem("token"); // Get token from localStorage

      if (!token) {
        console.error("No auth token found. Please log in.");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:3000/api/qpaper/getgeneratedqp",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Send token in Authorization header
            },
          }
        );

        if (Array.isArray(response.data)) {
          console.log(response.data);
          setQuestionPapers(response.data);
        } else {
          console.error("Expected an array but received:", response.data);
          setQuestionPapers([]); // Prevent .map() errors
        }
      } catch (error) {
        console.error("Error fetching question papers:", error);
      }
    };

    fetchQuestionPapers();
  }, []);

  const downloadPDF = async (subjectId, maxMarks) => {
    console.log(subjectId, maxMarks);
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No auth token found.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/qpaper/getgeneratedqp",
        { subjectId, maxMarks },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );

      console.log(response);

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `QuestionPaper_${subjectId}_${maxMarks}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        Teacher Dashboard
      </h2>

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Subject</th>
            <th className="border px-4 py-2">Marks</th>
            <th className="border px-4 py-2">Download</th>
          </tr>
        </thead>
        <tbody>
          {questionPapers.map((qp, index) => (
            <tr key={index} className="border-t">
              <td className="border px-4 py-2">
                {qp.subjectId.subjectName} ({qp.subjectId.subjectCode})
              </td>
              <td className="border px-4 py-2">{qp.totalMarks}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                  onClick={() => downloadPDF(qp.subjectId._id, qp.totalMarks)}
                >
                  Download
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
