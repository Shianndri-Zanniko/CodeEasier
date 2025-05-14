import { useState } from 'react';

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
    <div className="font-poppins rounded px-[126px] flex flex-col gap-[15px]">
      <div className="font-lexend flex flex-row justify-between items-center pr-[55vw]">
        <span className="text-white font-bold text-[50px]">Daily Missions</span>
        <span className="font-poppins text-white font-normal bg-[#D9D9D999] rounded w-[224px] h-[46px] flex justify-center items-center text-[15px]">
          {/* Time Remaining */}
        </span>
      </div>
      <div className="text-[25px] font-normal w-[309px] h-[46px] flex text-white bg-[#3525B0DE] items-center justify-center rounded">
        {/* Completed Missions */}
      </div>
      <div className="flex gap-3 pb-2 -ml-1 pl-1 -mr-1 pr-1 overflow-x-scroll">
        {userMissions.length === 0 ? (
          <div className="text-center text-white justify-center underline">
            No missions available.
          </div>
        ) : (
          userMissions.map(mission => (
            <div
              key={mission.id}
              className={`h-[85px] p-4 rounded cursor-pointer transition-colors duration-200 flex-shrink-0 w-[500px] ${
                mission.completed
                  ? 'bg-indigo-700 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => toggleMission(mission.id)}
            >
              {mission.title}
            </div>
          ))
        )}
      </div>
    </div>
  );
}