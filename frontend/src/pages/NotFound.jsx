import React , { useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <AlertTriangle className="text-red-500" size={50} />
      <h1 className="text-4xl font-bold text-gray-800 mt-4">404 - Page Not Found</h1>
      <p className="text-gray-600 mt-2">The page you're looking for doesn't exist.</p>
      <Link to="/" className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;


