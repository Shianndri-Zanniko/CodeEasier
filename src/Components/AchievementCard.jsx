import React from "react";

const AchievementCard = ({ name, times }) => (
  <div className="h-20 bg-white/40 rounded-lg flex flex-col items-center justify-center text-[#31316B] font-poppins font-medium text-base shadow">
    <span>{name}</span>
    <span className="text-xs text-[#6e74ff]">{times}x</span>
  </div>
);

export default AchievementCard;
