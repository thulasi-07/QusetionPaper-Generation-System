import React, { useState } from "react";
import axios from "axios";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Table, TableHead, TableRow, TableCell, TableBody } from "../../components/ui/Table";
import { Plus, Trash2 } from "lucide-react";

const ManageSubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState({
    subjectName: "",
    subjectCode: "",
    course: "",
    year: "",
  });

  const token = localStorage.getItem("token");

  const handleAddSubject = async () => {
    if (newSubject.subjectName && newSubject.subjectCode && newSubject.course && newSubject.year) {
      try {
        const response = await axios.post("http://localhost:3000/api/qpaper/subject", newSubject, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setSubjects([...subjects, response.data]);
        setNewSubject({ subjectName: "", subjectCode: "", course: "", year: "" });
      } catch (error) {
        console.error("Error adding subject:", error.response?.data?.message || error.message);
        alert(error.response?.data?.message || "Failed to add subject.");
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleDeleteSubject = (id) => {
    setSubjects(subjects.filter((subject) => subject.id !== id));
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <Plus className="mr-2" /> Manage Subjects
      </h2>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <Input
          placeholder="Subject Name"
          value={newSubject.subjectName}
          onChange={(e) => setNewSubject({ ...newSubject, subjectName: e.target.value })}
        />
        <Input
          placeholder="Subject Code"
          value={newSubject.subjectCode}
          onChange={(e) => setNewSubject({ ...newSubject, subjectCode: e.target.value })}
        />
        <Input
          placeholder="Course"
          value={newSubject.course}
          onChange={(e) => setNewSubject({ ...newSubject, course: e.target.value })}
        />
        <Input
          placeholder="Year"
          value={newSubject.year}
          onChange={(e) => setNewSubject({ ...newSubject, year: e.target.value })}
        />
        <Button
          onClick={handleAddSubject}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded col-span-1 md:col-span-4"
        >
          <Plus className="mr-2" /> Add Subject
        </Button>
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell className="font-bold">Subject Name</TableCell>
            <TableCell className="font-bold">Subject Code</TableCell>
            <TableCell className="font-bold">Course</TableCell>
            <TableCell className="font-bold">Year</TableCell>
            <TableCell className="font-bold text-center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subjects.map((subject) => (
            <TableRow key={subject.id}>
              <TableCell>{subject.subjectName}</TableCell>
              <TableCell>{subject.subjectCode}</TableCell>
              <TableCell>{subject.course}</TableCell>
              <TableCell>{subject.year}</TableCell>
              <TableCell className="text-center">
                <Button
                  onClick={() => handleDeleteSubject(subject.id)}
                  className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded"
                >
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

export default ManageSubjects;
