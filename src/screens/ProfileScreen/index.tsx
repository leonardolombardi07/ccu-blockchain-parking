import * as React from "react";
// Components
import ProfileAuthenticatedScreen from "./ProfileAuthenticated";
import ProfileUnauthenticatedScreen from "./ProfileUnauthenticated";
import { withTheme } from "react-native-paper";
// Hooks
import { useAuth } from "../../context/auth";
// Types
import { StackScreenProps } from "@react-navigation/stack";
import { MainStackParamList, ProfileStackParamList } from "../../navigation";

export type ProfileScreenProps = StackScreenProps<
  MainStackParamList & ProfileStackParamList,
  "SignIn" | "SignUp" | "MyParkings"
> & {
  theme: ReactNativePaper.Theme;
};

export default withTheme(function ProfileScreen(props: ProfileScreenProps) {
  const {
    state: { isAuthenticated },
  } = useAuth();

  if (isAuthenticated) {
    return <ProfileAuthenticatedScreen {...props} />;
  } else {
    return <ProfileUnauthenticatedScreen {...props} />;
  }
});
