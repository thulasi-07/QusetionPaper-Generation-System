import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "../../components/ui/Table";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ManageSubjects = () => {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState({
    subjectName: "",
    subjectCode: "",
    course: "",
    year: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      console.error("Token is missing!");
      navigate("/login");
      return;
    }

    const fetchSubjects = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/qpaper/subject",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setSubjects(response.data.subjects || []);
      } catch (error) {
        console.error(
          "Error fetching subjects:",
          error.response?.data?.message || error.message
        );
        alert("Failed to fetch subjects.");
      }
    };

    fetchSubjects();
  }, [navigate]);

  const handleAddSubject = async () => {
    if (
      !newSubject.subjectName ||
      !newSubject.subjectCode ||
      !newSubject.course ||
      !newSubject.year
    ) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/qpaper/subject",
        newSubject,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSubjects((prevSubjects) => [...prevSubjects, response.data]); // Ensures correct state update
      setNewSubject({
        subjectName: "",
        subjectCode: "",
        course: "",
        year: "",
      });
    } catch (error) {
      console.error(
        "Error adding subject:",
        error.response?.data?.message || error.message
      );
      alert(error.response?.data?.message || "Failed to add subject.");
    }
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
          onChange={(e) =>
            setNewSubject({ ...newSubject, subjectName: e.target.value })
          }
        />
        <Input
          placeholder="Subject Code"
          value={newSubject.subjectCode}
          onChange={(e) =>
            setNewSubject({ ...newSubject, subjectCode: e.target.value })
          }
        />
        <Input
          placeholder="Course"
          value={newSubject.course}
          onChange={(e) =>
            setNewSubject({ ...newSubject, course: e.target.value })
          }
        />
        <Input
          placeholder="Year"
          value={newSubject.year}
          onChange={(e) =>
            setNewSubject({ ...newSubject, year: e.target.value })
          }
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
          </TableRow>
        </TableHead>
        <TableBody>
          {subjects.length > 0 ? (
            subjects.map((subject) => (
              <TableRow key={subject._id}>
                <TableCell>{subject.subjectName}</TableCell>
                <TableCell>{subject.subjectCode}</TableCell>
                <TableCell>{subject.course}</TableCell>
                <TableCell>{subject.year}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="4" className="text-center text-gray-500">
                No subjects available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageSubjects;
