import { useState, useEffect } from "react";
import { Routes, Route, useLocation} from 'react-router-dom';
import { auth } from "./firebase";
import "./App.css";
import { onAuthStateChanged } from "firebase/auth";

import { Background } from "./Background";
import SignUp from "./Components/LoginSignup/SignupPage.jsx";
import { signInWithEmailAndPassword } from "firebase/auth";
import GuestNavbar from "./Components/NavigationBar/guestNavbar";
import UserNavbar from "./Components/NavigationBar/userNavbar";
import Homepage from "./Components/Homepage/Homepage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setIsLoggedIn(!!user);
    });
    return unsubscribe;
  }, []);

  return (
    // Main App component
    // This component is used to display the main application
    <div>
      <NavbarWrapper isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<SignUp />} />
        {/* Add protected routes here */}
        {/* <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} /> */}
      </Routes>
    </div>
  );
}

// NavbarWrapper component to conditionally render the navbar based on authentication status
// NavbarWrapper component outside App
function NavbarWrapper({ isLoggedIn }) {
  const location = useLocation();

  // Hide navbar on signup page (add more routes if needed)
  const hideNavbarRoutes = ["/signup"];

  if (hideNavbarRoutes.includes(location.pathname)) {
    return null; // Hide navbar on these routes
  }

  return isLoggedIn ? <UserNavbar /> : <GuestNavbar />;
}

export default App;
