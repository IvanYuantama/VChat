import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import logo from "../assets/dashboard.png";

const Chat = () => {
  const [chatId, setChatId] = useState("");
  const [chats, setChats] = useState([]);
  const [error, setError] = useState("");
  const [newChat, setNewChat] = useState("");
  const [userId, setUserId] = useState(null); // state untuk menyimpan user_id

  // location state
  const location = useLocation();
  const currentUserId = location.state.user_id;

  useEffect(() => {
    // Fungsi untuk mendapatkan user_id dari local storage
    const username = localStorage.getItem("username");
    if (username) {
      fetchUserId(username);
    }
  }, []);

  useEffect(() => {
    // Panggil fetchChats awal saat komponen pertama kali dimuat
    fetchChats(chatId);

    // Setup polling untuk memperbarui chats setiap 5 detik
    const interval = setInterval(() => {
      fetchChats(chatId);
    }, 5000); // Misalnya setiap 5 detik

    // Membersihkan interval saat komponen tidak lagi digunakan
    return () => clearInterval(interval);
  }, [chatId]); // Dependensi chatId agar polling dijalankan saat chatId berubah

  const fetchUserId = async (username) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/getId/${username}`);
      setUserId(response.data.id);
    } catch (error) {
      console.error("Error fetching user_id:", error);
    }
  };

  const handleChange = (event) => {
    setChatId(event.target.value);
  };

  const handleAddChat = async (event) => {
    event.preventDefault();
    try {
      const timestamp = new Date().toISOString();
      await axios.post(`${import.meta.env.VITE_API_URL}/chat/add`, {
        chat_id: chatId,
        user_id: userId, // Menggunakan userId yang telah didapatkan
        isi: newChat,
        timestamp: timestamp,
      });
      // Setelah berhasil menambahkan, chatId tidak perlu direset karena kita ingin melihat perubahan chats
      setNewChat("");
      setError("");
    } catch (error) {
      console.error("Error adding chat:", error);
      setError("Failed to add chat");
    }
  };

  const fetchChats = async (chatId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/chat/${chatId}`);
      const chatsWithUserData = await Promise.all(
        response.data.map(async (chat) => {
          try {
            const userResponse = await axios.get(`${import.meta.env.VITE_API_URL}/user/${chat.user_id}`);
            return {
              ...chat,
              username: userResponse.data.username,
              img_url: userResponse.data.img_url, // Menambahkan img_url ke dalam objek chat
            };
          } catch (error) {
            console.error("Error fetching user data:", error);
            return chat; // Jika gagal mengambil data pengguna, kembalikan chat tanpa img_url
          }
        })
      );
      const sortedChats = chatsWithUserData.sort((a, b) => {
        // Sort by timestamp in descending order
        return new Date(b.timestamp) - new Date(a.timestamp);
      });
      setChats(sortedChats);
      setError("");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("Chat not found");
      } else {
        setError("Internal Server Error");
      }
      setChats([]);
    }
  };

  const handleInputChange = (event) => {
    setNewChat(event.target.value);
  };

  const handleGetChat = async (event) => {
    event.preventDefault();
    fetchChats(chatId);
  };

  const handleDeleteChat = async (chatId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:8463/chat/delete/${chatId}`);
          setChats(chats.filter((chat) => chat.id !== chatId));
          Swal.fire("Deleted!", "Your chat has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting chat:", error);
          setError("Failed to delete chat");
        }
      }
    });
  };

  return (
    <div className="mx-5">
      <div className="max-w-xl mx-auto mx- bg-white p-6 rounded-lg shadow-md my-10" style={{ backgroundColor: "#E6E6FA" }}>
        <img src={logo} alt="Logo RentLab" className="mx-auto w-45 h-20 object-cover my-5" />

        <form onSubmit={handleAddChat} className="mb-4">
          <label className="block mb-2" htmlFor="newChat">
            Add Chat:
          </label>
          <textarea id="newChat" value={newChat} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring focus:ring-indigo-500" rows="2" required></textarea>
          <button type="submit" className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500">
            Add Chat
          </button>
        </form>

        <form onSubmit={handleGetChat} className="mb-4">
          <label className="block mb-2" htmlFor="chatId">
            Enter Chat ID:
          </label>
          <input type="text" id="chatId" value={chatId} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500" required />
          <button type="submit" className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500">
            Get Chat
          </button>
        </form>

        <div className="chats-list" style={{ maxHeight: "400px", overflowY: "auto" }}>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {chats.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Chats Found:</h2>
              {chats.map((chat) => (
                <div key={chat.id} className="flex items-center bg-gray-100 p-4 rounded-md mb-4">
                  {chat.img_url ? (
                    <img src={chat.img_url} alt="Profile" className="w-10 h-10 rounded-full mr-4" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-4">
                      <span className="text-gray-600">?</span>
                    </div>
                  )}
                  <div>
                    <p>
                      <strong className="text-indigo-500">{chat.username}</strong>
                    </p>
                    <p>
                      <strong>Message:</strong> {chat.isi}
                    </p>
                  </div>
                  {userId === chat.user_id && (
                    <button onClick={() => handleDeleteChat(chat.id)} className="ml-auto px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-500">
                      Delete
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
