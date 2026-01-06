import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 px-6 py-4 md:px-12 flex justify-between items-center">
      {/* Logo / Title */}
      <h2 className="text-2xl font-bold text-white tracking-wide">
        Expense Tracker
      </h2>

      {/* Links / User Actions */}
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <span className="text-white/90 font-medium hidden sm:inline">
              Hi, {user.name}
            </span>

            <button
              onClick={logout}
              className="bg-white/10 text-white px-4 py-2 rounded-md border border-white/20 hover:bg-white/20 transition backdrop-blur-md"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-white/90 font-medium px-3 py-2 rounded-md hover:bg-white/10 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-white text-indigo-600 px-4 py-2 rounded-md font-semibold hover:bg-gray-100 transition"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
