import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

export async function getMissions() {
  const snapshot = await getDocs(collection(db, "missions"));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    completed: false, 
  }));
}
