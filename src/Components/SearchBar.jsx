import React from "react";

const SearchBar = () => (
  <div className="flex justify-center mb-10">
    <input
      type="text"
      placeholder="Find course"
      className="w-full max-w-md px-4 py-3 rounded-md bg-white/90 text-[#31316B] font-poppins text-base placeholder:text-[#bfc6ff] focus:outline-none focus:ring-2 focus:ring-[#6e74ff] transition-all"
      disabled 
    />
  </div>
);

export default SearchBar;
