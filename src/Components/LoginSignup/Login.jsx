import React, { useState } from 'react'
import './Login.css'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';

import eye from '../assets/eye.svg'
import eye_hidden from '../assets/eye_hidden.svg'

export const Login = ({ goToSignup, goToForgotPassword }) => {
  // State for tracking password visibility
  const [passwordVisible, setPasswordVisible] = useState(false);
  
  // Form input states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Toggle function
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  }
  
  // Handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    
    try {
      setLoading(true);
      // Sign in with email and password
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess(true);
      setLoading(false);
      
      // Clear form after successful login
      setEmail('');
      setPassword('');
      
      // You might want to redirect user to their dashboard here
      // For now we'll just show a success message
      
    } catch (error) {
      setLoading(false);
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        setError('Invalid email or password');
      } else if (error.code === 'auth/invalid-email') {
        setError('Invalid email address');
      } else if (error.code === 'auth/too-many-requests') {
        setError('Too many failed login attempts. Try again later.');
      } else {
        setError('An error occurred during login: ' + error.message);
      }
      console.error(error);
    }
  };

  return (
    <div className="login-main-container">
      <div className="login-parent-container">
        <div className="login-top">
          <div className="login-title">Sign In</div>
          <div className="login-inputs">
            {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
            {success && <div style={{ color: 'green', marginBottom: '10px' }}>Logged in successfully!</div>}
            
            <div className="login-input">
              <input 
                type="text" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="login-input">
              <input 
                type={passwordVisible ? "text" : "password"} 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <img 
                src={passwordVisible ? eye_hidden : eye} 
                alt="toggle password visibility" 
                className="eye-icon" 
                onClick={togglePasswordVisibility}
              />
            </div>
            <span className="forgot-pass" onClick={goToForgotPassword}>Forgot Password?</span>
          </div>
        </div>
        <div className="login-button-container">
          <div 
            className="login-button" 
            onClick={handleLogin}
            style={{ opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </div>
          <div className="dont-have-acc">
            Don't have an account? <span onClick={goToSignup}>Sign Up</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login