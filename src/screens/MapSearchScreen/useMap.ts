import * as React from "react";
// Constants
import { Window } from "../../constants/Dimensions";
// Services
import * as Location from "expo-location";
// Types
import { Region } from "react-native-maps";

const DEFAULT_MAP_REGION: Region = {
  latitude: 38.7773584,
  longitude: -9.0977409,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const CANT_ASK_PERMISSION_AGAIN_INSTRUCTION = `You denied the app to
ask for location permissions. To enable permissions, go to app
configurations and enable foreground location`;

export default function useMap() {
  const [locationPermission, requestPermission] =
    Location.useForegroundPermissions();

  const [mapRegion, setMapRegion] = React.useState<Region>(DEFAULT_MAP_REGION);
  const [isLoadingUserPosition, setIsLoadingUserPosition] =
    React.useState(true);
  const [fetchUserPositionError, setFetchUserPositionError] =
    React.useState("");

  const userCoordsRef = React.useRef<Location.LocationObjectCoords>();

  async function updateMapRegionToCurrentUserPosition() {
    setIsLoadingUserPosition(true);
    try {
      const { coords: userCoords } = await Location.getCurrentPositionAsync();
      setMapRegion({
        latitude: userCoords.latitude,
        longitude: userCoords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      userCoordsRef.current = userCoords;
    } catch (error: any) {
      setFetchUserPositionError(error || "Something went wrong");
    } finally {
      setIsLoadingUserPosition(false);
    }
  }

  React.useEffect(function onFirstMount() {
    updateMapRegionToCurrentUserPosition();
  }, []);

  async function checkPermissionsAndUpdateMapRegion() {
    const { status, canAskAgain } = await requestPermission();
    if (!canAskAgain) return alert(CANT_ASK_PERMISSION_AGAIN_INSTRUCTION);
    if (status != "granted") return;
    updateMapRegionToCurrentUserPosition();
  }

  function focusOnUserLocation() {
    const { latitude, longitude } = userCoordsRef.current || {};
    if (latitude && longitude) {
      setMapRegion((deltas) => ({ ...deltas, latitude, longitude }));
    }
  }

  return {
    mapRegion,
    focusOnUserLocation,
    fetchUserPositionError,
    isLoadingMap: !locationPermission || isLoadingUserPosition,
    checkPermissionsAndUpdateMapRegion,
    handleMapChange: function (r: Region) {
      setMapRegion(r);
    },
  };
}
