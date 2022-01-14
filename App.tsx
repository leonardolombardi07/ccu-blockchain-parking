import React from "react";
// Providers
import {
  Provider as PaperProvider,
  DefaultTheme as DefaultPaperTheme,
  Colors,
} from "react-native-paper";
import { AuthProvider } from "./src/context/auth";
// Components
import SplashScreenManager from "./src/SplashScreenManager";
// Services
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const Theme = {
  ...DefaultPaperTheme,
  colors: {
    ...DefaultPaperTheme.colors,
    accent: Colors.purple900,
  },
};

export default function App() {
  return (
    <AuthProvider>
      <PaperProvider theme={Theme}>
        <SplashScreenManager />
      </PaperProvider>
    </AuthProvider>
  );
}
