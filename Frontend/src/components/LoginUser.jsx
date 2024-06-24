import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();

  const notify = () => toast("Welcome back!");

  const fetchUserId = async (username) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/getId/${username}`);
      setUserId(response.data.id);
    } catch (error) {
      console.error("Error fetching user_id:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/login`, {
        username,
        password,
      });
      if (response.status === 200) {
        // Simpan username ke local storage setelah login berhasil
        localStorage.setItem("username", username);

        notify();
        fetchUserId(username);
        let url = "/chat";
        // Navigate to /chat after successful login
        navigate(url, {
          state: {
            user_id: userId,
          },
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setMessage("Password salah");
      } else {
        setMessage("Username tidak ditemukan");
      }
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="p-8 rounded shadow-md w-full max-w-md flex flex-col justify-center" style={{ backgroundColor: "#E6E6FA" }}>
        <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: "#4B0082" }}>
          Login User
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="username">
              Username
            </label>
            <input type="text" id="username" className="w-full p-2 border-2 rounded" style={{ borderColor: "#BA55D3", color: "#4B0082" }} value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="mb-6">
            <label className="block mb-2" htmlFor="password">
              Password
            </label>
            <input type="password" id="password" className="w-full p-2 border-2 rounded" style={{ borderColor: "#BA55D3", color: "#4B0082" }} value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {message && (
            <p className="mb-4 text-center" style={{ color: "#4B0082" }}>
              {message}
            </p>
          )}
          <button type="submit" className="w-full py-2 rounded hover:bg-[#9370DB] transition-colors duration-200" style={{ backgroundColor: "#BA55D3", color: "#FFFFFF" }}>
            Login
          </button>
        </form>

        <div className="text-center mt-4">
          <a href="/user/signup" className="text-sm duration-150 hover:text-gray-500" style={{ color: "#BA55D3" }}>
            or Sign Up for new user
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginUser;
