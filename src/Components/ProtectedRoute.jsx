import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";

export default function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchUserStatus = async () => {
      if (currentUser) {
        const userDocRef = doc(db, "Users", currentUser.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.data().status === "Blocked") {
          auth.signOut();
        }
      }
    };

    fetchUserStatus();
  }, [currentUser]);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
}
