import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { getCourses } from "../../services/courseService";
import { getAllUserProgress } from "../../services/userProgressService";
import { useAuth } from "../../contexts/authContext";

const Courses = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [userProgress, setUserProgress] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const list = await getCourses();
        setCourses(list);
        if (user) {
          const progress = await getAllUserProgress(user.uid);
          setUserProgress(progress);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }
    fetchData();
  }, [user]);

  const coursesWithCompletion = courses.map(course => {
    const progressForCourse = userProgress[course.id] || {};
    const modules = course.modules || [];
    const completed =
      modules.length > 0 &&
      modules.every(
        mod =>
          progressForCourse[mod.id]?.lessonCompleted &&
          progressForCourse[mod.id]?.exerciseCompleted
      );
    return { ...course, completed };
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1e1e30] to-[#29296b]">
      <Navbar />
      <div className="max-w-3xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">All Courses</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {coursesWithCompletion.map((course) => (
            <div key={course.id} className="bg-white/10 p-6 rounded-lg flex flex-col items-start shadow">
              <h2 className="text-xl font-semibold text-white mb-2">{course.title}</h2>
              <span className={`mb-4 font-medium ${course.completed ? "text-green-300" : "text-white/60"}`}>
                {course.completed ? "Completed" : "In Progress"}
              </span>
              <button
                onClick={() => navigate(`/courses/${course.id}`)}
                className="mt-auto px-4 py-2 bg-[#6e74ff] text-white rounded hover:bg-[#3131BD] font-semibold"
              >
                View Course
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
