import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  runTransaction,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
} from "firebase/auth";

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

export async function setUser(name, email, password) {
  const usersCollection = collection(db, "Users");
  try {
    await runTransaction(db, async (transaction) => {
      const emailDocRef = doc(usersCollection, email);
      const emailDoc = await transaction.get(emailDocRef);
      if (emailDoc.exists()) {
        throw new Error("Email already exists");
      }
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await transaction.set(emailDocRef, {
        name: name,
        email: user.email,
        id: user.uid,
        lastLogin: user.metadata.lastSignInTime,
        registrationDate: user.metadata.creationTime,
        status: "Active",
      });
    });
  } catch (error) {
    const auth = getAuth();
    if (auth.currentUser) await deleteUser(auth.currentUser);
    console.log("Transaction failed:", error);
    throw error;
  }
}

export async function updateLastLogInUser(user) {
  const userDocRef = doc(db, "Users", user.email);
  await updateDoc(userDocRef, {
    lastLogin: user.metadata.lastSignInTime,
  });
}

export async function updateUserStatus(emails, status) {
  try {
    const batch = writeBatch(db);

    emails.forEach((email) => {
      const userRef = doc(db, "Users", email);
      batch.update(userRef, { status });
    });

    await batch.commit();
  } catch (error) {
    console.log(error);
  }
}

export async function deleteUserById(currentUser) {
  const userRef = doc(db, "Users", currentUser.email);
  await deleteDoc(userRef);
  await currentUser.delete();
}
