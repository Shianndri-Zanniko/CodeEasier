import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import CodeEasierLogo from "../assets/Navbar/CodeEasierLogo.svg";
import TestUser from "../assets/Navbar/TestUserLogo.svg";
import { useAuth } from "../contexts/authContext";

// Top navigation bar with profile menu
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const ref = useRef();
  const { logout } = useAuth();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close dropdown on route change for smooth UX
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
      navigate("/");
    } catch (err) {
      alert("Logout failed. Try again.");
      console.error(err);
    }
    setLoggingOut(false);
  };

  return (
    <nav className="bg-[#0A0D1E] shadow-md" aria-label="Main navigation">
      <div className="flex max-w-7xl w-full h-[90px] py-2 px-4 justify-between items-center mx-auto">
        <button
          className="flex items-center bg-transparent border-none p-0 m-0"
          onClick={() => navigate("/dashboard")}
          aria-label="Go to Dashboard"
        >
          <img
            src={CodeEasierLogo}
            alt="Code Easier Logo"
            className="h-7 w-auto transition-transform duration-200 hover:scale-105 cursor-pointer"
          />
        </button>

        <ul className="flex items-center space-x-8">
          <li>
            <Link to="/notes" className="text-gray-300 hover:text-white text-center font-lexend text-[15px] font-medium">
              Notes
            </Link>
          </li>
          <li>
            <Link to="/achievements" className="text-gray-300 hover:text-white text-center font-lexend text-[15px] font-medium">
              Achievement
            </Link>
          </li>
          <li>
            <div ref={ref} className="relative">
              <button
                className="focus:outline-none"
                aria-label="Open profile menu"
                aria-haspopup="menu"
                aria-expanded={open}
                onClick={() => setOpen(!open)}
              >
                <img
                  src={TestUser}
                  alt="Profile"
                  className="h-10 w-auto cursor-pointer transition-transform duration-200 hover:scale-110 rounded-full"
                />
              </button>
              {open && (
                <div
                  className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg z-10"
                  role="menu"
                  aria-label="User menu"
                >
                  <button
                    onClick={() => { setOpen(false); navigate("/profile"); }}
                    className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    role="menuitem"
                    tabIndex={0}
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    role="menuitem"
                    tabIndex={0}
                    disabled={loggingOut}
                  >
                    {loggingOut ? "Logging out..." : "Logout"}
                  </button>
                </div>
              )}
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
