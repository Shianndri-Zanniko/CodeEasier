import React, { useState } from 'react'
import './Signup.css'

import eye from '../assets/eye.svg'
import eye_hidden from '../assets/eye_hidden.svg'

export const SignUp = ({ goToLogin }) => {
  // State for tracking password visibility
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  // Toggle functions
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  }

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  }

  return (
    <div className="singup-main-container">
      <div className="singup-parent-container">
        <div className="singup-top">
          <div className="singup-title">Sign Up</div>
          <div className="singup-inputs">
            <div className="singup-input">
              <input type="text" placeholder="Full Name" />
            </div>
            <div className="singup-input">
              <input type="text" placeholder="Email" />
            </div>
            <div className="singup-input">
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
            <div className="singup-input">
              <input 
                type={confirmPasswordVisible ? "text" : "password"} 
                placeholder="Confirm Password" 
              />
              <img 
                src={confirmPasswordVisible ? eye_hidden : eye} 
                alt="toggle password visibility" 
                className="eye-icon" 
                onClick={toggleConfirmPasswordVisibility}
              />
            </div>
            <span className="forgot-pass">Forgot Password?</span>
          </div>
        </div>
        <div className="signup-button-container">
          <div className="signup-button">Sign Up</div>
          <div className="alrd-have-acc">
            Already have an account? <span onClick={goToLogin}>Sign In</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp