import React, { useState } from "react";
import { useNavigate } from "react-router";

function CreateAccount() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(title);
    console.log(content);

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required.");
      return;
    }

    if (title.length < 8) {
      toast.error("Your note title is too short.");
      return;
    }

    if (content.length < 10) {
      toast.error("Your note content is too short.");
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes", {
        title,
        content,
      });
      toast.success("Note created successfully!");
      navigate("/");
    } catch (error) {
      if (error.response?.status === 429) {
        console.log("Failed to create note.", error);
        toast.error("Slow down! You're creating notes too fast.", {
          duration: 4000,
          icon: "🚦",
        });
      } else {
        console.log("Failed to create note.", error);
        toast.error("Failed to create note.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-lg mx-auto">
          <div className="card bg-base-100 font-mono">
            <div className="card-body">
              <div className="card-title text-2xl mt-4 mb-4 justify-center">Create Account</div>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Username</span>
                  </label>
                  <input
                    type="text"
                    placeholder="ex: vlitz03"
                    className="input input-bordered"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="ex: vltiz@example.com"
                    className="input input-bordered"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Your password"
                    className="input input-bordered"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                  />
                </div>

                <div className="card-actions justify-end">
                  <button
                    className="btn btn-primary text-amber-100 w-full mt-4"
                    disabled={loading}
                  >
                    {loading ? "Working on it..." : "Register"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
