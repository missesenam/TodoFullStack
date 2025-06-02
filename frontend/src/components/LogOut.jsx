import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "../slices/LogInSlice";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/signout",
        {},
        { withCredentials: true }
      );
      dispatch(logout());
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: "10px 20px",
        backgroundColor: "#e74c3c",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontWeight: "bold",
        fontSize: "16px",
        transition: "background-color 0.3s",
      }}
      onMouseEnter={(e) => (e.target.style.backgroundColor = "#c0392b")}
      onMouseLeave={(e) => (e.target.style.backgroundColor = "#e74c3c")}
    >
      Logout
    </button>
  );
};

export default Logout;
