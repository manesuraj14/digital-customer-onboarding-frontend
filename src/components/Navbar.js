import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import useDarkMode from "../hooks/useDarkMode";
import useAuth from "../services/useAuth";
import API from "../services/api";


export default function Navbar() {

  const location = useLocation();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useDarkMode();
  const { user, logout } = useAuth();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const hideNavbar =
    ["/login", "/register", "/forgot-password"].includes(location.pathname);

  const handleLogout = async () => {
  try {
    // 🔥 Call backend logout to invalidate token
    await API.post("/api/user/logout");
  } catch (err) {
    console.log("Logout API error (ignore if backend offline)");
  }

  // 🔥 Clear frontend session
  logout();                  // context logout
  localStorage.removeItem("user");
  localStorage.removeItem("jwtToken");

  navigate("/login");
};


  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (hideNavbar) return null;

  return (
    <nav className="fixed top-0 w-full z-50 bg-white dark:bg-gray-900 backdrop-blur shadow">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">


        {/* LOGO */}
       
<Link
  to="/"
  className="flex items-center gap-3 text-xl font-bold 
             text-indigo-600 dark:text-indigo-400"
>
  <img
    src="/logo.png"
    alt="logo"
    className="h-9 w-9 object-contain"
  />

  <span className="whitespace-nowrap">
    Digital Customer Onboarding
  </span>
</Link>


        {/* MENU */}
        <div className="flex items-center gap-6">

          <Link to="/home" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600">
            Home
          </Link>

          <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600">
            About
          </Link>

          <Link to="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600">
            Dashboard
          </Link>

          {/* AUTH AREA */}
          {!user ? (
            <>
              <Link to="/login" className="text-indigo-600 font-semibold">
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="relative" ref={dropdownRef}>

              {/* PROFILE ICON */}
              <button
                onClick={() => setOpen(!open)}
                className="w-10 h-10 rounded-full bg-indigo-500 text-white
                           flex items-center justify-center font-bold"
              >
                {user.email?.charAt(0).toUpperCase()}
              </button>

              {/* DROPDOWN */}
              {open && (
                <div className="absolute right-0 mt-3 w-60 bg-white dark:bg-gray-800
                                border dark:border-gray-700 rounded-lg shadow-lg overflow-hidden">

                  <div className="px-4 py-3 border-b dark:border-gray-700">
                    <p className="text-sm text-gray-500">Signed in as</p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                      {user.email}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setOpen(false);
                      navigate("/profile");
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100
                               dark:hover:bg-gray-700 text-sm"
                  >
                    👤 Edit Profile
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600
                               hover:bg-red-50 dark:hover:bg-red-900/20 text-sm"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* DARK MODE */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700
                       flex items-center justify-center transition"
            title="Toggle Dark Mode"
          >
            {darkMode ? "🌙" : "☀️"}
          </button>

        </div>
      </div>
    </nav>
  );
}
