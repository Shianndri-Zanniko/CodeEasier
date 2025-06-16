import { db } from "./firebase";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  increment,
  getDoc
} from "firebase/firestore";
import { addUserExp } from "./userService";
import { DAILY_QUEST_COUNT } from "../constants/dailyQuestIds";

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export async function getDailyQuests(userId) {
  const snapshot = await getDocs(collection(db, "missions"));
  const quests = snapshot.docs.map((docSnap) => {
    const data = docSnap.data();
    return {
      id: data.id || docSnap.id,
      ...data,
    };
  });

  if (!userId) {
    const selected = shuffle([...quests]).slice(0, DAILY_QUEST_COUNT);
    return selected.map((q) => ({ ...q, completed: false, progress: 0 }));
  }

  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) {
    await setDoc(userRef, {});
  }
  const today = new Date().toDateString();
  let questIds = [];
  let lastReset = null;
  if (userSnap.exists()) {
    const data = userSnap.data();
    questIds = data.currentDailyQuestIds || [];
    lastReset = data.dailyQuestReset || null;
  }

  if (!lastReset || new Date(lastReset).toDateString() !== today || questIds.length !== DAILY_QUEST_COUNT) {
    const oldProgressSnap = await getDocs(collection(db, "users", userId, "dailyQuests"));
    const deletePromises = oldProgressSnap.docs.map((d) => deleteDoc(d.ref));
    await Promise.all(deletePromises);
    questIds = shuffle([...quests]).slice(0, DAILY_QUEST_COUNT).map(q => q.id);
    await setDoc(
      userRef,
      { currentDailyQuestIds: questIds, dailyQuestReset: Date.now() },
      { merge: true }
    );
  }

  const progressSnap = await getDocs(collection(db, "users", userId, "dailyQuests"));
  const progressMap = {};
  progressSnap.forEach((docSnap) => {
    progressMap[docSnap.id] = docSnap.data();
  });

  return quests
    .filter((q) => questIds.includes(q.id))
    .map((q) => ({
      ...q,
      completed: progressMap[q.id]?.completed || false,
      progress: progressMap[q.id]?.progress || 0,
    }));
}

export async function updateDailyQuestProgress(userId, questId, amount) {
  await getDailyQuests(userId);
  const questRef = doc(db, "users", userId, "dailyQuests", questId);
  await setDoc(questRef, { progress: increment(amount) }, { merge: true });
}

export async function completeDailyQuest(userId, questId, xpReward) {
  const questRef = doc(db, "users", userId, "dailyQuests", questId);
  await setDoc(questRef, { completed: true }, { merge: true });
  await addUserExp(userId, xpReward);
}
