import * as React from "react";
// Components
import { View, StyleSheet } from "react-native";
import {
  Surface,
  Text,
  Caption,
  Headline,
  useTheme,
  Button,
  Colors,
  Snackbar,
  TextInput,
} from "react-native-paper";
import BottomSheet from "reanimated-bottom-sheet";
import { DragHint, DateTimePickerInput } from "../../components";
// Context
import { useParking } from "../../context/parking";
// Hooks
import { useNavigation } from "@react-navigation/native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
// Services
import * as Firebase from "../../services/firebase";
// Constants
import { Window } from "../../constants/Dimensions";
// Utils
import * as DateUtil from "../../utils/Date";
// Types
import { ParkingSpot } from "../MapSearchScreen/mockParkingApi";

interface ParkingInfoViewProps {
  spot: ParkingSpot | null;
  startingDate: Date;
  endingDate: Date;
  onChangeEndingDate: (newDate: Date) => void;
  theme: ReactNativePaper.Theme;
}

export default function OngoingParkingModal() {
  // TODO: fix navigation type - it is a nested navigation
  const navigation: any = useNavigation();

  const theme = useTheme();
  const bottomTabHeight = useBottomTabBarHeight();

  const [isSubmiting, setIsSubmiting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState("");
  const {
    state: { ongoingParking },
    dispatch,
  } = useParking();

  async function handlePay() {
    setIsSubmiting(true);
    setSubmitError("");
    try {
      await MockPayment.pay();
      dispatch({ type: "SET_ONGOING_PARKING", payload: null });
      navigation.navigate("PaymentConfirmation", { parking: ongoingParking });
    } catch (error: any) {
      setSubmitError(error || "Something went wrong");
    } finally {
      setIsSubmiting(false);
    }
  }

  async function handleEditEndingDate(newDate: Date) {
    if (!ongoingParking) return;
    const previousDate = ongoingParking?.endingDate;
    try {
      const editedFields = { endingDate: newDate };
      dispatch({ type: "EDIT_ONGOING_PARKING", payload: editedFields });
      await Firebase.editOngoingParking(ongoingParking, editedFields);
    } catch (error) {
      // Rollback to last version
      // TODO: show snackbar with error and not alert
      dispatch({
        type: "EDIT_ONGOING_PARKING",
        payload: { endingDate: previousDate },
      });
      alert("Something went wrong");
    }
  }

  if (!ongoingParking) {
    return null;
  }

  const HEIGHT_ABOVE_BOTTOM_TAB = 205;
  return (
    <>
      <BottomSheet
        snapPoints={[550, 400, bottomTabHeight + HEIGHT_ABOVE_BOTTOM_TAB]}
        initialSnap={2}
        renderContent={() => (
          <View
            style={{ backgroundColor: theme.colors.surface, paddingBottom: 20 }}
          >
            <ParkingInfoView
              theme={theme}
              startingDate={ongoingParking?.startingDate}
              endingDate={ongoingParking?.endingDate}
              spot={ongoingParking?.spot}
              onChangeEndingDate={handleEditEndingDate}
            />
            <Button
              loading={isSubmiting}
              mode="contained"
              color={Colors.green500}
              onPress={handlePay}
            >
              Pay
            </Button>
          </View>
        )}
        enabledBottomClamp={true}
        renderHeader={() => (
          <View
            style={[
              styles.hintContainer,
              { backgroundColor: theme.colors.surface },
            ]}
          >
            <DragHint color={Colors.grey500} />
          </View>
        )}
        overflow="hidden"
      />

      <Snackbar
        visible={Boolean(submitError)}
        onDismiss={() => setSubmitError("")}
        action={{ label: "Ok" }}
        duration={Infinity}
        wrapperStyle={{ width: Window.width(100), alignSelf: "center" }}
      >
        {submitError}
      </Snackbar>
    </>
  );
}

function ParkingInfoView({
  theme,
  spot,
  startingDate,
  endingDate,
  onChangeEndingDate,
}: ParkingInfoViewProps) {
  // TODO: shared view with ParkinInfoView component in StartParkingScreen
  const { colors } = theme;

  const duration = DateUtil.diffInMinutes(startingDate, endingDate);

  const price = spot?.price.amount
    ? `$${Math.round(spot?.price.amount * (duration / 60))}`
    : "-";

  return (
    <Surface style={{ backgroundColor: colors.surface }}>
      <Header address={spot?.title || "-"} number={spot?.title || "-"} />

      <View style={styles.inputsContainer}>
        <TextInput
          disabled={true}
          label="Parking from"
          value={DateUtil.humanReadable(startingDate)}
          style={[
            { backgroundColor: "transparent", fontSize: 14 },
            styles.input,
          ]}
        />

        <DateTimePickerInput
          date={endingDate}
          onChangeDate={onChangeEndingDate}
          label="Parking until"
          style={styles.input}
        />
      </View>

      <ExtraInfo duration={duration} />
      <Footer price={price} />
    </Surface>
  );
}

function Header({ address, number }: { address: string; number: string }) {
  const { colors } = useTheme();
  return (
    <View style={[styles.headerContainer, { backgroundColor: colors.accent }]}>
      <Text>{address}</Text>
      <Caption>{number}</Caption>
    </View>
  );
}

function ExtraInfo({ duration }: { duration: number }) {
  return (
    <View
      style={[styles.extraInfoContainer, { backgroundColor: Colors.grey300 }]}
    >
      <Text>{duration} min</Text>
      <Caption>Total duration</Caption>
    </View>
  );
}

function Footer({ price }: { price: string }) {
  return (
    <View style={styles.footerContainer}>
      <Headline>Final Price</Headline>
      <Headline>{price}</Headline>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
  },
  headerContainer: {
    margin: 4,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    minHeight: 50,
    padding: 15,
  },
  inputsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  input: {
    width: 165,
  },
  extraInfoContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 80,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginTop: 12,
    marginBottom: 15,
  },

  hintContainer: {
    shadowColor: "#000000",
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
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
