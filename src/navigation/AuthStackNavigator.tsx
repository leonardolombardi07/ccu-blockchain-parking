// Navigation
import { createStackNavigator } from "@react-navigation/stack";
import { AuthStackParamList } from "./types";
// Screens
import { SignInScreen, SignUpScreen } from "../screens";

const AuthStack = createStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        component={SignInScreen}
        name="SignIn"
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        component={SignUpScreen}
        name="SignUp"
        options={{ headerTitle: "Registration" }}
      />
    </AuthStack.Navigator>
  );
}
