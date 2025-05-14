import React, { useState } from "react";
// import './ForgotPassword.css'
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";

export const ForgotPassword = ({ goToLogin }) => {
  // Form input states
  const [email, setEmail] = useState("");

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Handle password reset
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!email) {
      setError("Email is required");
      return;
    }

    try {
      setLoading(true);
      // Send password reset email
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
      setLoading(false);

      // Clear form after successful submission
      setEmail("");

      // Optionally redirect to login after some time
      setTimeout(() => {
        goToLogin();
      }, 3000);
    } catch (error) {
      setLoading(false);
      if (error.code === "auth/user-not-found") {
        setError("No user found with this email address");
      } else if (error.code === "auth/invalid-email") {
        setError("Invalid email address");
      } else {
        setError("An error occurred: " + error.message);
      }
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0A0D1E] p-4">
      <div className="flex flex-col items-center w-full max-w-md gap-8">
        <div className="flex flex-col items-center gap-5 text-center">
          <h1 className="text-white text-3xl font-bold">Reset Password</h1>
          <p className="text-white text-sm font-light opacity-80">
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </p>

          <div className="w-full flex flex-col gap-3">
            {error && <div className="text-red-400">{error}</div>}
            {success && (
              <div className="text-green-400">
                Password reset link sent! Check your email inbox.
              </div>
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 rounded-md border border-[#E8E9F6] bg-gradient-to-r from-[#3131BD] to-[#3525B0] text-white font-poppins text-base placeholder:text-[#E8E9F6] focus:outline-none focus:ring-2 focus:ring-[#545EAA] focus:border-transparent" 
            />
          </div>
        </div>
        <div className="w-full flex flex-col">
          <button
            onClick={handleResetPassword}
            disabled={loading}
            className={`w-full h-12 rounded-md text-white font-medium transition-opacity ${
              loading ? "opacity-70" : ""
            } bg-gradient-to-r from-[#3525B0] via-[#3131BD] to-[#3131BD]`}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
          <p className="text-right text-white text-sm mt-4">
            Remember your password?{" "}
            <span
              onClick={goToLogin}
              className="text-[#545EAA] font-semibold cursor-pointer"
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
