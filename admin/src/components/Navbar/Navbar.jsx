import React from "react";
import { useNavigate } from "react-router-dom";
import './Navbar.css';
import { assets } from "../../assets/assets";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login"); // กลับไปหน้า Login
  };

  return (
    <nav className="navbar">
      <img src={assets.logo} alt="" className="logo" />
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
