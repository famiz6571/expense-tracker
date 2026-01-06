import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="sticky top-0 z-50 bg-indigo-600 px-6 py-4 md:px-12 flex justify-between items-center border-b border-indigo-500">
      {/* Logo / Title */}
      <h2 className="text-xl md:text-2xl font-semibold text-white tracking-wide">
        Expense Tracker
      </h2>

      {/* Links / User Actions */}
      <div className="flex items-center space-x-3 md:space-x-4">
        {user ? (
          <>
            <span className="text-white/90 font-medium hidden sm:inline">
              Hi, {user.name}
            </span>

            <button
              onClick={logout}
              className="bg-white text-indigo-600 px-4 py-1.5 rounded-md font-medium hover:bg-gray-100 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-white/90 font-medium px-3 py-2 rounded-md hover:bg-indigo-500 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-white text-indigo-600 px-4 py-1.5 rounded-md font-semibold hover:bg-gray-100 transition"
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
