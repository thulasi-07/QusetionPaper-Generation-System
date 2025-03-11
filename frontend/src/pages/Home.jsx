import { useNavigate } from "react-router-dom";
import React from "react";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-indigo-400 to-purple-500 text-white">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-96 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Welcome!</h1>
        <p className="text-lg text-gray-600 mb-6">Join us now and explore amazing features.</p>
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition-all duration-300"
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
