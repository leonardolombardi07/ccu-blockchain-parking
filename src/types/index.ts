import { UserInfo as FirebaseUserInfo } from "firebase/auth";

export interface User extends FirebaseUserInfo {
  name: string;
  plate: string;
}

export interface ParkingSpot {
  id: number;
  title: string;
  status: "AVALIABLE" | "UNAVALIABLE";
  coords: { lat: number; lng: number };
  photos: string[];
  reviews: { rating: number; count: number };
  price: { amount: number; currency: string; formatted: string };
  distance: number;
}

export interface Parking {
  id: string;
  uid: string;
  spot: ParkingSpot; // Ideally we should get only the id, but we don't have parking spots in the database
  startingDate: Date;
  endingDate: Date;
}
