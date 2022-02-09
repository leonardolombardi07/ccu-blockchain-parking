import { Region } from "react-native-maps";

export function getMapExtremities({
  latitude,
  longitude,
  latitudeDelta,
  longitudeDelta,
}: Region) {
  // See:
  // https://stackoverflow.com/questions/36685372/how-to-zoom-in-out-in-react-native-map/36688156#36688156

  const topLeft = {
    lat: latitude - latitudeDelta / 2,
    lng: longitude - longitudeDelta / 2,
  };

  const topRight = {
    lat: latitude - latitudeDelta / 2,
    lng: longitude + longitudeDelta / 2,
  };

  const bottomLeft = {
    lat: latitude + latitudeDelta / 2,
    lng: longitude - longitudeDelta / 2,
  };

  const bottomRight = {
    lat: latitude + latitudeDelta / 2,
    lng: longitude + longitudeDelta / 2,
  };

  return { topLeft, topRight, bottomRight, bottomLeft };
}
