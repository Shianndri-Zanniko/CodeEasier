import React, { useState } from 'react'
import './ForgotPassword.css'
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../../firebase';

export const ForgotPassword = ({ goToLogin }) => {
  // Form input states
  const [email, setEmail] = useState('');
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  // Handle password reset
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!email) {
      setError('Email is required');
      return;
    }
    
    try {
      setLoading(true);
      // Send password reset email
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
      setLoading(false);
      
      // Clear form after successful submission
      setEmail('');
      
      // Optionally redirect to login after some time
      setTimeout(() => {
        goToLogin();
      }, 3000);
      
    } catch (error) {
      setLoading(false);
      if (error.code === 'auth/user-not-found') {
        setError('No user found with this email address');
      } else if (error.code === 'auth/invalid-email') {
        setError('Invalid email address');
      } else {
        setError('An error occurred: ' + error.message);
      }
      console.error(error);
    }
  };

  return (
    <div className="forgot-password-main-container">
      <div className="forgot-password-parent-container">
        <div className="forgot-password-top">
          <div className="forgot-password-title">Reset Password</div>
          <div className="forgot-password-subtitle">
            Enter your email address and we'll send you a link to reset your password.
          </div>
          <div className="forgot-password-inputs">
            {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
            {success && (
              <div style={{ color: 'green', marginBottom: '10px' }}>
                Password reset link sent! Check your email inbox.
              </div>
            )}
            
            <div className="forgot-password-input">
              <input 
                type="text" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="forgot-password-button-container">
          <div 
            className="forgot-password-button" 
            onClick={handleResetPassword}
            style={{ opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </div>
          <div className="back-to-login">
            Remember your password? <span onClick={goToLogin}>Sign In</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
