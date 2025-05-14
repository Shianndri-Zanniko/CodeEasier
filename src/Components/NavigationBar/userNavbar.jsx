import { Link } from "react-router-dom";
import CodeEasierLogo from "../assets/Navbar/CodeEasierLogo.svg";
import HomeLogo from "../assets/Navbar/HomeLogo.svg";
import TestUser from "../assets/Navbar/TestUserLogo.svg";

// User Navbar UI (With no Authentication)
// This component is used to display the navigation bar for authenticated users
const Navbar = () => {
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
            <Link to="/"className="flex transition-transform duration-200 hover:scale-110">
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
            <Link to="/" className="text-black-300 hover:text-white text-center font-lexend text-[15px] font-medium"> About Us </Link>
          </li>
          {/* Profile Button, Logic doesn't apply yet*/}
          <li>
            <Link to="/" className="flex transition-transform duration-200 hover:scale-110">
              <img src={TestUser} alt="test user logo" className="h-10 w-auto"/>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
