import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useNavigate } from "react-router-dom";

const getFirebaseForgotError = (code) => {
  switch (code) {
    case "auth/user-not-found":
      return "No user found with this email address";
    case "auth/invalid-email":
      return "Invalid email address";
    default:
      return "An error occurred. Try again.";
  }
};

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!email) {
      setError("Email is required");
      return;
    }

    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
      setLoading(false);
      setEmail("");
      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (error) {
      setLoading(false);
      setError(getFirebaseForgotError(error.code));
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-b from-[#1e1e30] to-[#29296b] p-4">
      <div className="bg-white/5 shadow-lg rounded-2xl w-[350px] max-w-full flex flex-col items-center gap-6 p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white font-poppins mb-2 text-center">
          Reset Password
        </h1>
        <p className="text-white text-sm font-light opacity-80 mb-2 text-center">
          Enter your email and we'll send you a link to reset your password.
        </p>
        <form onSubmit={handleResetPassword} className="flex flex-col w-full gap-4">
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
              Password reset link sent! Check your email.
            </div>
          )}
          <input
            aria-label="Email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            className="bg-white/10 text-white border border-white/20 rounded px-4 py-3 w-full outline-none focus:border-[#6e74ff] font-poppins"
            required
            disabled={loading}
            autoComplete="email"
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full h-12 flex items-center justify-center rounded bg-gradient-to-r from-[#3525B0] to-[#3131BD] text-white font-poppins font-semibold text-base transition-opacity ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            aria-busy={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        <div className="text-center text-white font-poppins text-sm mt-2">
          Remember your password?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-[#6e74ff] font-semibold underline hover:text-[#3131BD] ml-1 transition-all"
            disabled={loading}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
