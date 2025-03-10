import { useState } from 'react'
import './App.css'
import { Background } from './Background'
import { SignUp } from './Components/LoginSignup/Signup'
import Login from './Components/LoginSignup/Login'

function App() {
  // State to control which component to display
  const [showLogin, setShowLogin] = useState(false);

  // Toggle functions
  const navigateToLogin = () => setShowLogin(true);
  const navigateToSignup = () => setShowLogin(false);

  return (
    <div>
      <Background />
      {showLogin ? 
        <Login goToSignup={navigateToSignup} /> : 
        <SignUp goToLogin={navigateToLogin} />
      }
    </div>
  )
}

export default App
