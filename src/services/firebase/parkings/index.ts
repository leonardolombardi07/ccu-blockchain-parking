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
import { ParkingSpot } from "../../../screens/MapSearchScreen/mockParkingApi";

export interface Parking {
  id: string;
  uid: string;
  spot: ParkingSpot; // Ideally we should get only the id, but we don't have parking spots in the database
  startingDate: Date;
  endingDate: Date;
}

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
      startingDate: parking?.startingDate.toDate(),
      endingDate: parking?.endingDate.toDate(),
    } as Parking);
  });
  return userParkings;
}

export async function createFirestoreParking(
  uid: string,
  spot: ParkingSpot,
  startingDate: Date,
  endingDate: Date
): Promise<Parking> {
  const parkingDoc = getParkingDoc(uid, spot, startingDate, endingDate);
  await setDoc(parkingDoc, {
    id: getParkingPath(uid, spot, startingDate, endingDate),
    uid,
    spot,
    startingDate,
    endingDate,
  } as Parking);
  return { startingDate, endingDate, spot, uid, id: parkingDoc.id };
}

function getParkingDoc(
  uid: string,
  spot: ParkingSpot,
  startingDate: Date,
  endingDate: Date
) {
  return doc(firestore, getParkingPath(uid, spot, startingDate, endingDate));
}

function getParkingPath(
  uid: string,
  spot: ParkingSpot,
  startingDate: Date,
  endingDate: Date
) {
  return `${parkings.path}/${startingDate.getTime()}|${endingDate.getTime()}`;
}
