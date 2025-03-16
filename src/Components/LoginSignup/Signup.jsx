import React, { useState } from 'react'
import './Signup.css'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../../firebase';

import eye from '../assets/eye.svg'
import eye_hidden from '../assets/eye_hidden.svg'

export const SignUp = ({ goToLogin }) => {
  // State for tracking password visibility
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  
  // Form input states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Toggle functions
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  }

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  }
  
  // Handle form submission
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!fullName || !email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password should be at least 6 characters');
      return;
    }
    
    try {
      setLoading(true);
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile with full name
      await updateProfile(userCredential.user, { 
        displayName: fullName 
      });
      
      setSuccess(true);
      setLoading(false);
      
      // Clear form after successful signup
      setFullName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      
      // Optionally redirect to login
      setTimeout(() => {
        goToLogin();
      }, 2000);
      
    } catch (error) {
      setLoading(false);
      if (error.code === 'auth/email-already-in-use') {
        setError('Email is already in use');
      } else if (error.code === 'auth/invalid-email') {
        setError('Invalid email address');
      } else {
        setError('An error occurred during signup: ' + error.message);
      }
      console.error(error);
    }
  };

  return (
    <div className="singup-main-container">
      <div className="singup-parent-container">
        <div className="singup-top">
          <div className="singup-title">Sign Up</div>
          <div className="singup-inputs">
            {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
            {success && <div style={{ color: 'green', marginBottom: '10px' }}>Account created successfully!</div>}
            
            <div className="singup-input">
              <input 
                type="text" 
                placeholder="Full Name" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="singup-input">
              <input 
                type="text" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="singup-input">
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
            <div className="singup-input">
              <input 
                type={confirmPasswordVisible ? "text" : "password"} 
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <img 
                src={confirmPasswordVisible ? eye_hidden : eye} 
                alt="toggle password visibility" 
                className="eye-icon" 
                onClick={toggleConfirmPasswordVisibility}
              />
            </div>
          </div>
        </div>
        <div className="signup-button-container">
          <div 
            className="signup-button" 
            onClick={handleSignUp}
            style={{ opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </div>
          <div className="alrd-have-acc">
            Already have an account? <span onClick={goToLogin}>Sign In</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp