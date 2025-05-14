import React, { useState } from "react";
// import "./Login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

import eye from "../assets/eye.svg";
import eye_hidden from "../assets/eye_hidden.svg";

export const Login = ({ goToSignup, goToForgotPassword }) => {
  //   // State for tracking password visibility
  const [passwordVisible, setPasswordVisible] = useState(false);

  //   // Form input states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Toggle function
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  //   // Handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);
      // Sign in with email and password
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess(true);
      setLoading(false);

      // Clear form after successful login
      setEmail("");
      setPassword("");

      // You might want to redirect user to their dashboard here
      // For now we'll just show a success message
    } catch (error) {
      setLoading(false);
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        setError("Invalid email or password");
      } else if (error.code === "auth/invalid-email") {
        setError("Invalid email address");
      } else if (error.code === "auth/too-many-requests") {
        setError("Too many failed login attempts. Try again later.");
      } else {
        setError("An error occurred during login: " + error.message);
      }
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full p-5">
      <div className="flex flex-col items-center w-[350px] max-w-md gap-8">
        <div className="flex flex-col items-center justify-center w-full gap-10">
          <h1 className="text-white text-3xl sm:text-4xl font-bold text-center mb-2 font-poppins">
            Sign In
          </h1>
          <div className="flex flex-col w-full gap-5">
            {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
            {success && (
              <div className="text-green-500 text-sm mb-2">
                Logged in successfully!
              </div>
            )}

            <div className="flex justify-between items-center px-5 py-4 border border-[#E8E9F6] rounded w-full mb-1">
              <input
                type="text"
                placeholder="Email"
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
            <span
              className="text-white text-sm text-right font-light cursor-pointer font-poppins"
              onClick={goToForgotPassword}
            >
              Forgot Password?
            </span>
          </div>
        </div>

        <div className="flex flex-col w-full">
          <button
            onClick={handleLogin}
            disabled={loading}
            className={`w-full h-12 flex items-center justify-center rounded bg-gradient-to-r from-[#3525B0] to-[#3131BD] text-white font-poppins font-medium text-base cursor-pointer ${
              loading ? "opacity-70" : ""
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="text-right text-white font-poppins text-sm font-normal mt-4">
            Don't have an account?{" "}
            <span
              onClick={goToSignup}
              className="text-[#545EAA] font-medium cursor-pointer"
            >
              Sign Up
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
