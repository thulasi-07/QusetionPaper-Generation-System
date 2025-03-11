import React ,{ useState } from "react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Table, TableHead, TableRow, TableCell, TableBody } from "../../components/ui/Table";
import { Plus, Trash2, Edit } from "lucide-react";

const ManageQuestions = () => {
  const [questions, setQuestions] = useState([
    { id: 1, question: "What is React?", type: "2 Marks", module: "Module 1" },
    { id: 2, question: "Explain useState hook.", type: "10 Marks", module: "Module 2" }
  ]);
  
  const [newQuestion, setNewQuestion] = useState({ question: "", type: "", module: "" });

  const handleAddQuestion = () => {
    if (newQuestion.question && newQuestion.type && newQuestion.module) {
      setQuestions([...questions, { id: Date.now(), ...newQuestion }]);
      setNewQuestion({ question: "", type: "", module: "" });
    }
  };

  const handleDeleteQuestion = (id) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <Plus className="mr-2" /> Manage Questions
      </h2>
   
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          placeholder="Question"
          value={newQuestion.question}
          onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
        />
        <Input
          placeholder="Type (e.g., 2 Marks, 10 Marks)"
          value={newQuestion.type}
          onChange={(e) => setNewQuestion({ ...newQuestion, type: e.target.value })}
        />
        <Input
          placeholder="Module (e.g., Module 1)"
          value={newQuestion.module}
          onChange={(e) => setNewQuestion({ ...newQuestion, module: e.target.value })}
        />
        <Button onClick={handleAddQuestion} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded col-span-1 md:col-span-3">
          <Plus className="mr-2" /> Add Question
        </Button>
      </div>
      
     
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className="font-bold">Question</TableCell>
            <TableCell className="font-bold">Type</TableCell>
            <TableCell className="font-bold">Module</TableCell>
            <TableCell className="font-bold text-center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {questions.map((q) => (
            <TableRow key={q.id}>
              <TableCell>{q.question}</TableCell>
              <TableCell>{q.type}</TableCell>
              <TableCell>{q.module}</TableCell>
              <TableCell className="text-center">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded mr-2">
                  <Edit size={16} />
                </Button>
                <Button onClick={() => handleDeleteQuestion(q.id)} className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded">
                  <Trash2 size={16} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageQuestions;
