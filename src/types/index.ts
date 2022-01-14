import { UserInfo as FirebaseUserInfo } from "firebase/auth";

type PayingMethod = "CREDIT_CARD" | "PAYPAL";
type ParkingStatus = "ROAMING" | "PARKED" | "BLOCKED";

export interface User extends FirebaseUserInfo {
  name: string;
  car: string | null;
  payingMethod: PayingMethod | null;
  parkingStatus: ParkingStatus | null;
}
