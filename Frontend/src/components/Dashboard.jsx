import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/dashboard.png";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4">
      <div className="bg-[#E6E6FA] p-6 rounded-lg shadow-md text-center max-w-md w-full">
        <img src={logo} alt="Logo RentLab" className="mx-auto w-45 h-20 object-cover my-10" />
        <p className="mb-10 px-4" style={{ color: "#4B0082" }}>
          Chat dengan teman, pasangan, ataupun keluarga anda menjadi lebih mudah dengan VChat
        </p>
        <div className="flex flex-col space-y-3">
          <Link to="/user/login" className="py-2 px-4 rounded-md hover:bg-[#9370DB] transition-colors duration-200" style={{ backgroundColor: "#BA55D3", color: "#FFFFFF" }}>
            Login
          </Link>
          <p className="text-sm" style={{ color: "#4B0082" }}>
            Don't have account?
          </p>
          <Link to="/user/signup" className="py-2 px-4 rounded-md hover:bg-[#9370DB] transition-colors duration-200" style={{ backgroundColor: "#4B0082", color: "#FFFFFF" }}>
            Sign Up
          </Link>
        </div>
        <p className="mt-5 text-sm" style={{ color: "#4B0082" }}>
          © Ivan Yuantama - 2024
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
