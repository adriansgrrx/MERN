import React from "react";
import { Link } from "react-router";
import { Plus } from "lucide-react";

const Navbar = ({ user, setUser }) => {
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
            <div className="flex gap-2">
              <Link
                to={"/create"}
                className="btn btn-primary text-lg text-amber-100 font-medium font-mono gap-2 tracking-wide"
              >
                <span>New Note</span>
                <Plus className="size-5" />
              </Link>
              <div className="avatar online placeholder">
                <div className="bg-neutral text-neutral-content w-12 rounded-full">
                  <span className="text-sm">UI</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                to={"/login"}
                className="btn btn-primary text-lg text-amber-100 font-medium font-mono gap-2 tracking-wide"
              >
                <span>Sign In</span>
                <Plus className="size-5" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
