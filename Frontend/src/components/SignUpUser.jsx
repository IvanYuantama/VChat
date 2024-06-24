import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const navigate = useNavigate();

  const notify = () => toast("Welcome to our website!");

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!imageFile) {
      return "";
    }
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const uploadResponse = await axios.post(`${import.meta.env.VITE_API_URL}/cloudinary/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (uploadResponse.status === 200) {
        return uploadResponse.data;
      } else {
        throw new Error("Failed to upload image");
      }
    } catch (error) {
      console.error("Image upload failed", error);
      setMessage("Image upload failed");
      return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageUrl = await handleImageUpload();
    if (!imageUrl && imageFile) {
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/signup`, {
        username,
        password,
        img_url: imageUrl,
        bio,
      });
      setMessage(response.data);

      if (response.status === 201) {
        notify();
        navigate("/user/login");
      }
    } catch (error) {
      console.error(error);
      setMessage("Internal Server Error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen mx-5">
      <div className="p-8 rounded shadow-md w-full max-w-md flex flex-col justify-center" style={{ backgroundColor: "#E6E6FA" }}>
        <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: "#4B0082" }}>
          Sign Up
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="username" style={{ color: "#4B0082" }}>
              Username
            </label>
            <input type="text" id="username" className="w-full p-2 border-2 rounded" style={{ borderColor: "#BA55D3", color: "#4B0082" }} value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="mb-6">
            <label className="block mb-2" htmlFor="password" style={{ color: "#4B0082" }}>
              Password
            </label>
            <input type="password" id="password" className="w-full p-2 border-2 rounded" style={{ borderColor: "#BA55D3", color: "#4B0082" }} value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="image" style={{ color: "#4B0082" }}>
              Upload Image
            </label>
            <input type="file" id="image" className="w-full p-2 border-2 rounded" style={{ borderColor: "#BA55D3", color: "#4B0082" }} onChange={handleFileChange} />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="bio" style={{ color: "#4B0082" }}>
              Bio
            </label>
            <textarea id="bio" className="w-full p-2 border-2 rounded" style={{ borderColor: "#BA55D3", color: "#4B0082" }} value={bio} onChange={(e) => setBio(e.target.value)} />
          </div>
          {message && (
            <p className="mb-4 text-center" style={{ color: "#4B0082" }}>
              {message}
            </p>
          )}
          <button type="submit" className="w-full py-2 rounded hover:bg-[#9370DB] transition-colors duration-200" style={{ backgroundColor: "#BA55D3", color: "#FFFFFF" }}>
            Sign Up
          </button>
        </form>
        <a href="/user/login" className="mx-auto text-sm mt-5 text-[#BA55D3] hover:text-gray-500">
          I already have an account
        </a>
      </div>
    </div>
  );
};

export default SignUpUser;
