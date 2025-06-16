import React, { useEffect, useState } from "react";
import MissionCard from "./MissionCard";
import { completeDailyQuest } from "../services/dailyQuestService";
import { useAuth } from "../contexts/authContext";
const DailyMissions = ({ missions: initialMissions = [] }) => {
  const { user } = useAuth();
  const [missions, setMissions] = useState(initialMissions);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => setMissions(initialMissions), [initialMissions]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const end = new Date();
      end.setHours(24, 0, 0, 0);
      const diff = end - now;
      const hrs = Math.floor(diff / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      setTimeLeft(`${hrs}h ${mins}m`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!user) return;
    missions.forEach((m) => {
      const progress = m.progress || 0;
      const amount = m.requirements?.amount || 1;
      if (!m.completed && progress >= amount) {
        completeDailyQuest(user.uid, m.id, m.xpReward || 0).then(() => {
          setMissions((prev) =>
            prev.map((quest) =>
              quest.id === m.id ? { ...quest, completed: true } : quest
            )
          );
        });
      }
    });
  }, [missions, user]);

  const completedCount = missions.filter((m) => m.completed).length;

  return (
    <section className="mb-10">
      <div className="flex items-center gap-4 mb-2">
        <h2 className="text-2xl font-bold text-white font-poppins">Daily Missions</h2>
        <span className="bg-white/10 text-[#bfc6ff] text-xs px-3 py-1 rounded-full font-poppins">
          Time remaining: {timeLeft}
        </span>
      </div>
      <div className="mb-3">
        <span className="bg-[#6e74ff] text-white text-xs px-3 py-1 rounded font-poppins">
          Missions completed: {completedCount}
        </span>
      </div>
      <div className="flex flex-wrap gap-4">
        {missions.map((m) => (
          <MissionCard
            key={m.id}
            title={m.title}
            completed={m.completed}
            xpReward={m.xpReward || 10}
            progress={m.progress || 0}
            amount={m.requirements?.amount || 1}
            action={m.requirements?.action || ""}
            description={m.description}
          />
        ))}
      </div>
    </section>
  );
};

export default DailyMissions;
