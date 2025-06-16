import React from "react";

const ProfileStats = ({ longestStreak, completedCourses, achievementCount }) => {
  const courseLabel = completedCourses === 1 ? "Course" : "Courses";
  const achievementLabel = achievementCount === 1 ? "Achievement" : "Achievements";
  return (
    <div className="flex-1 bg-[#463DCD] p-6 rounded-xl shadow-md text-white flex flex-col justify-center items-center text-center gap-4 max-w-sm">
      <div>
        <span className="font-semibold">Longest Streak: </span>
        <span className="text-[#bfc6ff]">{longestStreak}x</span>
      </div>
      <div>
        <span className="font-semibold">Completed {courseLabel}: </span>
        <span className="text-[#bfc6ff]">{completedCourses}</span>
      </div>
      <div>
        <span className="font-semibold">Unlocked {achievementLabel}: </span>
        <span className="text-[#bfc6ff]">{achievementCount}</span>
      </div>
    </div>
  );
};

export default ProfileStats;
