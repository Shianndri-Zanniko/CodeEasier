import { db } from "./firebase";
import { collection, getDocs, doc, getDoc, onSnapshot, query, where } from "firebase/firestore";
import { getUserProfile, hasAchievement, unlockAchievement } from "./userService";
import { ACHIEVEMENT_IDS } from "../constants/achievementIds";

const NAME_TO_ID = {
  "profile-complete": ACHIEVEMENT_IDS.PROFILE_COMPLETE,
  "first-lesson": ACHIEVEMENT_IDS.FIRST_LESSON
};

const normalizeId = (id) => NAME_TO_ID[id] || id;

// Get all achievements
export async function getAllAchievements() {
  const snapshot = await getDocs(collection(db, "achievements"));
  return snapshot.docs.map(docSnap => {
    const data = docSnap.data();
    return {
      firebaseId: docSnap.id,
      id: data.id ?? docSnap.id,
      ...data
    };
  });
}


export async function getAchievementDetails(achievementId) {
  try {
    const normalized = normalizeId(achievementId);
    // Try to fetch by the stored achievement id field
    const q = query(collection(db, "achievements"), where("id", "==", normalized));
    const querySnap = await getDocs(q);

    if (!querySnap.empty) {
      const docSnap = querySnap.docs[0];
      return { firebaseId: docSnap.id, ...docSnap.data() };
    }

    // Fallback to fetching by document id
    const achievementRef = doc(db, "achievements", normalized);
    const achievementSnap = await getDoc(achievementRef);

    if (achievementSnap.exists()) {
      return { firebaseId: normalized, ...achievementSnap.data() };
    }
    return null;
  } catch (error) {
    console.error("Error fetching achievement details:", error);
    throw error;
  }
}

// 2. Fetch user's unlocked achievement map (from their user doc)
async function getUserAchievementsMap(userId) {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    return userSnap.data().achievements || {};
  }
  return {};
}

// Get user's achievement progress (all achievements with unlock status)
export async function getUserAchievementProgress(userId) {
  try {
    const [allAchievements, userAchievements] = await Promise.all([
      getAllAchievements(),
      getUserAchievementsMap(userId)
    ]);

    return allAchievements.map(achievement => ({
      ...achievement,
      unlocked: achievement.id in userAchievements,
      unlockedAt: userAchievements[achievement.id]?.unlockedAt || null
    }));
  } catch (error) {
    console.error("Error getting achievement progress:", error);
    throw error;
  }
}

// Subscribe to real-time updates of a user's achievement progress
export function subscribeToUserAchievementProgress(userId, callback) {
  const userRef = doc(db, "users", userId);
  return onSnapshot(userRef, async snap => {
    const userAchievements = snap.exists() ? snap.data().achievements || {} : {};
    const allAchievements = await getAllAchievements();
    const progress = allAchievements.map(ach => ({
      ...ach,
      unlocked: ach.id in userAchievements,
      unlockedAt: userAchievements[ach.id]?.unlockedAt || null
    }));
    callback(progress);
  });
}

// Get only unlocked achievements with details
export async function getUserUnlockedAchievements(userId) {
  try {
    const userData = await getUserProfile(userId);
    if (!userData || !userData.achievements) return [];

    const userAchievements = userData.achievements;
    const achievementIds = Object.keys(userAchievements);

    // Get details for each unlocked achievement
    const achievementDetails = await Promise.all(
      achievementIds.map(async (id) => {
        const details = await getAchievementDetails(id);
        return {
          ...details,
          unlockedAt: userAchievements[id].unlockedAt
        };
      })
    );

    return achievementDetails.filter(achievement => achievement !== null);
  } catch (error) {
    console.error("Error getting unlocked achievements:", error);
    return [];
  }
}

// ===== ACHIEVEMENT CHECKING FUNCTIONS =====

// Check and unlock lesson completion achievements
export async function checkLessonAchievements(userId) {
  const results = [];
  
  try {
    // Check "Complete your first lesson" achievement
    const details = await getAchievementDetails(ACHIEVEMENT_IDS.FIRST_LESSON);
    const achId = details?.id || ACHIEVEMENT_IDS.FIRST_LESSON;
    const hasFirstLesson = await hasAchievement(userId, achId);
    if (!hasFirstLesson) {
      const result = await unlockAchievement(userId, achId);
      if (!result.alreadyUnlocked) {
        results.push({
          id: achId,
          title: details?.title || "First Lesson",
          description: details?.description || "Complete your first lesson!",
          unlocked: true
        });
      }
    }
  } catch (error) {
    console.error("Error checking lesson achievements:", error);
  }
  
  return results;
}

// Check profile completion achievement
export async function checkProfileAchievement(userId) {
  const results = [];
  
  try {
    const details = await getAchievementDetails(ACHIEVEMENT_IDS.PROFILE_COMPLETE);
    const achId = details?.id || ACHIEVEMENT_IDS.PROFILE_COMPLETE;
    const hasProfileComplete = await hasAchievement(userId, achId);
    if (!hasProfileComplete) {
      const result = await unlockAchievement(userId, achId);
      if (!result.alreadyUnlocked) {
        results.push({
          id: achId,
          title: details?.title || "Known Legend",
          description: details?.description || "Complete Profile",
          unlocked: true
        });
      }
    }
  } catch (error) {
    console.error("Error checking profile achievement:", error);
  }
  
  return results;
}

// Master function to check all achievements at once
export async function checkAllAchievements(userId) {
  try {
    const userData = await getUserProfile(userId);
    if (!userData) return [];

    const profileComplete = userData.profileComplete || false;

    const allNewAchievements = [];

    // Check lesson achievements
    const lessonAchievements = await checkLessonAchievements(userId);
    allNewAchievements.push(...lessonAchievements);

    // Check profile achievement if profile is complete
    if (profileComplete) {
      const profileAchievements = await checkProfileAchievement(userId);
      allNewAchievements.push(...profileAchievements);
    }

    return allNewAchievements;
  } catch (error) {
    console.error("Error checking all achievements:", error);
    return [];
  }
}
