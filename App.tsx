import React from "react";
// Providers
import { Provider as PaperProvider } from "react-native-paper";
import { AuthProvider } from "./src/context/auth";
import { ParkingProvider } from "./src/context/parking";
// Constants
import { DefaultTheme as DefaultPaperTheme, Colors } from "react-native-paper";

// Components
import SplashScreenManager from "./src/SplashScreenManager";
// Services
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const Theme = {
  ...DefaultPaperTheme,
  colors: {
    ...DefaultPaperTheme.colors,
    background: Colors.white,
    primary: "#66778D",
    accent: Colors.white,
  },
};

export default function App() {
  return (
    <AuthProvider>
      <ParkingProvider>
        <PaperProvider theme={Theme}>
          <SplashScreenManager />
        </PaperProvider>
      </ParkingProvider>
    </AuthProvider>
  );
}
