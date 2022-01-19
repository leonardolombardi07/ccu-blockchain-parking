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
  const [locationPermission, requestPermission] =
    Location.useForegroundPermissions();

  const [region, setRegion] = React.useState<Region | null>(null);
  const [error, setError] = React.useState("");

  React.useEffect(function onFirstMount() {
    (async function setCurrentUserRegion() {
      try {
        const { coords: initialUserCoords } =
          await Location.getCurrentPositionAsync();
        setRegion({
          latitude: initialUserCoords.latitude,
          longitude: initialUserCoords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } catch (error: any) {
        setError(error || "Something went wrong");
      }
    })();
  }, []);

  if (error)
    return (
      <View style={styles.container}>
        <Paragraph style={{ textAlign: "center", marginBottom: 15 }}>
          Something went wrong. Press the button below to try to load the map
          again
        </Paragraph>
        <Button onPress={requestPermission}>Try Again</Button>
      </View>
    );

  const isLoadingPermissionsAndRegion = !locationPermission || !region;
  if (isLoadingPermissionsAndRegion)
    return (
      <View style={styles.container}>
        <ActivityIndicator color={theme.colors.backdrop} size={40} />
        <HelperText type="info" style={{ marginTop: 5 }}>
          Loading Map
        </HelperText>
      </View>
    );

  const noPermissions = locationPermission.status != "granted";
  if (noPermissions) {
    function handlePress() {
      if (!locationPermission?.canAskAgain)
        return alert(CANT_ASK_PERMISSION_AGAIN_INSTRUCTION);
      requestPermission();
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
