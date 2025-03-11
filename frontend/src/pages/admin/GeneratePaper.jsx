import { useState } from "react";
import { Button } from "../../components/ui/Button";
import { Select, SelectItem } from "../../components/ui/Select";
import { FileText, Download } from "lucide-react";
import React from "react";

const GeneratePaper = () => {
  const [subject, setSubject] = useState("");
  const [pattern, setPattern] = useState("");
  const [generatedPaper, setGeneratedPaper] = useState(null);

  const handleGenerate = () => {
    if (!subject || !pattern) {
      alert("Please select both Subject and Pattern!");
      return;
    }
    setGeneratedPaper(`Question Paper for ${subject} - Pattern: ${pattern}`);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <FileText className="mr-2" /> Generate Question Paper
      </h2>
      
      <div className="space-y-4">
        {/* Subject Selection */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Select Subject</label>
          <Select value={subject} onChange={(e) => setSubject(e.target.value)}>
            <SelectItem value="Mathematics">Mathematics</SelectItem>
            <SelectItem value="Physics">Physics</SelectItem>
            <SelectItem value="Computer Science">Computer Science</SelectItem>
          </Select>
        </div>

        {/* Pattern Selection */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Select Pattern</label>
          <Select value={pattern} onChange={(e) => setPattern(e.target.value)}>
            <SelectItem value="Pattern A">Pattern A</SelectItem>
            <SelectItem value="Pattern B">Pattern B</SelectItem>
            <SelectItem value="Pattern C">Pattern C</SelectItem>
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

      {/* Display Generated Paper */}
      {generatedPaper && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-inner text-gray-700">
          <p>{generatedPaper}</p>
          <Button className="mt-4 flex items-center bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded">
            <Download className="mr-2" /> Download PDF
          </Button>
        </div>
      )}
    </div>
  );
};

export default GeneratePaper;
