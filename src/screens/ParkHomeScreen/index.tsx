import React from "react";
// Components
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { Button, HelperText, Paragraph, withTheme } from "react-native-paper";
import MapView, { Region } from "react-native-maps";
// Services
import * as Location from "expo-location";
// Constants
import { Window } from "../../constants/Dimensions";

const CANT_ASK_PERMISSION_AGAIN_INSTRUCTION = `You denied the app to
ask for location permissions. To enable permissions, go to app
configurations and enable foreground location`;

export default withTheme(ParkHomeScreen);

function ParkHomeScreen({ theme }: { theme: ReactNativePaper.Theme }) {
  const [locationResponse, requestPermission] =
    Location.useForegroundPermissions();
  const [region, setRegion] = React.useState<Region | null>(null);
  const [error, setError] = React.useState("");

  async function checkPermissionsAndFetchLocation() {
    setError("");
    try {
      const { status, canAskAgain } = await requestPermission();
      if (!canAskAgain) return alert(CANT_ASK_PERMISSION_AGAIN_INSTRUCTION);
      if (status != "granted") return;

      const { coords: initialUserCoords } =
        await Location.getCurrentPositionAsync();
      setRegion({
        latitude: initialUserCoords.latitude,
        longitude: initialUserCoords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } catch (error: any) {
      setError(error?.message || "Some unexpected error occurred");
    }
  }

  React.useEffect(function onFirstMount() {
    checkPermissionsAndFetchLocation();
  }, []);

  if (error)
    return (
      <View style={styles.container}>
        <Paragraph style={{ textAlign: "center", marginBottom: 15 }}>
          Something went wrong. Press the button below to try to load the map
          again
        </Paragraph>
        <Button onPress={checkPermissionsAndFetchLocation}>Try Again</Button>
      </View>
    );

  if (!locationResponse || !region)
    return (
      <View style={styles.container}>
        <ActivityIndicator color={theme.colors.backdrop} size={40} />
        <HelperText type="info" style={{ marginTop: 5 }}>
          Loading Map
        </HelperText>
      </View>
    );

  const { status, canAskAgain } = locationResponse;
  if (status != "granted") {
    function handlePress() {
      if (!canAskAgain) return alert(CANT_ASK_PERMISSION_AGAIN_INSTRUCTION);
      checkPermissionsAndFetchLocation;
    }
    return (
      <View style={styles.container}>
        <Button onPress={handlePress}>Request Permission</Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        region={region}
        onRegionChangeComplete={setRegion}
        style={styles.map}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Window.width(100),
    height: Window.height(100),
  },
});
