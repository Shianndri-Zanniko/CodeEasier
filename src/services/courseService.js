import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

export async function getCourses() {
  const snapshot = await getDocs(collection(db, "courses"));
  const courses = [];
  for (const docSnap of snapshot.docs) {
    const courseData = docSnap.data();
    const modules = Array.isArray(courseData.modules)
      ? courseData.modules.map((m, idx) => ({ id: m.id || String(idx), ...m }))
      : Object.entries(courseData.modules || {}).map(([key, m]) => ({
          id: m.id || key,
          ...m,
        }));
    courses.push({
      id: docSnap.id,
      ...courseData,
      modules,
      completed: false,
    });
  }
  return courses;
}
