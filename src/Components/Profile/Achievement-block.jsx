import { useState } from 'react';
import './Achievement-block.css';
import { Background } from '../Background';

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
    <div>
      <Background />

      <div className="achievement-div">
        <h2 style={{ marginBottom: '20px' }}>All Achievement</h2>
        {userAchievement.map((achievement) => (
          <div key={achievement.id} className="achievement-card">
            <div className="dot"></div>
            <div className="title-div">
              {achievement.title}
            </div>
          </div>
        ))}
      </div>
    </div>

    
  );
}