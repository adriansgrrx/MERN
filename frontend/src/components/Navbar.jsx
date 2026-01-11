import React from "react";
import { Link, useNavigate } from "react-router";
import { Plus, LogOut } from "lucide-react";
import toast from "react-hot-toast";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <header className="bg-base-100 border-base-content/10">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <img src="/assets/langnote.png" alt="logo" className="h-9 w-9" />
            <h1 className="text-3xl font-bold text-primary font-mono tracking-tighter">
              LangNote
            </h1>
          </div>

          {user ? (
            <div className="flex items-center gap-3">
              <Link
                to="/create"
                className="btn btn-primary text-lg text-amber-100 font-medium font-mono gap-2 tracking-wide"
              >
                <span>New Note</span>
                <Plus className="size-5" />
              </Link>

              {/* Avatar Dropdown */}
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  className="avatar online placeholder cursor-pointer"
                >
                  <div className="bg-neutral text-neutral-content w-12 rounded-full">
                    <span className="text-lg">
                      {user.username?.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                </div>

                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-primary/10 rounded-box w-44 mt-4"
                >
                  <li className="text-xs text-gray-500 px-2 py-1 mb-4">
                    {user.email}
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="btn btn-primary flex items-center gap-2"
                    >
                      <LogOut className="size-4" />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <Link
              to="/register"
              className="btn btn-primary text-lg text-amber-100 font-medium font-mono gap-2 tracking-wide"
            >
              <span>Get Started</span>
              <Plus className="size-5" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
