import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { db } from "../config/firebase";

export function getUsers(setUsers) {
  const usersCollection = collection(db, "Users");

  const unsubscribe = onSnapshot(usersCollection, (querySnapshot) => {
    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({
        id: doc.id,
        selected: false,
        ...doc.data(),
      });
    });
    setUsers(users);
  });

  return unsubscribe;
}

export async function setUser(name, user) {
  await setDoc(doc(db, "Users", user.uid), {
    name: name,
    email: user.email,
    id: user.uid,
    lastLogin: user.metadata.lastSignInTime,
    registrationDate: user.metadata.creationTime,
    status: "Active",
  });
}

export async function updateLastLogInUser(user) {
  const userDocRef = doc(db, "Users", user.uid);
  await updateDoc(userDocRef, {
    lastLogin: user.metadata.lastSignInTime,
  });
}

export async function updateUserStatus(uids, status) {
  try {
    const batch = writeBatch(db);

    uids.forEach((uid) => {
      const userRef = doc(db, "Users", uid);
      batch.update(userRef, { status });
    });

    await batch.commit();
  } catch (error) {
    console.log(error);
  }
}

export async function deleteUserById(currentUser) {
  const userRef = doc(db, "Users", currentUser.uid);
  await deleteDoc(userRef);
  await currentUser.delete();
}
