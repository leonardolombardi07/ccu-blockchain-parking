import * as React from "react";
// Components
import {
  Modal,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from "react-native";
import { Card, Button, Colors } from "react-native-paper";
import { ParkingSpotCard } from "../../components";
// Constants
import { Window } from "../../constants/Dimensions";
// Types
import { StackNavigationProp } from "@react-navigation/stack";
import { ParkStackParamList } from "../../navigation";

interface ParkingSpotModalProps {
  selectedSpot: any; // Fix this
  closeModal: () => void;
  navigation: StackNavigationProp<ParkStackParamList, "MapSearch">;
}

export default function ParkingSpotModal({
  selectedSpot,
  closeModal,
  navigation,
}: ParkingSpotModalProps) {
  const { title, price, distance, photos } = selectedSpot || {};

  function handlePressPark() {
    if (!selectedSpot) return; // This won't happen but we should do it for typescript anyway
    navigation.navigate("ValidateStartParking", {
      parkingSpot: selectedSpot,
    });
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={Boolean(selectedSpot)}
      onRequestClose={closeModal}
    >
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      <ParkingSpotCard spot={selectedSpot}>
        <Card.Actions style={{ justifyContent: "center", marginBottom: 10 }}>
          <Button
            style={{ width: Window.width(90) }}
            mode="contained"
            color={Colors.green500}
            onPress={handlePressPark}
          >
            Park the Car
          </Button>
        </Card.Actions>
      </ParkingSpotCard>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  content: {
    position: "absolute",
    bottom: 0,
    width: Window.width(100),
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    justifyContent: "center",
  },
});
