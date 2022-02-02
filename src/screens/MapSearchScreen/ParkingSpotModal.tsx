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
import { useParking } from "../../context/parking";

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
  const {
    state: { ongoingParking },
  } = useParking();

  function handlePressPark() {
    if (!selectedSpot) return; // This won't happen but we should do it for typescript anyway
    closeModal();
    navigation.navigate("StartParking", {
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
        <Card.Actions style={{ marginBottom: 10, paddingHorizontal: 20 }}>
          <Button mode="text" onPress={closeModal} style={{ marginRight: 10 }}>
            Close
          </Button>

          {ongoingParking ? null : (
            <Button
              mode="contained"
              color={Colors.green500}
              onPress={handlePressPark}
            >
              Park Now
            </Button>
          )}
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
