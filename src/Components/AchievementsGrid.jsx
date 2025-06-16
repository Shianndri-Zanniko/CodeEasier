import React from "react";
import AchievementCard from "./AchievementCard";

const AchievementsGrid = ({ achievements }) => (
  <div className="mt-10">
    <div className="text-white text-2xl font-bold mb-4 font-poppins flex items-center gap-2">
      Achievement <span role="img" aria-label="trophy"></span>
    </div>
    <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
      {achievements.map((ach) => (
        <AchievementCard key={ach.id} name={ach.name} times={ach.times} />
      ))}
    </div>
  </div>
);

export default AchievementsGrid;
