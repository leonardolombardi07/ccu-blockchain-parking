import * as React from "react";
// Components
import { View, TextInput as NativeTextInput, StyleSheet } from "react-native";
import { Button, Colors } from "react-native-paper";
import ParkingInfoView from "./ParkingInfoView";
// Context
import { useParking } from "../../context/parking";
import { useAuth } from "../../context/auth";
// Hooks
import { useIsMounted } from "../../hooks";
import { useSnackbar } from "../../context/snackbar";
// Services
import * as Firebase from "../../services/firebase";
// Utils
import * as Validation from "../../utils/Validation";
// Constants
import { Window } from "../../constants/Dimensions";
// Types
import { StackScreenProps } from "@react-navigation/stack";
import { ParkStackParamList } from "../../navigation";
import { Values, Errors, ShowError, Refs } from "./types";

type StartParkingScreenProps = StackScreenProps<
  ParkStackParamList,
  "StartParking"
>;

type InputType = "spotId";

export default function StartParkingScreen({
  route: { params },
  navigation,
}: StartParkingScreenProps) {
  const isMounted = useIsMounted();

  const { now, oneHourLater } = getInitialDates();
  const [startingDate, setStartingDate] = React.useState(now);
  const [endingDate, setEndingDate] = React.useState(oneHourLater);

  const spotIdRef = React.useRef<NativeTextInput>(null);
  const [values, setValues] = React.useState<Values>({ spotId: "" });
  const [errors, setErrors] = React.useState<Errors>({ spotId: "" });

  function handleChange(newValue: string, type: InputType) {
    setErrors((e) => ({ ...e, [type]: Validation.validate(type, newValue) }));
    setValues((p) => ({ ...p, [type]: newValue }));
  }

  const [isSubmiting, setIsSubmiting] = React.useState(false);
  const [hasSubmitted, setHasSubmitted] = React.useState(false);

  const { dispatch } = useParking();
  const { dispatch: snackDispatch } = useSnackbar();
  const {
    state: { user },
  } = useAuth();
  async function handleSubmit() {
    setHasSubmitted(true);
    if (isSubmiting) return;
    const spotIdError = Validation.validate("spotId", values.spotId);
    if (spotIdError) return spotIdRef.current?.focus();
    snackDispatch({ type: "HIDE" });

    setIsSubmiting(true);
    try {
      const userId = user?.uid || "anonymous";
      const parking = await Firebase.createFirestoreParking(
        userId,
        params.parkingSpot,
        startingDate,
        endingDate
      );
      dispatch({ type: "SET_ONGOING_PARKING", payload: parking });
      navigation.navigate("MapSearch");
    } catch (error: any) {
      snackDispatch({
        type: "SHOW",
        payload: { message: error?.message || error || "Something went Wrong" },
      });
    } finally {
      if (isMounted) setIsSubmiting(false);
    }
  }

  const showError = Object.fromEntries(
    Object.entries(errors).map(([key, error]) => [
      key,
      Boolean(hasSubmitted && error),
    ])
  ) as ShowError;

  const refs: Refs = { spotId: spotIdRef };

  return (
    <View style={styles.container}>
      <ParkingInfoView
        values={values}
        errors={errors}
        showError={showError}
        handleChange={handleChange}
        refs={refs}
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
        Start Parking
      </Button>
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

function getInitialDates() {
  const now = new Date();
  const oneHourLater = new Date();
  oneHourLater.setHours(now.getHours() + 1);
  return { now, oneHourLater };
}
