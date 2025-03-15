import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import React from "react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg fixed w-full top-0 z-50 py-3">
      <div className="container mx-auto flex justify-between items-center px-6">
        <Link
          to="/"
          className="text-white text-3xl font-extrabold tracking-wide"
        >
          QPGS
        </Link>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            {isOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
        {/* <ul className="hidden md:flex space-x-6 text-white font-semibold text-lg">
          <li><Link to="/" className="hover:text-gray-300 transition">Home</Link></li>
          <li><Link to="manage-questions" className="hover:text-gray-300 transition">Manage Questions</Link></li>
          <li><Link to="manage-patterns" className="hover:text-gray-300 transition">Patterns</Link></li>
          <li><Link to="generate-paper" className="hover:text-gray-300 transition">Generate Paper</Link></li>
          <li><Link to="reports" className="hover:text-gray-300 transition">Reports</Link></li>
        </ul> */}
      </div>

      {isOpen && (
        <div className="md:hidden bg-blue-700 py-4">
          <ul className="text-white text-center space-y-4 text-lg">
            <li>
              <Link
                to="/"
                className="block hover:text-gray-300"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="manage-questions"
                className="block hover:text-gray-300"
                onClick={() => setIsOpen(false)}
              >
                Manage Questions
              </Link>
            </li>

            <li>
              <Link
                to="generate-paper"
                className="block hover:text-gray-300"
                onClick={() => setIsOpen(false)}
              >
                Generate Paper
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
