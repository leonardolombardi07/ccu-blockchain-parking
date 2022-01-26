import { Region } from "react-native-maps";
import { ParkingSpot } from "../screens/MapSearchScreen/mockParkingApi";

export type MainStackParamList = {
  BottomTab: undefined;
  SignIn: undefined;
  SignUp: undefined;
};

export type BottomTabParamList = {
  ParkStack: undefined;
  ProfileStack: undefined;
};

export type ParkStackParamList = {
  MapSearch: undefined;
  Checkout: { parkingSpot: ParkingSpot };
  SearchByQuery: { mapRegion: Region };
};

export type ProfileStackParamList = {
  Profile: undefined;
  MyParkings: undefined;
};
