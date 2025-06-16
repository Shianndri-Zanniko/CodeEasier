import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

// Get comments for a course
export async function getComments(courseId) {
  const commentsRef = collection(db, "courses", courseId, "comments");
  const q = query(commentsRef, orderBy("timestamp"));
  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// Add comment
export async function addComment(courseId, comment) {
  const commentsRef = collection(db, "courses", courseId, "comments");
  return await addDoc(commentsRef, {
    ...comment,
    timestamp: Date.now(),
    replies: [],
  });
}
