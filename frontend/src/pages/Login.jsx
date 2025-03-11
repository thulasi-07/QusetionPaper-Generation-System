import React, { useState } from "react";
import axios from "axios";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/user/signin", {
        email,
        password,
      });

      const token = response.data.token;
      if (token) {
        localStorage.setItem("token", token);
        navigate("/admin"); // Redirect to admin dashboard
      }
    } catch (error) {
      console.error("Signin failed:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Signin failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-96">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Signin</h2>
        <form onSubmit={handleSignin} className="space-y-4">
          <Input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <Input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <Button type="submit" className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition duration-300">
            Signin
          </Button>
          <Button onClick={() => navigate("/")} className="w-full py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg shadow-md transition duration-300">
            Back to Home
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
