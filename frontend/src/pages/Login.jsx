import React, { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import api from "../lib/axios";
import { Link } from "react-router";

function Login({ setUser }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/users/login", formData);
      localStorage.setItem("token", res.data.token);
      toast.success("Welcome back!");
      setUser(res.data);
      navigate("/");
    } catch (error) {
      if (error.response?.status === 429) {
        console.log("Failed to log in.", error);
        toast.error("Slow down! You're logging in many times in a row.", {
          duration: 4000,
          icon: "🚦",
        });
      } else {
        console.log("Failed to log in.", error);
        toast.error("Failed to log in.");
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
              <div className="card-title text-2xl mt-4 mb-4 justify-center">
                Log In
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ex: vltiz@example.com"
                    className="input input-bordered"
                    required
                    autoComplete="off"
                  />
                </div>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Your password"
                    className="input input-bordered"
                    required
                    autoComplete="off"
                  />
                </div>

                <div className="flex text-sm items-center justify-center mt-8">
                  <p>No account yet?</p>
                  <Link to={'/register'} className="text-error">Create account</Link>
                </div>

                <div className="card-actions">
                  <button
                    className="btn btn-primary text-amber-100 w-full mt-4"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Log in"}
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

export default Login;
