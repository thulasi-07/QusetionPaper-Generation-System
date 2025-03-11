import  React, { useState } from "react";
import { FileText, Settings, List, BarChart2 } from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalQuestions: 120,
    totalPatterns: 8,
    totalPapersGenerated: 25,
  });

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <BarChart2 size={28} className="mr-2 text-blue-600" /> Teacher Dashboard
      </h2>

      <div className="grid grid-cols-3 gap-6">
        <div className="p-4 bg-blue-100 border-l-4 border-blue-600 rounded-lg shadow-sm">
          <div className="flex items-center">
            <FileText size={28} className="text-blue-600 mr-3" />
            <div>
              <h3 className="text-xl font-semibold">{stats.totalQuestions}</h3>
              <p className="text-gray-700">Questions</p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-green-100 border-l-4 border-green-600 rounded-lg shadow-sm">
          <div className="flex items-center">
            <List size={28} className="text-green-600 mr-3" />
            <div>
              <h3 className="text-xl font-semibold">{stats.totalPatterns}</h3>
              <p className="text-gray-700">Patterns</p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-purple-100 border-l-4 border-purple-600 rounded-lg shadow-sm">
          <div className="flex items-center">
            <Settings size={28} className="text-purple-600 mr-3" />
            <div>
              <h3 className="text-xl font-semibold">{stats.totalPapersGenerated}</h3>
              <p className="text-gray-700">Papers Generated</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
