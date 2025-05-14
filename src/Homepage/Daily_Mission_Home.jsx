import { useState } from 'react';
import './Daily_Mission_Home.css';
import { Background } from '../Background';

export default function DailyMissions() {
  const [missionsCompleted, setMissionsCompleted] = useState(0);
  
  const missions = [
    // { id: 1, title: "Complete a workout", completed: false },
    // { id: 2, title: "Read for 30 minutes", completed: false },
    // { id: 3, title: "Drink 8 glasses of water", completed: false },
    // { id: 4, title: "Meditate for 10 minutes", completed: false },
    // { id: 5, title: "Take a walk outside", completed: false },
    // { id: 6, title: "Practice a language", completed: false },
    // { id: 7, title: "Connect with a friend", completed: false },
    // { id: 8, title: "Write in your journal", completed: false }
  ];
  
  const [userMissions, setUserMissions] = useState(missions);
  
  const toggleMission = (id) => {
    const updatedMissions = userMissions.map(mission => {
      if (mission.id === id) {
        const newCompletedState = !mission.completed;
        
        setMissionsCompleted(prev => 
          newCompletedState ? prev + 1 : prev - 1
        );
        
        return { ...mission, completed: newCompletedState };
      }
      return mission;
    });
    
    setUserMissions(updatedMissions);
  };

  return (
    <div>
      {/* <Background /> */}

      <div className="daily_mission_div">
        <div className="first_column">
          <h1 className="daily_title">Daily Missions</h1>
          <div className="time_remaining">
            {/* Backend masukin sini untuk time;v */}
            Time remaining: 21h 30m
          </div>
        </div>
        
        <div className="daily_completed">
          Missions completed: {missionsCompleted}
        </div>
        
        {userMissions.length === 0 ? (
          <div className="missions-container_empty">
            <h1>No Daily Mission</h1>
          </div>
        ) : (
          <div className="missions-container">
            {userMissions.map(mission => (
              <div 
                key={mission.id}
                onClick={() => toggleMission(mission.id)}
                className={`mission-card ${
                  mission.completed 
                    ? "mission-card-completed" 
                    : "mission-card-incomplete"
                }`}
              >
                {mission.title}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}