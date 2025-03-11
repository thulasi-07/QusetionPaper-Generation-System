import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, LayoutGrid, FileText, Settings, BarChart2, LogOut } from "lucide-react";
import React from "react";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`h-screen bg-gradient-to-b from-blue-600 to-purple-600 text-white shadow-lg fixed top-0 ${isOpen ? 'w-64' : 'w-20'} transition-all duration-300`}>
      <div className="flex items-center justify-between p-4">
        <h1 className={`text-xl font-bold ${isOpen ? 'block' : 'hidden'}`}>QPGS</h1>
        <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <nav className="mt-4">
        <ul className="space-y-4">
          <li>
            <Link to="/admin" className="flex items-center space-x-3 px-6 py-3 hover:bg-blue-700 transition rounded-md">
              <LayoutGrid size={24} />
              <span className={isOpen ? "block" : "hidden"}>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="manage-questions" className="flex items-center space-x-3 px-6 py-3 hover:bg-blue-700 transition rounded-md">
              <FileText size={24} />
              <span className={isOpen ? "block" : "hidden"}>Manage Questions</span>
            </Link>
          </li>
          <li>
            <Link to="add-subject" className="flex items-center space-x-3 px-6 py-3 hover:bg-blue-700 transition rounded-md">
              <FileText size={24} />
              <span className={isOpen ? "block" : "hidden"}>Manage Subjects</span>
            </Link>
          </li>
          <li>
            <Link to="manage-questions" className="flex items-center space-x-3 px-6 py-3 hover:bg-blue-700 transition rounded-md">
              <FileText size={24} />
              <span className={isOpen ? "block" : "hidden"}>Manage Questions</span>
            </Link>
          </li>
          <li>
            <Link to="manage-patterns" className="flex items-center space-x-3 px-6 py-3 hover:bg-blue-700 transition rounded-md">
              <Settings size={24} />
              <span className={isOpen ? "block" : "hidden"}>Patterns</span>
            </Link>
          </li>
          <li>
            <Link to="reports" className="flex items-center space-x-3 px-6 py-3 hover:bg-blue-700 transition rounded-md">
              <BarChart2 size={24} />
              <span className={isOpen ? "block" : "hidden"}>Reports</span>
            </Link>
          </li>
          <li>
            <Link to="/" className="flex items-center space-x-3 px-6 py-3 hover:bg-red-600 transition rounded-md mt-8">
              <LogOut size={24} />
              <span className={isOpen ? "block" : "hidden"}>Logout</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
