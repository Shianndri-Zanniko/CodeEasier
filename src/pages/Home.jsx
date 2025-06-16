import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-b from-[#1e1e30] to-[#29296b] px-4">
      <div className="bg-white/10 shadow-lg rounded-2xl max-w-lg w-full flex flex-col items-center gap-8 p-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-white font-poppins text-center">
          Welcome to <span className="text-[#6e74ff]">CodeEasier</span>
        </h1>
        <p className="text-lg text-white/80 text-center font-poppins">
          Learn to code the fun way! Unlock achievements, track your progress, and keep your daily streak. Ready to start your journey?
        </p>
        <div className="flex gap-4 mt-4 w-full justify-center">
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-3 rounded bg-gradient-to-r from-[#3525B0] to-[#3131BD] text-white font-semibold text-base hover:opacity-90 transition-all font-poppins shadow"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/register")}
            className="px-8 py-3 rounded border border-[#6e74ff] text-[#6e74ff] bg-transparent font-semibold text-base hover:bg-[#6e74ff] hover:text-white transition-all font-poppins shadow"
          >
            Sign Up
          </button>
        </div>
      </div>
      <div className="mt-10 text-center text-white/60 text-sm font-poppins">
        © {new Date().getFullYear()} CodeEasier &middot; Gamified Coding Platform
      </div>
    </div>
  );
};

export default Home;
