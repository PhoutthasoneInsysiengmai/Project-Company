import React, { useState } from "react";
import axios from "axios";
import './adminLogin.css';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminLogin = ({ url }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${url}/api/admin/login`, {
        username,
        password,
      });

      if (res.data.success) {
        // ✅ บันทึก token ไว้ localStorage
        localStorage.setItem("adminToken", res.data.token);

        toast.success("Login Success!");
        navigate("/add"); // ✅ เปลี่ยนเส้นทางไปหน้า admin
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Server Error");
    }
  };

  return (
    <div className="admin-login">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
        /><br/><br/>
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        /><br/><br/>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
