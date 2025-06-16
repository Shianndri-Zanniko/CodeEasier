import React, { useState, useEffect } from "react";
import { markModuleCompleted, isModuleCompleted } from "../services/userProgressService";
import { useAuth } from "../contexts/authContext";
import { updateDailyQuestProgress } from "../services/dailyQuestService";
import { DAILY_QUEST_IDS } from "../constants/dailyQuestIds";

const ExerciseSection = ({ exercise, courseId, moduleId, onModuleComplete }) => {
  const { user } = useAuth();
  const { question = "", choices, answerIndex } = exercise;
  const [userChoice, setUserChoice] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // On mount, check if already completed
  useEffect(() => {
    if (user) {
      isModuleCompleted(user.uid, courseId, moduleId)
        .then(setCompleted)
        .catch((error) => {
          console.error("Error checking module completion:", error);
        });
    }
  }, [user, courseId, moduleId]);

  const checkAnswer = async (e) => {
    e.preventDefault();
    if (userChoice === null || submitting) return;
    
    setSubmitting(true);
    setShowResult(true);
    
    const correct = Number(userChoice) === Number(answerIndex);
    
    if (correct && user && !completed) {
      try {
        await markModuleCompleted(user.uid, courseId, moduleId);
        await updateDailyQuestProgress(user.uid, DAILY_QUEST_IDS.FINISH_LESSON, 1);
        setCompleted(true);
        if (onModuleComplete) {
          onModuleComplete(moduleId);
        }
      } catch (error) {
        console.error("Error marking module completed:", error);
        // Handle error - maybe show a retry button
      }
    }
    
    setSubmitting(false);
  };

  const resetAnswer = () => {
    setUserChoice(null);
    setShowResult(false);
  };

  const correct = Number(userChoice) === Number(answerIndex);

  return (
    <div className="text-white font-poppins">
      <div className="mb-4">
        <div className="mb-3 whitespace-pre-line text-lg">{question}</div>
        {Array.isArray(choices) && (
          <div className="flex flex-col gap-2 mb-4">
            {choices.map((choice, idx) => (
              <label
                key={idx}
                  className={`px-4 py-3 rounded cursor-pointer border transition-all ${
                    userChoice === idx
                      ? "bg-[#6e74ff] text-white border-[#6e74ff]"
                      : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                  } ${completed ? "opacity-60 pointer-events-none" : ""}`}
              >
                <input
                  type="radio"
                  value={idx}
                  checked={userChoice === idx}
                  onChange={() => {
                    if (!completed) {
                      setUserChoice(idx);
                      setShowResult(false);
                    }
                  }}
                  className="mr-3 accent-[#6e74ff]"
                  disabled={completed || submitting}
                />
                {choice}
              </label>
            ))}
          </div>
        )}
        
        <div className="flex gap-3">
          <button
            onClick={checkAnswer}
            className="bg-[#6e74ff] px-6 py-2 rounded text-white font-bold hover:bg-[#3131BD] transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={userChoice === null || completed || submitting}
          >
            {submitting ? "Submitting..." : completed ? "Completed" : "Submit"}
          </button>
          
          {showResult && !correct && !completed && (
            <button
              onClick={resetAnswer}
              className="bg-gray-600 px-6 py-2 rounded text-white font-bold hover:bg-gray-700 transition"
            >
              Try Again
            </button>
          )}
        </div>
        
        {showResult && !completed && (
          <div className={`mt-4 font-semibold text-lg ${correct ? "text-green-400" : "text-red-400"}`}>
            {correct ? "Correct! Well done!" : "Incorrect. Please try again! "}
          </div>
        )}
        
        {completed && (
          <div className="mt-4 font-semibold text-green-400 text-lg">
            Module Completed 
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciseSection;
