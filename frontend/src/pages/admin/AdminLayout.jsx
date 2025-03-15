import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token"); // Get token from localStorage

      if (!token) {
        navigate("/login"); // Redirect if no token is found
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:3000/api/user/userDetail",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.data.user) {
          throw new Error("Invalid user");
        }
      } catch (error) {
        console.error("Authentication failed:", error);
        localStorage.removeItem("token"); // Remove invalid token
        navigate("/login"); // Redirect to login page
      }
    };

    fetchUserDetails();
  }, [navigate]);

  return (
    <div className="flex h-screen bg-gray-100">
      <SideBar />
      <div className="flex-1 flex flex-col overflow-hidden ml-20 md:ml-64 transition-all duration-300">
        <NavBar />
        <main className="p-6 mt-16 overflow-auto h-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
