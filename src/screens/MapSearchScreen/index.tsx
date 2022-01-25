import React from "react";
// Components
import { StatusBar, View, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import {
  HelperText,
  Button,
  Searchbar,
  IconButton,
  Paragraph,
  withTheme,
  TouchableRipple,
} from "react-native-paper";
import { LoadingIndicator } from "../../components";
import ParkingSpotModal from "./ParkingSpotModal";
// Hooks
import useMap from "./useMap";
import useFindNearbySpots from "./useFindNearbySpots";
// Constants
import { Window } from "../../constants/Dimensions";
// Types
import { ParkingSpot } from "./mockParkingApi";
import { StackScreenProps } from "@react-navigation/stack";
import { ParkStackParamList } from "../../navigation";

type MapSearchScreenProps = StackScreenProps<
  ParkStackParamList,
  "MapSearch"
> & {
  theme: ReactNativePaper.Theme;
};

export default withTheme(function MapSearchScreen({
  navigation,
  theme,
}: MapSearchScreenProps) {
  const {
    isLoadingMap,
    mapRegion,
    fetchUserPositionError,
    checkPermissionsAndUpdateMapRegion,
    handleMapChange,
    focusOnUserLocation,
  } = useMap();

  const { nearbySpots, FindNearbySpotsButton, FindNearbySpotsErrorSnackbar } =
    useFindNearbySpots(mapRegion);

  const [selectedSpot, setSelectedSpot] = React.useState<ParkingSpot | null>(
    null
  );

  const Markers: any = React.useCallback(
    () =>
      nearbySpots.map(function renderSpot(spot) {
        return (
          <Marker
            key={spot.id}
            title={spot.title}
            description={`Price: ${Math.floor(
              spot.price.amount
            )}$ | Distance: ${spot.distance}m`}
            coordinate={{
              latitude: spot.coords.lat,
              longitude: spot.coords.lng,
            }}
            onPress={() => setSelectedSpot(spot)}
          />
        );
      }),
    [nearbySpots, setSelectedSpot]
  );

  if (isLoadingMap)
    return (
      <View style={styles.screenContainer}>
        <LoadingIndicator />
        <HelperText type="info" style={{ marginTop: 5 }}>
          Loading Map
        </HelperText>
      </View>
    );

  if (fetchUserPositionError)
    return (
      <View style={styles.screenContainer}>
        <Paragraph style={{ textAlign: "center", marginBottom: 15 }}>
          Something went wrong. Press the button below to try to load the map
          again
        </Paragraph>
        <Button onPress={checkPermissionsAndUpdateMapRegion}>Try Again</Button>
      </View>
    );

  return (
    <View style={styles.screenContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate("SearchByQuery", { mapRegion })}
        activeOpacity={0.7}
        style={styles.searchBar}
      >
        <Searchbar
          value={""}
          editable={false}
          placeholder="Enter your destination here..."
        />
      </TouchableOpacity>

      <FindNearbySpotsButton />
      <MapView
        region={mapRegion}
        onRegionChangeComplete={handleMapChange}
        style={styles.map}
      >
        <Markers />
      </MapView>

      <View
        style={[styles.focusIcon, { backgroundColor: theme.colors.primary }]}
      >
        <IconButton
          icon="crosshairs-gps"
          color={theme.colors.surface}
          size={30}
          onPress={focusOnUserLocation}
        />
      </View>

      <ParkingSpotModal
        selectedSpot={selectedSpot}
        closeModal={() => setSelectedSpot(null)}
        navigation={navigation}
      />

      <FindNearbySpotsErrorSnackbar />
    </View>
  );
});

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  searchBar: {
    position: "absolute",
    top: StatusBar.currentHeight ? StatusBar.currentHeight + 20 : 50,
    width: Window.width(90),
  },
  map: {
    width: Window.width(100),
    height: Window.height(100),
    zIndex: -1,
  },
  focusIcon: {
    position: "absolute",
    right: 15,
    bottom: 15,
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
