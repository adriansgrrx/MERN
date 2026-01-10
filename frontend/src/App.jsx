import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailsPage from "./pages/NoteDetailsPage";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import axios from "axios";
import toast from "react-hot-toast";

const App = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  // console.log(user);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await axios.get("api/users/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(res.data);
        } catch (error) {
          setError("Failed to fetch data.");
          localStorage.removeItem("token");
        }
      }
    };
    fetchUser();
  }, []);

  return (
    <div data-theme="retro">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<CreateAccount />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailsPage />} />
      </Routes>
    </div>
  );
};

export default App;
