import { createContext, useEffect, useState, useContext } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import {
  getDailyQuests,
  updateDailyQuestProgress,
} from "../services/dailyQuestService";
import { DAILY_QUEST_IDS } from "../constants/dailyQuestIds";
import { updateStreak } from "../services/userService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      setAuthLoading(false);

      if (firebaseUser) {
        try {
          await updateStreak(firebaseUser.uid);
          const quests = await getDailyQuests(firebaseUser.uid);
          const loginQuest = quests.find(
            (q) => q.id === DAILY_QUEST_IDS.LOGIN
          );

          if (!loginQuest || loginQuest.progress < 1) {
            await updateDailyQuestProgress(
              firebaseUser.uid,
              DAILY_QUEST_IDS.LOGIN,
              1
            );
          }
        } catch (error) {
          console.error(
            "Error updating login daily quest progress:",
            error
          );
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // Optional: Global sign out
  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, authLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
