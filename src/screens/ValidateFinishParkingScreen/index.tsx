// Components
import { View, StyleSheet } from "react-native";
import { Button, Colors, Paragraph } from "react-native-paper";
// Context
import { useParking } from "../../context/parking";
// Types
import { StackScreenProps } from "@react-navigation/stack";
import { ParkStackParamList } from "../../navigation";

type ValidateFinishParkingScreenProps = StackScreenProps<
  ParkStackParamList,
  "ValidateFinishParking"
>;

export default function ValidateFinishParkingScreen({
  navigation,
}: ValidateFinishParkingScreenProps) {
  const { dispatch } = useParking();

  function handleValidate() {
    dispatch({ type: "SET_ONGOING_PARKING", payload: null });
    navigation.reset({ index: 0, routes: [{ name: "MapSearch" }] });
  }

  return (
    <View style={styles.container}>
      <Button mode="contained" color={Colors.red500} onPress={handleValidate}>
        Click here to finish parking
      </Button>
      <Paragraph style={{ textAlign: "center", marginTop: 15 }}>
        This could use a QR Code or another system to validate that the user
        really did finish the parking
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
