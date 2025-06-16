import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../../services/firebase';
import { useNavigate } from "react-router-dom";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

import eye from '../../assets/icons/eye.svg';
import eye_hidden from '../../assets/icons/eye_hidden.svg';

// Registration form for new users

// Map Firebase error codes to user-friendly messages
const getFirebaseRegisterError = (code) => {
  switch (code) {
    case 'auth/email-already-in-use':
      return 'Email is already in use';
    case 'auth/invalid-email':
      return 'Invalid email address';
    case 'auth/weak-password':
      return 'Password is too weak';
    default:
      return 'An error occurred during signup.';
  }
};

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => setPasswordVisible(v => !v);
  const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(v => !v);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password || !confirmPassword) {
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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Create user profile in Firestore with profileComplete: false
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email: userCredential.user.email,
        firstName: "",
        lastName: "",
        country: "",
        dob: "",
        institution: "",
        createdAt: serverTimestamp(),
        profileComplete: false,
        exp: 0,
        level: 1,
        completedCourses:[],
        achievements: {},
        streak: 0,
        longestStreak: 0,
      });

      setSuccess(true);
      setLoading(false);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (error) {
      setLoading(false);
      setError(getFirebaseRegisterError(error.code));
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-b from-[#1e1e30] to-[#29296b] p-4">
      <div className="bg-white/5 shadow-lg rounded-2xl w-[350px] max-w-full flex flex-col items-center gap-6 p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white font-poppins mb-4 text-center">
          Sign Up to <span className="text-[#6e74ff]">CodeEasier</span>
        </h1>
        <form onSubmit={handleSignUp} className="flex flex-col w-full gap-4" autoComplete="on">
          {error && (
            <div
              className="text-red-400 bg-red-50/10 rounded p-2 text-center text-sm mb-2"
              role="alert"
              aria-live="assertive"
            >
              {error}
            </div>
          )}
          {success && (
            <div
              className="text-green-400 bg-green-50/10 rounded p-2 text-center text-sm mb-2"
              role="alert"
              aria-live="polite"
            >
              Account created successfully!
            </div>
          )}

          <input
            aria-label="Email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            className="bg-white/10 text-white border border-white/20 rounded px-4 py-3 w-full outline-none focus:border-[#6e74ff] font-poppins"
            required
            disabled={loading}
            autoComplete="email"
          />

          <div className="relative">
            <input
              aria-label="Password"
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              className="bg-white/10 text-white border border-white/20 rounded px-4 py-3 w-full outline-none focus:border-[#6e74ff] font-poppins pr-10"
              required
              disabled={loading}
              autoComplete="new-password"
            />
            <button
              type="button"
              tabIndex={0}
              aria-label={passwordVisible ? "Hide password" : "Show password"}
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              <img
                src={passwordVisible ? eye_hidden : eye}
                alt={passwordVisible ? "Hide password" : "Show password"}
                className="w-5 h-5"
              />
            </button>
          </div>

          <div className="relative">
            <input
              aria-label="Confirm Password"
              type={confirmPasswordVisible ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError('');
              }}
              className="bg-white/10 text-white border border-white/20 rounded px-4 py-3 w-full outline-none focus:border-[#6e74ff] font-poppins pr-10"
              required
              disabled={loading}
              autoComplete="new-password"
            />
            <button
              type="button"
              tabIndex={0}
              aria-label={confirmPasswordVisible ? "Hide password" : "Show password"}
              onClick={toggleConfirmPasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              <img
                src={confirmPasswordVisible ? eye_hidden : eye}
                alt={confirmPasswordVisible ? "Hide password" : "Show password"}
                className="w-5 h-5"
              />
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full h-12 flex items-center justify-center rounded bg-gradient-to-r from-[#3525B0] to-[#3131BD] text-white font-poppins font-semibold text-base transition-opacity ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            aria-busy={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="text-center text-white font-poppins text-sm mt-4">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-[#6e74ff] font-semibold underline hover:text-[#3131BD] ml-1 transition-all"
            tabIndex={0}
            role="button"
            disabled={loading}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
