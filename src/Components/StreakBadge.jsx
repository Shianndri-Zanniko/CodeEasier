import React from "react";
import flame from "../assets/icons/flame.svg"

const StreakBadge = ({ streak }) => (
  <div className="flex items-center gap-1 text-white font-poppins text-base font-medium">
    <img src={flame} alt="Streak Flame Icon" className="w-5 h-5" />
    Login Streak {streak}x
  </div>
);

export default StreakBadge;
