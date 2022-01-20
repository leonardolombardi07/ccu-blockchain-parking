// Components
import { View, StyleSheet } from "react-native";
import { Button, Colors, Paragraph } from "react-native-paper";
// Context
import { useParking } from "../../context/parking";
// Types
import { StackScreenProps } from "@react-navigation/stack";
import { ParkStackParamList } from "../../navigation";

type ValidateStartParkingScreenProps = StackScreenProps<
  ParkStackParamList,
  "ValidateStartParking"
>;

export default function ValidateStartParkingScreen({
  route,
  navigation,
}: ValidateStartParkingScreenProps) {
  const { dispatch } = useParking();

  function handleValidate() {
    dispatch({
      type: "SET_ONGOING_PARKING",
      payload: route.params.parkingSpot,
    });
    navigation.reset({ index: 0, routes: [{ name: "OngoingParking" }] });
  }

  return (
    <View style={styles.container}>
      <Button mode="contained" color={Colors.green500} onPress={handleValidate}>
        Click here to start parking
      </Button>
      <Paragraph style={{ textAlign: "center", marginTop: 15 }}>
        This could use a QR Code or another system to validate that the user
        really did start the parking
      </Paragraph>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
});
