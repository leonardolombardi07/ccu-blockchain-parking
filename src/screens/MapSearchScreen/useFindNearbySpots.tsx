import * as React from "react";
// Components
import { Button, Snackbar, useTheme } from "react-native-paper";
// Types
import { Marker, Region } from "react-native-maps";
import { MockApi, ParkingSpot } from "./mockParkingApi";
import { StatusBar, StyleSheet, View } from "react-native";
import { Window } from "../../constants/Dimensions";

export default function useFindNearbySpots(mapRegion: Region) {
  const theme = useTheme();
  const [nearbySpots, setNearbySpots] = React.useState<ParkingSpot[]>([]);
  const [isSearchingNearbySpots, setIsSearchingNearbySpots] =
    React.useState<boolean>(false);
  const [findNearbySpotsError, setFindNearbySpotsError] =
    React.useState<string>("");

  const findNearbySpots = React.useCallback(
    async function () {
      if (isSearchingNearbySpots) return;
      setIsSearchingNearbySpots(true);
      setFindNearbySpotsError("");
      try {
        await new Promise((resolve) => setTimeout(() => resolve(""), 1000));
        const foundSpots = await MockApi.findParkingSpotsNearbyRegion(
          mapRegion
        );
        setNearbySpots(foundSpots);
      } catch (error: any) {
        setFindNearbySpotsError(error || "Something went wrong");
      } finally {
        setIsSearchingNearbySpots(false);
      }
    },
    [
      isSearchingNearbySpots,
      mapRegion,
      setIsSearchingNearbySpots,
      setFindNearbySpotsError,
      setNearbySpots,
    ]
  );

  const FindNearbySpotsButton = React.useCallback(() => {
    return (
      <View style={styles.buttonContainer}>
        <Button
          loading={isSearchingNearbySpots}
          onPress={findNearbySpots}
          mode="contained"
          style={{ width: 150 }}
          labelStyle={styles.buttonText}
        >
          {isSearchingNearbySpots ? "Searching..." : "Find parking nearby"}
        </Button>
        <View
          style={[styles.stick, { backgroundColor: theme.colors.primary }]}
        />
      </View>
    );
  }, [isSearchingNearbySpots, findNearbySpots]);

  const FindNearbySpotsErrorSnackbar = React.useCallback(
    () => (
      <Snackbar
        visible={Boolean(findNearbySpotsError)}
        onDismiss={() => setFindNearbySpotsError("")}
        action={{ label: "Ok" }}
        duration={5000}
        wrapperStyle={{ width: Window.width(100), alignSelf: "center" }}
      >
        Something went wrong while trying to find nearby parking spots
      </Snackbar>
    ),
    [findNearbySpotsError, setFindNearbySpotsError]
  );

  return {
    nearbySpots,
    FindNearbySpotsButton,
    FindNearbySpotsErrorSnackbar,
  };
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    top: Window.height(50),
    width: 150,
  },
  stick: {
    width: 3,
    height: 20,
    alignSelf: "center",
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
  },
  buttonText: {
    fontSize: 9,
  },
});