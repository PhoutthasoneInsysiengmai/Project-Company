import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const RequireAdminAuth = ({ children }) => {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ถ้ามี children → แสดง Layout
  // หรือถ้าใช้ <Outlet /> → ใช้ nested route ได้
  return children || <Outlet />;
};

export default RequireAdminAuth;
