import * as React from "react";
// Components
import { View, StyleSheet } from "react-native";
import { Button, Snackbar, Colors } from "react-native-paper";
import ParkingInfoView from "./ParkingInfoView";
// Context
import { useParking } from "../../context/parking";
// Hooks
import { useIsMounted } from "../../hooks";
// Services
import * as Firebase from "../../services/firebase";
// Constants
import { Window } from "../../constants/Dimensions";
// Types
import { StackScreenProps } from "@react-navigation/stack";
import { ParkStackParamList } from "../../navigation";
import { useAuth } from "../../context/auth";

type CheckoutScreenProps = StackScreenProps<ParkStackParamList, "Checkout">;

export default function CheckoutScreen({
  route: { params },
  navigation,
}: CheckoutScreenProps) {
  const isMounted = useIsMounted();

  const { now, oneHourLater } = getInitialDates();
  const [startingDate, setStartingDate] = React.useState(now);
  const [endingDate, setEndingDate] = React.useState(oneHourLater);

  const [isSubmiting, setIsSubmiting] = React.useState(false);
  const [hasSubmitted, setHasSubmitted] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [isSnackbarVisible, setIsSnackbarVisible] = React.useState(false);

  const { dispatch } = useParking();
  const {
    state: { user },
  } = useAuth();
  async function handleSubmit() {
    setHasSubmitted(true);
    if (isSubmiting) return;
    setIsSnackbarVisible(false);
    setIsSubmiting(true);
    try {
      if (user?.uid) {
        await Firebase.createFirestoreParking(
          user?.uid,
          params.parkingSpot,
          startingDate,
          endingDate
        );
      } else {
        await MockPayment.pay();
      }

      dispatch({ type: "SET_ONGOING_PARKING", payload: params.parkingSpot });
      navigation.navigate("MapSearch");
    } catch (error: any) {
      setSubmitError(error?.message || error || "Something went Wrong");
      setIsSnackbarVisible(true);
    } finally {
      if (isMounted) setIsSubmiting(false);
    }
  }

  return (
    <View style={styles.container}>
      <ParkingInfoView
        spot={params.parkingSpot}
        startingDate={startingDate}
        onChangeStartingDate={(d) => setStartingDate(d)}
        endingDate={endingDate}
        onChangeEndingDate={(d) => setEndingDate(d)}
      />

      <Button
        loading={isSubmiting}
        style={styles.button}
        color={Colors.green500}
        mode="contained"
        onPress={handleSubmit}
      >
        Pay
      </Button>

      <Snackbar
        visible={isSnackbarVisible}
        onDismiss={() => setIsSnackbarVisible((v) => !v)}
        action={{ label: "Ok" }}
        duration={Infinity}
        wrapperStyle={{ width: Window.width(100), alignSelf: "center" }}
      >
        {submitError}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  button: {
    width: Window.width(90),
    marginTop: 30,
    alignSelf: "center",
  },
});

const MockPayment = {
  pay: function () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.2) return resolve("");
        reject("Invalid Payment");
      }, 1000);
    });
  },
};

function getInitialDates() {
  const now = new Date();
  const oneHourLater = new Date();
  oneHourLater.setHours(now.getHours() + 1);
  return { now, oneHourLater };
}
