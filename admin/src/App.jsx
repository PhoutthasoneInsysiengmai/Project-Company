import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Add from './pages/Add/Add.jsx';
import List from "./pages/List/List.jsx";
import Order from "./pages/Order/Orders.jsx";
import AdminLogin from "./pages/LoginAdmin/AdminLogin.jsx";
import RequireAdminAuth from "./contact/RequireAdminAuth.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const url = "http://localhost:4000";

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<AdminLogin url={url} />} />

        {/* ✅ Protect Routes ด้วย RequireAdminAuth */}
        <Route
          path="/*"
          element={
            <RequireAdminAuth>
              <div>
                <Navbar />
                <hr />
                <div className="app-content">
                  <Sidebar />
                  <Routes>
                    <Route path="/add" element={<Add url={url} />} />
                    <Route path="/list" element={<List url={url} />} />
                    <Route path="/orders" element={<Order url={url} />} />
                  </Routes>
                </div>
              </div>
            </RequireAdminAuth>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
