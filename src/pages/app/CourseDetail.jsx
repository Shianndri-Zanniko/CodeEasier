import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { getCourseDetail } from "../../services/courseDetailService";
import LessonContent from "../../components/LessonContent";
import ExerciseSection from "../../components/ExerciseSection";
import CommentsSection from "../../components/CommentsSection";
import PersonalNotes from "../../components/PersonalNotes";
import { useAuth } from "../../contexts/authContext";
import { getCompletedModules } from "../../services/userProgressService";
import { completeCourse } from "../../services/userService";

import checklist from "../../assets/icons/check.svg";

// Detail view for a single course with lessons and exercises

// Build sidebar structure from course modules
const getSidebarStructure = (modules) => {
  return modules.map((mod, idx) => ({
    chapter: `Chapter ${idx + 1}: ${mod.title}`,
    items: [
      { key: "lesson", label: "Lesson" },
      { key: "exercise", label: "Exercise" }
    ],
    module: mod,
  }));
};

const CourseDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const courseId = id;
  const [course, setCourse] = useState(null);
  const [selectedModuleIdx, setSelectedModuleIdx] = useState(0);
  const [selectedType, setSelectedType] = useState("lesson");
  const [loading, setLoading] = useState(true);
  const [completedMap, setCompletedMap] = useState({});

  // Load course
  useEffect(() => {
    setLoading(true);
    getCourseDetail(courseId)
      .then((data) => {
        setCourse(data);
        setSelectedModuleIdx(0);
        setSelectedType("lesson");
      })
      .catch((error) => {
        console.error("Error loading course:", error);
      })
      .finally(() => setLoading(false));
  }, [courseId]);

  // Fetch user's completed modules for the course
  useEffect(() => {
    if (user && course) {
      getCompletedModules(user.uid, course.id)
        .then(setCompletedMap)
        .catch((error) => {
          console.error("Error fetching completed modules:", error);
        });
    }
  }, [user, course]);

  // Refresh completion state after exercise finished
  const handleModuleComplete = async (moduleId) => {
    // Update local state for immediate UI feedback
    setCompletedMap((prev) => ({
      ...prev,
      [moduleId]: {
        lessonCompleted: true,
        exerciseCompleted: true,
      }
    }));
    
    // Optionally refresh from Firestore to ensure consistency
    if (user && course) {
      try {
        const freshData = await getCompletedModules(user.uid, course.id);
        setCompletedMap(freshData);

        const allCompleted = course.modules.every(
          (mod) =>
            freshData[mod.id]?.lessonCompleted &&
            freshData[mod.id]?.exerciseCompleted
        );

        if (allCompleted) {
          const result = await completeCourse(user.uid, course.id);
          if (result?.newAchievements?.length) {
            console.log("Unlocked achievements", result.newAchievements);
          }
          // Refresh completion data in case achievements modify user stats
          const updated = await getCompletedModules(user.uid, course.id);
          setCompletedMap(updated);
        }
      } catch (error) {
        console.error("Error refreshing completion data:", error);
      }
    }
  };


  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#16172B] text-white">Loading course...</div>;
  if (!course) return <div className="min-h-screen flex items-center justify-center bg-[#16172B] text-white">Course not found.</div>;

  const sidebar = getSidebarStructure(course.modules);
  const selectedModule = course.modules[selectedModuleIdx];

  return (
    <div className="min-h-screen bg-[#16172B] flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <aside className="bg-[#101225] w-[320px] min-w-[220px] max-w-xs p-6 border-r border-[#232447] flex flex-col">
          <div className="text-2xl font-bold text-white mb-6 font-poppins">
            {course.title}
          </div>
          <div className="flex-1 space-y-6">
            {sidebar.map((chapter, i) => (
              <div key={i}>
                <div className="font-bold text-white text-lg mb-1">{chapter.chapter}</div>
                <ul className="ml-2 space-y-1">
                  {chapter.items.map((item) => (
                    <li key={item.key}>
                      <button
                        className={`text-sm px-3 py-1 rounded transition-all w-full text-left
                          ${
                            selectedModuleIdx === i && selectedType === item.key
                              ? "bg-[#6e74ff] text-white"
                              : "text-white/80 hover:bg-[#232447] hover:text-white"
                          }
                        `}
                        onClick={() => {
                          setSelectedModuleIdx(i);
                          setSelectedType(item.key);
                        }}
                      >
                        <span className="flex justify-between items-center">
                          {item.label}
                          {completedMap &&
                            completedMap[chapter.module.id] &&
                            (completedMap[chapter.module.id].lessonCompleted &&
                              completedMap[chapter.module.id].exerciseCompleted) && (
                                <img 
                                  src={checklist} 
                                  alt="Checklist completed" 
                                  className="w-5 h-5 inline-block" 
                                />
                            )}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </aside>

        <main className="flex-1 flex flex-col px-10 py-8">
          <div className="flex-1 flex flex-col gap-6">
            <div className="bg-white/5 rounded-lg p-6 min-h-[240px] max-w-3xl w-full mx-auto">
              {selectedType === "lesson" ? (
                <>
                  <LessonContent content={selectedModule.content} />
                  {completedMap[selectedModule.id]?.lessonCompleted && (
                    <div className="mt-4 text-green-400 font-semibold">
                      Lesson Completed 
                    </div>
                  )}
                </>
              ) : (
                <ExerciseSection
                  exercise={selectedModule.exercise}
                  courseId={course.id}
                  moduleId={selectedModule.id}
                  onModuleComplete={handleModuleComplete}
                />
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 max-w-5xl w-full mx-auto">
            <div className="bg-white/5 rounded-lg p-5 min-h-[160px]">
              <CommentsSection courseId={course.id} />
            </div>
            <div className="bg-white/5 rounded-lg p-5 min-h-[160px]">
              <PersonalNotes
                courseId={course.id}
                courseTitle={course.title}
                moduleId={selectedModule.id}
                moduleTitle={selectedModule.title}
                userId={user?.uid}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CourseDetail;
