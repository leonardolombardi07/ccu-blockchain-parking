// Navigation
import {
  NavigationContainer,
  NavigationContainerProps,
  Theme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// Components
import BottomTabNavigator from "./BottomTabNavigator";
// Screens
import {
  PaymentConfirmationScreen,
  SignInScreen,
  SignUpScreen,
} from "../screens";
// Types
import { MainStackParamList } from "./types";

interface NavigatorProps extends Omit<NavigationContainerProps, "children"> {
  theme: ReactNativePaper.Theme;
}

const MainStack = createStackNavigator<MainStackParamList>();
export default function Navigator(props: NavigatorProps) {
  return (
    <NavigationContainer {...props} theme={getNavigationTheme(props.theme)}>
      <MainStack.Navigator
        screenOptions={{
          headerTitle: "",
          headerStyle: { backgroundColor: "transparent" },
          headerShadowVisible: false,
        }}
      >
        <MainStack.Screen
          name="BottomTab"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <MainStack.Screen name="SignIn" component={SignInScreen} />
        <MainStack.Screen name="SignUp" component={SignUpScreen} />
        <MainStack.Screen
          name="PaymentConfirmation"
          component={PaymentConfirmationScreen}
          options={{ headerShown: false }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}

function getNavigationTheme(theme: ReactNativePaper.Theme): Theme {
  return {
    dark: false,
    colors: {
      background: theme.colors.background,
      border: theme.colors.onSurface,
      card: theme.colors.surface,
      primary: theme.colors.primary,
      notification: theme.colors.notification,
      text: theme.colors.text,
    },
  };
}
