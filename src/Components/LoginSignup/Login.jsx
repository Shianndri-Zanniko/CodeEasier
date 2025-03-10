import React, { useState } from 'react'
import './Login.css'

import eye from '../assets/eye.svg'
import eye_hidden from '../assets/eye_hidden.svg'

export const Login = ({ goToSignup }) => {
  // State for tracking password visibility
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Toggle function
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  }

  return (
    <div className="login-main-container">
      <div className="login-parent-container">
        <div className="login-top">
          <div className="login-title">Sign In</div>
          <div className="login-inputs">
            <div className="login-input">
              <input type="text" placeholder="Email" />
            </div>
            <div className="login-input">
              <input 
                type={passwordVisible ? "text" : "password"} 
                placeholder="Password" 
              />
              <img 
                src={passwordVisible ? eye_hidden : eye} 
                alt="toggle password visibility" 
                className="eye-icon" 
                onClick={togglePasswordVisibility}
              />
            </div>
            <span className="forgot-pass">Forgot Password?</span>
          </div>
        </div>
        <div className="login-button-container">
          <div className="login-button">Login</div>
          <div className="dont-have-acc">
            Don't have an account? <span onClick={goToSignup}>Sign Up</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login