import { useState } from "react";
import { auth } from "../../firebase";

import { Background } from "../../Background";
import SignUp from "./Signup.jsx";
import Login from "./Login.jsx";
import ForgotPassword from "./ForgotPassword";
import { signInWithEmailAndPassword } from "firebase/auth";

function SignupPage() {
// LOGIN & SIGNUP
// State for tracking password visibility
const [showLogin, setShowLogin] = useState(false);
const [showForgotPassword, setShowForgotPassword] = useState(false);

// Toggle function from login to signup
const navigateToLogin = () => {
  setShowLogin(true);
  setShowForgotPassword(false);
};
// Toggle function from signup to login
const navigateToSignup = () => {
  setShowLogin(false);
  setShowForgotPassword(false);
};
//Toggle function from login to forgot password
const navigateToForgotPassword = () => {
  setShowLogin(false);
  setShowForgotPassword(true);
};

  return (
    <div>
    <Background />
      {showForgotPassword ? (
        <ForgotPassword goToLogin={navigateToLogin} />
      ) : showLogin ? (
        <Login
          goToSignup={navigateToSignup}
          goToForgotPassword={navigateToForgotPassword}
        />
      ) : (
        <SignUp goToLogin={navigateToLogin} />
      )}
    </div>
  );
}

export default SignupPage;
