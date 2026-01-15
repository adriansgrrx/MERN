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

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-primary">
        <LoaderIcon className="size-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar user={user} setUser={setUser} />

      {isRateLimited && <RateLimitedUI />}
      {error && <p>{error}</p>}

      {user ? (
        <div className="max-w-6xl mx-auto p-4 mt-6">
          {/* Skeleton Loading — ONLY for logged-in users */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-40 rounded-lg bg-muted animate-pulse"
                />
              ))}
            </div>
          )}

          {/* Notes */}
          {!loading && notes.length > 0 && !isRateLimited && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-300">
              {notes.map((note) => (
                <NoteCard key={note._id} note={note} setNotes={setNotes} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && notes.length === 0 && !isRateLimited && (
            <NotesNotFound username={user.username} />
          )}
        </div>
      ) : (
        /* NO loading UI here */
        <div className="max-w-6xl mx-auto p-4 mt-6">
          <GetStarted />
        </div>
      )}
    </div>
  );
};

export default HomePage;
