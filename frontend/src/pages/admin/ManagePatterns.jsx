import React,{ useState } from "react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Table, TableHead, TableRow, TableCell, TableBody } from "../../components/ui/Table";
import { Plus, Trash2, Save } from "lucide-react";

const ManagePatterns = () => {
  const [patterns, setPatterns] = useState([
    { id: 1, name: "Pattern A", description: "2 marks - 5 questions, 10 marks - 3 questions" },
    { id: 2, name: "Pattern B", description: "5 marks - 6 questions, 8 marks - 4 questions" }
  ]);

  const [newPattern, setNewPattern] = useState({ name: "", description: "" });

  const handleAddPattern = () => {
    if (newPattern.name && newPattern.description) {
      setPatterns([...patterns, { id: Date.now(), ...newPattern }]);
      setNewPattern({ name: "", description: "" });
    }
  };

  const handleDeletePattern = (id) => {
    setPatterns(patterns.filter(pattern => pattern.id !== id));
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <Plus className="mr-2" /> Manage Question Paper Patterns
      </h2>
      
    
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          placeholder="Pattern Name"
          value={newPattern.name}
          onChange={(e) => setNewPattern({ ...newPattern, name: e.target.value })}
        />
        <Input
          placeholder="Pattern Description"
          value={newPattern.description}
          onChange={(e) => setNewPattern({ ...newPattern, description: e.target.value })}
        />
        <Button onClick={handleAddPattern} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded col-span-1 md:col-span-2">
          <Save className="mr-2" /> Save Pattern
        </Button>
      </div>
      
     
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className="font-bold">Pattern Name</TableCell>
            <TableCell className="font-bold">Description</TableCell>
            <TableCell className="font-bold text-center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patterns.map((pattern) => (
            <TableRow key={pattern.id}>
              <TableCell>{pattern.name}</TableCell>
              <TableCell>{pattern.description}</TableCell>
              <TableCell className="text-center">
                <Button onClick={() => handleDeletePattern(pattern.id)} className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded">
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

export default ManagePatterns;
