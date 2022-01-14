import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User as FirebaseUser,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  DocumentReference,
  DocumentData,
  updateDoc,
  setDoc,
} from "firebase/firestore";
// Utils
import * as File from "../../../utils/File";
import { uploadUserPhotoUrl } from "../storage";
// Types
import { User } from "../../../types";

const auth = getAuth();
const firestore = getFirestore();
const users = collection(firestore, "users");

interface SignInValues {
  email: string;
  password: string;
}

interface SignUpValues extends SignInValues {
  name: string;
}

export function isUserSignedIn(): boolean {
  return Boolean(auth.currentUser);
}

export async function signUp({
  name,
  email,
  password,
}: SignUpValues): Promise<User> {
  try {
    const { user: firebaseUser } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const userDoc = await createFirestoreUser(firebaseUser, { name });
    return getUser(userDoc);
  } catch (error) {
    throw error;
  }
}

export async function signIn({ email, password }: SignInValues): Promise<User> {
  try {
    const { user: firebaseUser } = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return getUser(getUserDoc(firebaseUser.uid));
  } catch (error) {
    throw error;
  }
}

export function signOutUser(): void {
  signOut(auth);
}

export async function editUser(uid: string, fields: Partial<User>) {
  try {
    await updateDoc(getUserDoc(uid), fields);
  } catch (error) {
    throw error;
  }
}

export async function editUserPhotoUrl(uid: string, uri: string) {
  try {
    const blob = await File.uriToBlobAsync(uri);
    const photoURL = await uploadUserPhotoUrl(blob, uid);
    await editUser(uid, { photoURL });
  } catch (error) {
    throw error;
  }
}

async function createFirestoreUser(
  firebaseUser: FirebaseUser,
  fields: { name: string }
) {
  const userDoc = getUserDoc(firebaseUser.uid);
  await setDoc(userDoc, {
    uid: firebaseUser.uid,
    name: fields.name,
    email: firebaseUser.email,
    photoUrl: firebaseUser.photoURL,
    car: null,
    payingMethod: null,
    parkingStatus: null,
  });
  return userDoc;
}

async function getUser(doc: DocumentReference<DocumentData>): Promise<User> {
  const docSnap = await getDoc(doc);
  if (!docSnap.exists()) {
    throw new Error("User not found");
  }
  const user = docSnap.data();
  return user as User;
}

function getUserDoc(uid: string) {
  return doc(firestore, `${users.path}/${uid}`);
}
