import * as React from "react";
// Components
import { withTheme } from "react-native-paper";
// Hooks
import { useAuth } from "./context/auth";
// Navigation
import { Navigator } from "./navigation";
// Services
import * as SplashScreen from "expo-splash-screen";
import * as AuthStorage from "./services/storage/auth";
import * as Firebase from "./services/firebase";

export default withTheme(function SplashScreenManager({ theme }) {
  const { isShowingSplashScreen } = useSplashScreenWhileLoadingResources();
  if (isShowingSplashScreen) return null;
  return <Navigator theme={theme} />;
});

function useSplashScreenWhileLoadingResources() {
  const [isShowingSplashScreen, setIsShowingSplashScreen] =
    React.useState(true);
  const { dispatch } = useAuth();

  React.useEffect(function onFirstAppMount() {
    (async function loadResources() {
      try {
        await tryCachedSignIn();
      } catch (error) {
        // TODO: Report this to a log service
      } finally {
        SplashScreen.hideAsync();
        setIsShowingSplashScreen(false);
      }
    })();

    async function tryCachedSignIn() {
      // This is a bad hack. For some reason Firebase takes a while
      // to verify if the user is signed in or not and we must wait
      // at least 500ms before checking
      await new Promise((resolve) => setTimeout(() => resolve(""), 500));
      if (!Firebase.isUserSignedIn()) return;
      const cachedUser = await AuthStorage.getUser();
      if (!cachedUser) return;
      dispatch({ type: "SIGN_IN", payload: cachedUser });
    }
  }, []);

  return { isShowingSplashScreen };
}
