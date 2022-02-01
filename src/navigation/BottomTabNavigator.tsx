import * as React from "react";
// Navigation
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
// Screens
import {
  MapSearchScreen,
  SearchByQueryScreen,
  StartParkingScreen,
  ProfileScreen,
  MyParkingsScreen,
  PaymentConfirmationScreen,
} from "../screens";
// Components
import { IconButton as PaperIcon, withTheme } from "react-native-paper";
// Types
import {
  BottomTabParamList,
  ParkStackParamList,
  ProfileStackParamList,
} from "./types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();
export default withTheme(function BottomTabNavigator({ theme }) {
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarLabel: "",
        headerShown: false,
        tabBarStyle: { backgroundColor: theme.colors.primary },
        tabBarHideOnKeyboard: true,
      }}
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
});

const ParkStack = createStackNavigator<ParkStackParamList>();
function ParkStackNavigator() {
  return (
    <ParkStack.Navigator screenOptions={{ headerShown: false }}>
      <ParkStack.Screen name={"MapSearch"} component={MapSearchScreen} />

      <ParkStack.Screen
        name={"SearchByQuery"}
        component={SearchByQueryScreen}
      />

      <ParkStack.Screen
        name="StartParking"
        component={StartParkingScreen}
        options={{ headerShown: true, headerTitle: "Park Now" }}
      />
    </ParkStack.Navigator>
  );
}

const ProfileStack = createStackNavigator<ProfileStackParamList>();
function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen
        name="MyParkings"
        component={MyParkingsScreen}
        options={{ headerShown: true, title: "Previous Parkings" }}
      />
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
      color={focused ? colors.surface : colors.backdrop}
      size={28}
      style={{ marginBottom: -6 }}
    />
  );
});
