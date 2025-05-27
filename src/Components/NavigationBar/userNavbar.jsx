import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import CodeEasierLogo from "../assets/Navbar/CodeEasierLogo.svg";
import HomeLogo from "../assets/Navbar/HomeLogo.svg";
import TestUser from "../assets/Navbar/TestUserLogo.svg";

// User Navbar UI (With no Authentication)
// This component is used to display the navigation bar for authenticated users
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const ref = useRef();
  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <nav className="bg-[#0A0D1E] shadow-md">
      <div className="flex width-[1441px] height-[123px] py-2 px-4 justify-between items-center">
        {/* Navbar Logo CodeEasier */}
        <div className="flex item-center">
          <img
            src={CodeEasierLogo}
            alt="Code Easier Logo"
            className="h-7 w-auto transition-transform duration-200 hover:scale-105 cursor-pointer"
          />
        </div>

        {/* Navbar item */}
        <ul className="flex items-center space-x-8">
          <li>
            <Link to="/" className="flex transition-transform duration-200 hover:scale-110">
              <img src={HomeLogo} alt="Home logo" className="h-8 w-auto" />
            </Link>
          </li>
          {/* Achievement Button */}
          <li>
            <Link to="/" className="text-gray-300 hover:text-white text-center font-lexend text-[15px] font-medium">Achievement
            </Link>
          </li>
          {/* About us button */}
          <li>
            <Link to="/" className="text-gray-300 hover:text-white text-center font-lexend text-[15px] font-medium">About Us</Link>
          </li>
          {/* Profile Button, Logic doesn't apply yet*/}
          <li>
            <div ref={ref} className="relative">
              <img
                src={TestUser}
                alt="profile icon"
                className="h-10 w-auto cursor-pointer transition-transform duration-200 hover:scale-110"
                onClick={() => setOpen(!open)}
              />
              {open && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg z-10">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Logout
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
