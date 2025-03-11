import React ,{ useState } from "react";
import { PlusCircle, Trash2, Edit } from "lucide-react";

const ManageQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [questionType, setQuestionType] = useState("2-mark");
  const [editingIndex, setEditingIndex] = useState(null);

  const addQuestion = () => {
    if (newQuestion.trim()) {
      const questionData = { text: newQuestion, type: questionType };
      if (editingIndex !== null) {
        const updatedQuestions = [...questions];
        updatedQuestions[editingIndex] = questionData;
        setQuestions(updatedQuestions);
        setEditingIndex(null);
      } else {
        setQuestions([...questions, questionData]);
      }
      setNewQuestion("");
      setQuestionType("2-mark");
    }
  };

  const editQuestion = (index) => {
    setNewQuestion(questions[index].text);
    setQuestionType(questions[index].type);
    setEditingIndex(index);
  };

  const deleteQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <PlusCircle size={28} className="mr-2 text-blue-600" /> Manage Questions
      </h2>
      
      <div className="flex items-center space-x-2 mb-4">
        <input
          type="text"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          className="border p-2 flex-1 rounded-lg"
          placeholder="Enter a question"
        />
        <select
          value={questionType}
          onChange={(e) => setQuestionType(e.target.value)}
          className="border p-2 rounded-lg"
        >
          <option value="2-mark">2-mark</option>
          <option value="8-mark">8-mark</option>
          <option value="10-mark">10-mark</option>
        </select>
        <button
          onClick={addQuestion}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {editingIndex !== null ? "Update" : "Add"}
        </button>
      </div>
      
      <ul className="space-y-2">
        {questions.map((question, index) => (
          <li key={index} className="flex justify-between items-center p-3 bg-gray-100 rounded-lg border">
            <div>
              <span className="font-semibold">[{question.type}]</span> {question.text}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => editQuestion(index)}
                className="text-yellow-600 hover:text-yellow-800 transition"
              >
                <Edit size={20} />
              </button>
              <button
                onClick={() => deleteQuestion(index)}
                className="text-red-600 hover:text-red-800 transition"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageQuestions;
