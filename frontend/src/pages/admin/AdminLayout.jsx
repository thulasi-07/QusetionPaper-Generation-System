import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";
import React from "react";
import { Outlet } from "react-router-dom";
const AdminLayout = () => {
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
