import { db } from "./firebase";
import { doc, setDoc, getDoc, getDocs, collection } from "firebase/firestore";

// Mark both lesson and exercise as completed
export async function markModuleCompleted(userId, courseId, moduleId) {
  await setDoc(
    doc(db, "userProgress", userId, "courses", courseId, "modules", moduleId),
    {
      exerciseCompleted: true,
      lessonCompleted: true,
      completedAt: Date.now(),
    },
    { merge: true }
  );
}

// Mark only the lesson portion as completed
export async function markLessonCompleted(userId, courseId, moduleId) {
  await setDoc(
    doc(db, "userProgress", userId, "courses", courseId, "modules", moduleId),
    {
      lessonCompleted: true,
      completedAt: Date.now(),
    },
    { merge: true }
  );
}

// Get all completed modules for a course for a user
export async function getCompletedModules(userId, courseId) {
  const completed = {};
  const modulesRef = collection(db, "userProgress", userId, "courses", courseId, "modules");
  const snapshot = await getDocs(modulesRef);
  snapshot.forEach(docSnap => {
    completed[docSnap.id] = {
      exerciseCompleted: docSnap.data().exerciseCompleted,
      lessonCompleted: docSnap.data().lessonCompleted,
    };
  });
  return completed;
}

// Get status for one module
export async function isModuleCompleted(userId, courseId, moduleId) {
  const ref = doc(db, "userProgress", userId, "courses", courseId, "modules", moduleId);
  const snap = await getDoc(ref);
  return snap.exists() && !!snap.data().exerciseCompleted;
}

// Fetch user's progress for all courses (needed by Dashboard and Profile)
export async function getAllUserProgress(userId) {
  const coursesSnapshot = await getDocs(
    collection(db, "userProgress", userId, "courses")
  );
  const result = {};
  const modulePromises = [];

  for (const courseDoc of coursesSnapshot.docs) {
    const courseId = courseDoc.id;
    result[courseId] = {};
    const modulesRef = collection(
      db,
      "userProgress",
      userId,
      "courses",
      courseId,
      "modules"
    );

    const modulesPromise = getDocs(modulesRef).then(modulesSnapshot => {
      for (const mod of modulesSnapshot.docs) {
        result[courseId][mod.id] = mod.data();
      }
    });

    modulePromises.push(modulesPromise);
  }

  await Promise.all(modulePromises);
  return result;
}
