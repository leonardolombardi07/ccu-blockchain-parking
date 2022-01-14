// Hooks
import { useAuth } from "../context/auth";
// Navigation
import {
  NavigationContainer,
  NavigationContainerProps,
} from "@react-navigation/native";
import BottomTabNavigator from "./BottomTabNavigator";
import AuthStackNavigator from "./AuthStackNavigator";

interface NavigatorProps extends Omit<NavigationContainerProps, "children"> {}

export default function Navigator(props: NavigatorProps) {
  const { state } = useAuth();
  return (
    <NavigationContainer {...props}>
      {state?.isAuthenticated ? <BottomTabNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}
