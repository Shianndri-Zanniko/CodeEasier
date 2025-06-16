import { db } from "./firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

export async function addNote(note) {
  return await addDoc(collection(db, "notes"), {
    ...note,
    timestamp: Date.now(),
  });
}

export async function getNotesForUser(userId) {
  const q = query(collection(db, "notes"), where("userId", "==", userId));
  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getNotesForCourseAndModule(userId, courseId, moduleId) {
  const q = query(
    collection(db, "notes"),
    where("userId", "==", userId),
    where("courseId", "==", courseId),
    where("moduleId", "==", moduleId)
  );
  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function deleteNote(noteId) {
  await deleteDoc(doc(db, "notes", noteId));
}

export async function updateNote(noteId, newText) {
  await updateDoc(doc(db, "notes", noteId), { text: newText, timestamp: Date.now() });
}
