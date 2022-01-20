import * as React from "react";
// Navigation
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
// Context
import { useParking } from "../context/parking";
// Screens
import {
  MapSearchScreen,
  OngoingParkingScreen,
  ValidateStartParkingScreen,
  ValidateFinishParkingScreen,
  ProfileScreen,
  SearchByQueryScreen,
} from "../screens";
// Components
import { IconButton as PaperIcon, withTheme } from "react-native-paper";
// Types
import {
  BottomTabsParamList,
  ParkStackParamList,
  ProfileStackParamList,
} from "./types";
import * as StatusBar from "expo-status-bar";

const BottomTab = createBottomTabNavigator<BottomTabsParamList>();
export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      screenOptions={{ headerShown: false, tabBarLabel: "" }}
    >
      <BottomTab.Screen
        name="ParkStack"
        component={ParkStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <BottomTabIcon icon="map-marker" focused={focused} />
          ),
        }}
      />

      <BottomTab.Screen
        name="ProfileStack"
        component={ProfileStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <BottomTabIcon icon="account" focused={focused} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

const ParkStack = createStackNavigator<ParkStackParamList>();
function ParkStackNavigator() {
  const {
    state: { ongoingParking },
  } = useParking();

  return (
    <ParkStack.Navigator screenOptions={{ headerShown: false }}>
      <ParkStack.Screen name={"MapSearch"} component={MapSearchScreen} />

      <ParkStack.Screen
        name={"OngoingParking"}
        component={OngoingParkingScreen}
      />

      <ParkStack.Screen
        name={"SearchByQuery"}
        component={SearchByQueryScreen}
      />

      <ParkStack.Screen
        name="ValidateStartParking"
        component={ValidateStartParkingScreen}
      />
      <ParkStack.Screen
        name="ValidateFinishParking"
        component={ValidateFinishParkingScreen}
      />
    </ParkStack.Navigator>
  );
}

const ProfileStack = createStackNavigator<ProfileStackParamList>();
function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
}

const BottomTabIcon = withTheme(function IconWithTheme({
  theme: { colors },
  icon,
  focused,
}: {
  theme: ReactNativePaper.Theme;
  icon: string;
  focused: boolean;
}) {
  return (
    <PaperIcon
      icon={icon}
      color={focused ? colors.primary : colors.backdrop}
      size={28}
      style={{ marginBottom: -6 }}
    />
  );
});
