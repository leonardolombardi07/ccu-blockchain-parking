// Types
import { Region } from "react-native-maps";
import { ParkingSpot } from "../screens/MapSearchScreen/mockParkingApi";
import { Parking } from "../services/firebase";

export type MainStackParamList = {
  BottomTab: undefined;
  SignIn: undefined;
  SignUp: undefined;
  PaymentConfirmation: { parking: Parking };
};

export type BottomTabParamList = {
  ParkStack: undefined;
  ProfileStack: undefined;
};

export type ParkStackParamList = {
  MapSearch: undefined;
  StartParking: { parkingSpot: ParkingSpot };
  SearchByQuery: { mapRegion: Region };
};

export type ProfileStackParamList = {
  Profile: undefined;
  MyParkings: undefined;
};
