// Components
import { View, StyleSheet } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { Button, Card, Colors } from "react-native-paper";
import { ParkingSpotCard } from "../../components";
// Hooks
import { useParking } from "../../context/parking";
// Constants
import { Window } from "../../constants/Dimensions";
// Types
import { StackScreenProps } from "@react-navigation/stack";
import { ParkStackParamList } from "../../navigation";
// Types
import { ParkingSpot } from "../MapSearchScreen/mockParkingApi";

type OngoingParkingScreenProps = StackScreenProps<
  ParkStackParamList,
  "OngoingParking"
>;

export default function OngoingParkingScreen({
  navigation,
}: OngoingParkingScreenProps) {
  const {
    state: { ongoingParking },
  } = useParking();

  if (!ongoingParking) {
    navigation.navigate("MapSearch");
    return null;
  }

  const parkedRegion = getRegionFromOngoingParkingCoords(ongoingParking);
  return (
    <View style={styles.container}>
      <MapView region={parkedRegion} style={styles.map} scrollEnabled={false}>
        <Marker coordinate={parkedRegion} />
      </MapView>

      <ParkingSpotCard spot={ongoingParking}>
        <Card.Actions style={{ justifyContent: "center", marginBottom: 10 }}>
          <Button
            style={{ width: Window.width(90) }}
            mode="contained"
            color={Colors.red500}
            onPress={() => navigation.navigate("ValidateFinishParking")}
          >
            Finish Ongoing Parking
          </Button>
        </Card.Actions>
      </ParkingSpotCard>
    </View>
  );
}

function getRegionFromOngoingParkingCoords({
  coords: { lat, lng },
}: ParkingSpot): Region {
  return {
    latitude: lat,
    longitude: lng,
    latitudeDelta: 0,
    longitudeDelta: 0.0421,
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    position: "absolute",
    top: 0,
    width: Window.width(100),
    height: Window.height(70),
  },
});
