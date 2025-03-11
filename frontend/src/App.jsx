import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";

import Home from "./pages/Home"; 
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import AdminLayout from "./pages/admin/AdminLayout";
import GeneratePaper from "./pages/admin/GeneratePaper";
import ManagePatterns from "./pages/admin/ManagePatterns";
import ManageQuestions from "./pages/admin/ManageQuestions";
import Reports from "./pages/admin/Reports";
import Dashboard from "./pages/teachers/Dashboard";
import ManageSubjects from "./pages/admin/AddSubjects";

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

         
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="generate-paper" element={<GeneratePaper />} />
            <Route path="add-subject" element={<ManageSubjects/>} />

            <Route path="manage-patterns" element={<ManagePatterns />} />
            <Route path="manage-questions" element={<ManageQuestions />} />
            <Route path="reports" element={<Reports />} />
          </Route>

          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
