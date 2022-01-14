import * as React from "react";
// Navigation
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// Screens
import {
  HomeScreen,
  SearchScreen,
  ScanScreen,
  ProfileScreen,
} from "../screens";
// Components
import { IconButton as PaperIcon, withTheme } from "react-native-paper";
// Types
import { BottomTabsParamList } from "./types";

const BottomTab = createBottomTabNavigator<BottomTabsParamList>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      screenOptions={{ tabBarLabel: "", headerShown: false }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <Icon icon="home" focused={focused} />,
        }}
      />

      <BottomTab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon icon="magnify" focused={focused} />
          ),
        }}
      />

      <BottomTab.Screen
        name="Scan"
        component={ScanScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon icon="qrcode-scan" focused={focused} />
          ),
        }}
      />

      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon icon="account" focused={focused} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

const Icon = withTheme(IconWithTheme);

function IconWithTheme({
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
      style={{ marginBottom: -5 }}
    />
  );
}
