import {
  getFirestore,
  collection,
  doc,
  getDocs,
  query,
  where,
  setDoc,
  Timestamp,
  getDoc,
} from "firebase/firestore";
import { ParkingSpot, Parking } from "../../../types";

const firestore = getFirestore();
const parkings = collection(firestore, "parkings");

export async function getUserParkings(uid: string): Promise<Parking[]> {
  const q = query(parkings, where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  const userParkings = [] as Parking[];
  querySnapshot.forEach((doc) => {
    const parking = doc.data() as any;
    userParkings.push({
      ...parking,
      id: doc.id,
      startingDate: parking?.startingDate.toDate(),
      endingDate: parking?.endingDate.toDate(),
    } as Parking);
  });
  return userParkings;
}

export async function editOngoingParking(
  parking: Parking,
  fields: Partial<Parking>
) {
  const { startingDate } = parking;
  const parkingDoc = getParkingDoc(startingDate);
  await setDoc(parkingDoc, { ...fields }, { merge: true });
}

export async function createFirestoreParking(
  uid: string,
  spot: ParkingSpot,
  startingDate: Date,
  endingDate: Date
): Promise<Parking> {
  const parkingDoc = getParkingDoc(startingDate);
  await setDoc(parkingDoc, {
    id: getParkingPath(startingDate),
    uid,
    spot,
    startingDate,
    endingDate,
  } as Parking);
  return { startingDate, endingDate, spot, uid, id: parkingDoc.id };
}

function getParkingDoc(startingDate: Date) {
  return doc(firestore, getParkingPath(startingDate));
}

function getParkingPath(startingDate: Date) {
  return `${parkings.path}/${startingDate.getTime()}`;
}
