import React,{ useState } from "react";
import { Button } from "../../components/ui/Button";
import { Table, TableHead, TableRow, TableCell, TableBody } from "../../components/ui/Table";
import { FileText, Download } from "lucide-react";

const Reports = () => {
  const [reports] = useState([
    { id: 1, title: "Module 1 Question Report", date: "2025-03-08", format: "PDF" },
    { id: 2, title: "CO/PO Mapping Analysis", date: "2025-03-07", format: "Excel" },
  ]);

  const handleDownload = (title, format) => {
    alert(`Downloading ${title} as ${format}`);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <FileText className="mr-2" /> Reports & Analytics
      </h2>
      
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className="font-bold">Report Title</TableCell>
            <TableCell className="font-bold">Generated Date</TableCell>
            <TableCell className="font-bold text-center">Format</TableCell>
            <TableCell className="font-bold text-center">Download</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reports.map((report) => (
            <TableRow key={report.id}>
              <TableCell>{report.title}</TableCell>
              <TableCell>{report.date}</TableCell>
              <TableCell className="text-center">{report.format}</TableCell>
              <TableCell className="text-center">
                <Button onClick={() => handleDownload(report.title, report.format)} className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded">
                  <Download size={16} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Reports;
