import React, { useEffect, useState, useMemo } from "react";
import Navbar from "../../components/Navbar";
import SearchBar from "../../components/SearchBar";
import DailyMissions from "../../components/DailyMissions";
import CourseList from "../../components/CourseList";
import StreakBadge from "../../components/StreakBadge";
import { getDailyQuests } from "../../services/dailyQuestService";
import { getCourses } from "../../services/courseService";
import { getAllUserProgress } from "../../services/userProgressService";
import { updateStreak } from "../../services/userService";

// Main landing page after login showing courses and missions
import { useAuth } from "../../contexts/authContext";

const Dashboard = () => {
  const { user } = useAuth();
  const [missions, setMissions] = useState([]);
  const [courses, setCourses] = useState([]);
  const [userProgress, setUserProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [quests, courseList, progress] = await Promise.all([
          getDailyQuests(user?.uid),
          getCourses(),
          user ? getAllUserProgress(user.uid) : Promise.resolve({})
        ]);
        setMissions(quests);
        setCourses(courseList);
        setUserProgress(progress);
        if (user) {
          const result = await updateStreak(user.uid);
          setStreak(result.streak);
        } else {
          setStreak(0);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    }
    fetchData();
  }, [user]);

  // Calculate course progress based on completed modules
  function getCourseProgress(course) {
    const modules = course.modules || [];
    if (modules.length === 0) return 0;

    const progressForCourse = userProgress[course.id] || {};

    const completedModules = modules.filter(
      mod =>
        progressForCourse[mod.id]?.lessonCompleted &&
        progressForCourse[mod.id]?.exerciseCompleted
    ).length;

    return Math.round((completedModules / modules.length) * 100);
  }


  // Add progress to each course
  const coursesWithProgress = useMemo(
    () =>
      courses.map(course => ({
        ...course,
        progress: getCourseProgress(course)
      })),
    [courses, userProgress]
  );

  if (loading) {
    return <div className="text-white text-center pt-32">Loading dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1e1e30] to-[#29296b]">
      <Navbar />
      <div className="max-w-4xl mx-auto pt-12 pb-20 px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-white font-poppins text-center mb-2">
          Welcome To <span className="text-[#6e74ff]">CodeEasier</span>
        </h1>
        <p className="text-lg text-white/80 text-center font-poppins mb-8">
          Where code gets easier
        </p>
        <div className="flex mb-6">
          <StreakBadge streak={streak} />
        </div>
        <DailyMissions missions={missions} />
        <CourseList courses={coursesWithProgress} />
      </div>
    </div>
  );
};

export default Dashboard;
