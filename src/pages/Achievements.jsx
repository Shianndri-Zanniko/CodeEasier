import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  getUserAchievementProgress,
  subscribeToUserAchievementProgress,
} from "../services/achievementService";
import { useAuth } from "../contexts/authContext";

// Display unlocked and locked achievements for the current user

const AchievementPage = () => {
  const { user } = useAuth();
  const [achievementProgress, setAchievementProgress] = useState([]);

  useEffect(() => {
    if (!user) {
      setAchievementProgress([]);
      return;
    }

    let unsubscribe;
    const fetchAndSubscribe = async () => {
      try {
        const progress = await getUserAchievementProgress(user.uid);
        setAchievementProgress(progress);
      } catch (error) {
        console.error("Error fetching initial achievement progress:", error);
      }
      unsubscribe = subscribeToUserAchievementProgress(user.uid, setAchievementProgress);
    };

    fetchAndSubscribe();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user]);

  // Split achievements into unlocked and locked
  const unlocked = achievementProgress.filter(a => a.unlocked);
  const locked = achievementProgress.filter(a => !a.unlocked);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#181a2b] to-[#232656]">
      <Navbar />
      <div className="max-w-5xl mx-auto pt-14 pb-24 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white font-poppins mb-1">Achievements</h1>
          <div className="flex items-center gap-4">
            <span className="text-white/80 text-lg">
              {unlocked.length} / {achievementProgress.length} unlocked
            </span>
            <div className="flex-1 h-3 bg-white/10 rounded-full relative">
              <div
                className="bg-[#6e74ff] h-3 rounded-full transition-all"
                style={{
                  width: `${
                    achievementProgress.length
                      ? (unlocked.length / achievementProgress.length) * 100
                      : 0
                  }%`
                }}
              />
            </div>
          </div>
        </div>
        {unlocked.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-green-400 mb-3 font-poppins">
              Unlocked Achievements
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-7">
              {unlocked.map(ach => (
                <div
                  key={ach.id}
                  className="rounded-xl p-5 flex flex-col items-center shadow-xl border
                    bg-gradient-to-br from-[#6e74ff]/60 to-[#181a2b] border-[#6e74ff]
                    transition-all duration-200 hover:scale-105 hover:shadow-2xl"
                >
                  {ach.icon && (
                    <div className="relative mb-2">
                      <img
                        src={ach.icon}
                        alt={ach.title}
                        className="w-14 h-14 object-contain"
                        onError={(e) => {
                          e.currentTarget.parentElement.style.display = "none";
                        }}
                      />
                    </div>
                  )}
                  <div className="text-base font-semibold mb-1 font-poppins text-white">
                    {ach.title}
                  </div>
                  <div className="text-xs text-white/80 mb-2 text-center">{ach.description}</div>
                  <div className="flex items-center gap-1 mt-auto">
                    <span className="bg-[#6e74ff] text-white rounded px-2 py-1 text-xs font-bold">
                      +{ach.xpReward} XP
                    </span>
                    <span className="ml-2 text-green-400 text-xs">Unlocked!</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {locked.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-[#bfc6ff] mb-3 font-poppins">
              Locked Achievements
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-7">
              {locked.map(ach => (
                <div
                  key={ach.id}
                  className="rounded-xl p-5 flex flex-col items-center shadow-xl border
                    bg-white/10 border-white/10 opacity-70 grayscale
                    transition-all duration-200 hover:scale-105 hover:shadow-2xl"
                >
                  {ach.icon && (
                    <div className="relative mb-2">
                      <img
                        src={ach.icon}
                        alt={ach.title}
                        className="w-14 h-14 object-contain opacity-50"
                        onError={(e) => {
                          e.currentTarget.parentElement.style.display = "none";
                        }}
                      />
                      <span className="absolute top-0 right-0 bg-[#232656] rounded-full p-1">
                        <svg width="20" height="20" fill="#bfc6ff" viewBox="0 0 24 24">
                          <path d="M17 11V7a5 5 0 0 0-10 0v4H5v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-9h-2zm-8-4a3 3 0 0 1 6 0v4h-6V7zm8 13H7v-7h10v7z"/>
                        </svg>
                      </span>
                    </div>
                  )}
                  <div className="text-base font-semibold mb-1 font-poppins text-[#bfc6ff]">
                    {ach.title}
                  </div>
                  <div className="text-xs text-white/80 mb-2 text-center">{ach.description}</div>
                  <div className="flex items-center gap-1 mt-auto">
                    <span className="bg-[#6e74ff] text-white rounded px-2 py-1 text-xs font-bold">
                      +{ach.xpReward} XP
                    </span>
                    <span className="text-xs text-[#bfc6ff]">Locked</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* If no unlocked, only show Locked section (handled by above logic) */}
      </div>
    </div>
  );
};

export default AchievementPage;
