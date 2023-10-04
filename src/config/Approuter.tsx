import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "../Screens/Signup";
import Quiz from "../Screens/Quiz";
import LoginPage from "../Screens/Login";
import AdminPanel from "../Screens/AdminPanel";

export default function AppRouter() {
    return (
      <>
        <Router>
          <Routes>
            <Route path="Quiz" element={<Quiz />} />
            <Route path="AdminPanel" element={<AdminPanel />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<SignupPage />} />
          </Routes>
        </Router>
      </>
    );
  }