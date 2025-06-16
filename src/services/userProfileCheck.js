import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

export default function useProfileCheck(userParam) {
  const [loading, setLoading] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const checkProfile = async () => {
      setLoading(true);
      try {
        const currentUser = userParam || auth.currentUser;
        if (!currentUser) {
          setIsComplete(false);
          setLoading(false);
          return;
        }
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (!userDoc.exists()) {
          setIsComplete(false);
        } else {
          const data = userDoc.data();
          // Require all fields to be filled
          const requiredFields = ["firstName", "lastName", "country", "dob", "institution"];
          const allFilled = requiredFields.every(
            (field) => data[field] && String(data[field]).trim().length > 0
          );
          setIsComplete(allFilled);
        }
      } catch (err) {
        console.error(err);
        setIsComplete(false);
      }
      setLoading(false);
    };

    checkProfile();
  }, [userParam]);

  return { loading, isComplete };
}
