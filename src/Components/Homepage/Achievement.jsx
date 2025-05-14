import { useState } from 'react';

export default function Achivements123() {
  const [AchievementsCompleted, setAchievementCompleted] = useState(0);
  
  const Achievement = [
    { id: 1, title: "Login 1x", img_path: null, completed: false },
    { id: 1, title: "Login 1x", img_path: null, completed: false },
    { id: 1, title: "Login 1x", img_path: null, completed: false },
    { id: 1, title: "Login 1x", img_path: null, completed: false },
    { id: 1, title: "Login 1x", img_path: null, completed: false },
    { id: 1, title: "Login 1x", img_path: null, completed: false },
    { id: 1, title: "Login 1x", img_path: null, completed: false },
    { id: 1, title: "Login 1x", img_path: null, completed: false },
    { id: 1, title: "Login 1x", img_path: null, completed: false },
    { id: 1, title: "Login 1x", img_path: null, completed: false },
    { id: 1, title: "Login 1x", img_path: null, completed: false },
    { id: 1, title: "Login 1x", img_path: null, completed: false },
    // { id: 2, title: "Login 5x", img_path: null, completed: false },
    // { id: 3, title: "Login 10x", img_path: null, completed: false },
    // { id: 4, title: "Complete Profile", img_path: null, completed: false },
    // { id: 5, title: "First Mission", img_path: null, completed: true },
    // { id: 6, title: "Five Missions", img_path: null, completed: false },
    // { id: 7, title: "Ten Missions", img_path: null, completed: false },
    // { id: 8, title: "Share App", img_path: null, completed: false },
    // { id: 9, title: "Rate App", img_path: null, completed: false },
    // { id: 10, title: "Daily Streak 3", img_path: null, completed: false },
    // { id: 11, title: "Daily Streak 7", img_path: null, completed: false },
    // { id: 12, title: "Daily Streak 30", img_path: null, completed: false }
  ];
  
  const [userAchievement, setUserAchivements] = useState(Achievement);
  
  // const toggleMission = (id) => {
  //   const updatedAchievemnt = userAchievement.map(mission => {
  //     if (mission.id === id) {
  //       const newCompletedState = !mission.completed;
        
  //       setAchievementCompleted(prev => 
  //         newCompletedState ? prev + 1 : prev - 1
  //       );
        
  //       return { ...mission, completed: newCompletedState };
  //     }
  //     return mission;
  //   });
    
  //   setUserAchivements(updatedAchievemnt);
  // };

  return (
    <div className="font-poppins rounded px-[126px] flex flex-col gap-[15px]">
      <div className="font-lexend flex flex-row justify-between items-center pr-[55vw]">
        <span className="text-white font-bold text-[50px]">Achievements</span>
        {/* Add more elements here if needed */}
      </div>
      <div className="text-[25px] font-normal w-[309px] h-[46px] flex text-white bg-[#3525B0DE] items-center justify-center rounded-[5px]">
        {AchievementsCompleted} Achievements Completed
      </div>
      <div className="text-[17px] font-lexend flex flex-wrap gap-x-[88px] pb-2 -ml-1 pl-1 -mr-1 pr-1">
        {userAchievement.map((ach, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center h-[160px] gap-[5px] rounded cursor-pointer transition-colors duration-200 flex-shrink-0"
          >
            <div className="h-[100px] w-[100px] bg-white rounded-[14px] flex items-center justify-center">
              {ach.img_path ? (
                <img src={ach.img_path} alt={ach.title} className="h-[100px] w-[100px]" />
              ) : (
                <span className="text-gray-400 text-xl">No Image</span>
              )}
            </div>
            <h1 className="text-[17px] text-white text-center">{ach.title}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}