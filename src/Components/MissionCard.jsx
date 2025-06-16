import React from "react";

// Card displaying progress and reward for a single mission

const MissionCard = ({ title, completed, xpReward = 10, progress = 0, amount = 1 }) => (
  <div
    className={`
      relative flex flex-col items-start justify-between p-5 rounded-2xl min-w-[200px] min-h-[120px]
      bg-white/10 backdrop-blur-lg shadow-lg border border-white/20
      transition-all cursor-pointer hover:scale-105 hover:shadow-2xl
      ${completed ? "opacity-70" : ""}
    `}
  >
    {completed && (
      <div className="absolute top-3 right-3 bg-green-500 text-white rounded-full px-2 py-1 flex items-center gap-1 text-xs font-bold shadow">
        Done
      </div>
    )}

    <div className="mb-3" />
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <div className="text-xs text-white/80 mb-1">
      {progress}/{amount}
    </div>
    <span className="text-xs bg-[#6e74ff]/80 text-white rounded-full px-3 py-1 font-poppins font-semibold">
      +{xpReward} XP
    </span>
  </div>
);

export default MissionCard;
