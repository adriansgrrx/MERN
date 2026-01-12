import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import RateLimitedUI from "../components/RateLimitedUI.jsx";
import NoteCard from "../components/NoteCard.jsx";
import NotesNotFound from "../components/NotesNotFound.jsx";
import GetStarted from "../components/GetStarted.jsx";
import api from "../lib/axios.js";
import toast from "react-hot-toast";
import { Link } from "react-router";
import { Loader, LoaderIcon } from "lucide-react";

const HomePage = ({ user, error, setUser }) => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  // console.log(user);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error fetching notes.", error);
        if (error.response.status == 429) {
          setIsRateLimited(true);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar user={user} setUser={setUser} />

      {isRateLimited && <RateLimitedUI />}

      {error && <p>{error}</p>}

      {/* {loading && (
        <div className="max-w-6xl mx-auto flex items-center justify-center text-primary">
          <LoaderIcon class="size-5"/>
        </div>
      )} */}

      {user ? (
        <div className="max-w-6xl mx-auto p-4 mt-6">
          {/* welcome, {user.username}, {user.email} */}
          {notes.length > 0 && !isRateLimited && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map((note) => (
                <div>
                  <NoteCard key={note._id} note={note} setNotes={setNotes} />
                </div>
              ))}
            </div>
          )}
          {notes.length === 0 && !isRateLimited && !loading && (
            <NotesNotFound username={user.username} />
          )}
        </div>
      ) : (
        <div className="max-w-6xl mx-auto p-4 mt-6">
          <GetStarted />
        </div>
      )}
    </div>
  );
};

export default HomePage;
