import React, { useState } from 'react'
// import './Signup.css'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../../firebase';
import { Background } from '../../Background';

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
    <div className="flex flex-col items-center justify-center min-h-screen w-full p-5">
      <div className="flex flex-col items-center w-[350px] max-w-full gap-7">
        <div className="flex flex-col justify-center items-center w-full gap-10">
          <h1 className="text-white text-3xl sm:text-4xl font-bold text-center mb-2 font-poppins">Sign Up</h1>
          <form onSubmit={handleSignUp} className="flex flex-col w-full gap-5">
            <div className="flex flex-col w-full gap-5">
              {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
              {success && <div className="text-green-500 text-sm mb-2">Account created successfully!</div>}
              
              <div className="flex justify-between items-center px-5 py-4 border border-[#E8E9F6] rounded w-full mb-1">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-white font-poppins text-base"
                />
              </div>
              <div className="flex justify-between items-center px-5 py-4 border border-[#E8E9F6] rounded w-full mb-1">
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-white font-poppins text-base"
                />
              </div>
              <div className="flex justify-between items-center px-5 py-4 border border-[#E8E9F6] rounded w-full mb-1">
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-white font-poppins text-base"
                />
                <img
                  src={passwordVisible ? eye_hidden : eye}
                  alt="toggle password visibility"
                  onClick={togglePasswordVisibility}
                  className="w-5 ml-2 cursor-pointer filter invert brightness-0"
                />
              </div>
              <div className="flex justify-between items-center px-5 py-4 border border-[#E8E9F6] rounded w-full mb-1">
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-white font-poppins text-base"
                />
                <img
                  src={confirmPasswordVisible ? eye_hidden : eye}
                  alt="toggle confirm password visibility"
                  onClick={toggleConfirmPasswordVisibility}
                  className="w-5 ml-2 cursor-pointer filter invert brightness-0"
                />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <button
                type="submit"
                disabled={loading}
                className={`w-full h-12 flex items-center justify-center rounded bg-gradient-to-r from-[#3525B0] to-[#3131BD] text-white font-poppins font-medium text-base cursor-pointer ${loading ? 'opacity-70' : ''}`}
              >
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>
              <div className="text-right text-white font-poppins text-sm font-normal mt-4">
                Already have an account?{' '}
                <span onClick={goToLogin} className="text-[#545EAA] font-medium cursor-pointer">
                  Sign In
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp