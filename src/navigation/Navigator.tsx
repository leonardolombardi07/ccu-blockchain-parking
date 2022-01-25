// Hooks
import { useAuth } from "../context/auth";
// Navigation
import {
  NavigationContainer,
  NavigationContainerProps,
  Theme,
} from "@react-navigation/native";
import BottomTabNavigator from "./BottomTabNavigator";
import AuthStackNavigator from "./AuthStackNavigator";

interface NavigatorProps extends Omit<NavigationContainerProps, "children"> {
  theme: ReactNativePaper.Theme;
}

export default function Navigator(props: NavigatorProps) {
  const { state } = useAuth();
  return (
    <NavigationContainer {...props} theme={getNavigationTheme(props.theme)}>
      {state?.isAuthenticated ? <BottomTabNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}

function getNavigationTheme(theme: ReactNativePaper.Theme): Theme {
  return {
    dark: false,
    colors: {
      background: theme.colors.background,
      border: theme.colors.onSurface,
      card: theme.colors.accent,
      primary: theme.colors.primary,
      notification: theme.colors.notification,
      text: theme.colors.text,
    },
  };
}
