import { Region } from "react-native-maps";
import { ParkingSpot } from "../screens/MapSearchScreen/mockParkingApi";

export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

export type BottomTabsParamList = {
  ParkStack: undefined;
  ProfileStack: undefined;
};

export type ParkStackParamList = {
  MapSearch: undefined;
  ValidateStartParking: { parkingSpot: ParkingSpot };
  ValidateFinishParking: undefined;
  OngoingParking: undefined;
  SearchByQuery: { mapRegion: Region };
};

export type ProfileStackParamList = {
  Profile: undefined;
};
