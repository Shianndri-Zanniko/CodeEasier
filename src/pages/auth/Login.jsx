import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useNavigate } from "react-router-dom";

// Login form with email/password authentication

import eye from "../../assets/icons/eye.svg";
import eye_hidden from "../../assets/icons/eye_hidden.svg";

// Map Firebase error codes to user-friendly messages
const getFirebaseLoginError = (code) => {
  switch (code) {
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Invalid email or password";
    case "auth/invalid-email":
      return "Invalid email address";
    case "auth/too-many-requests":
      return "Too many failed login attempts. Try again later.";
    default:
      return "An error occurred during login.";
  }
};

const Login = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => setPasswordVisible(v => !v);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      navigate("/dashboard");
    } catch (error) {
      setError(getFirebaseLoginError(error.code));
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-b from-[#1e1e30] to-[#29296b] p-4">
      <div className="bg-white/5 shadow-lg rounded-2xl w-[350px] max-w-full flex flex-col items-center gap-6 p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white font-poppins mb-4 text-center">
          Sign In to <span className="text-[#6e74ff]">CodeEasier</span>
        </h1>
        <form onSubmit={handleLogin} className="flex flex-col w-full gap-4" autoComplete="on">
          {error && (
            <div
              className="text-red-400 bg-red-50/10 rounded p-2 text-center text-sm mb-2"
              role="alert"
              aria-live="assertive"
            >
              {error}
            </div>
          )}

          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoFocus
            aria-label="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            placeholder="Email"
            autoComplete="email"
            className="bg-white/10 text-white border border-white/20 rounded px-4 py-3 w-full outline-none focus:border-[#6e74ff] font-poppins"
            required
            disabled={loading}
          />

          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={passwordVisible ? "text" : "password"}
              aria-label="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="Password"
              autoComplete="current-password"
              className="bg-white/10 text-white border border-white/20 rounded px-4 py-3 w-full outline-none focus:border-[#6e74ff] font-poppins pr-10"
              required
              disabled={loading}
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

          <div className="flex justify-end w-full">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              tabIndex={0}
              role="button"
              className="text-xs text-[#bfc6ff] hover:text-[#6e74ff] underline transition-all"
              disabled={loading}
            >
              Forgot Password?
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-center text-white font-poppins text-sm mt-4">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-[#6e74ff] font-semibold underline hover:text-[#3131BD] ml-1 transition-all"
            tabIndex={0}
            role="button"
            disabled={loading}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
