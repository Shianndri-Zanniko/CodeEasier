import { useState } from 'react'
import './App.css'
import { Background } from './Background'
import { SignUp } from './Components/LoginSignup/Signup'
import Login from './Components/LoginSignup/Login'
import ForgotPassword from './Components/LoginSignup/ForgotPassword'

function App() {
  // State to control which component to display
  const [showLogin, setShowLogin] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Toggle functions
  const navigateToLogin = () => {
    setShowLogin(true);
    setShowForgotPassword(false);
  };
  
  const navigateToSignup = () => {
    setShowLogin(false);
    setShowForgotPassword(false);
  };
  
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
        <Login goToSignup={navigateToSignup} goToForgotPassword={navigateToForgotPassword} />
      ) : (
        <SignUp goToLogin={navigateToLogin} />
      )}
    </div>
  )
}

export default App
