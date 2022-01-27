import { StyleSheet, View } from "react-native";
import {
  Surface,
  Text,
  Caption,
  Divider,
  Headline,
  useTheme,
  Colors,
  TextInput,
  HelperText,
} from "react-native-paper";
import DateTimePickerInput from "../../components/input/DateTimePickerInput";
// Utils
import * as DateUtil from "../../utils/Date";
// Types
import { ParkingSpot } from "../MapSearchScreen/mockParkingApi";
import { Values, Errors, ShowError, Refs, HandleChange } from "./types";

interface ParkingInfoViewProps {
  spot: ParkingSpot | null;
  values: Values;
  errors: Errors;
  showError: ShowError;
  refs: Refs;
  handleChange: HandleChange;
  startingDate: Date;
  onChangeStartingDate: (newDate: Date) => void;
  endingDate: Date;
  onChangeEndingDate: (newDate: Date) => void;
}

export default function ParkingInfoView({
  spot,
  values,
  errors,
  showError,
  refs,
  handleChange,
  startingDate,
  onChangeStartingDate,
  endingDate,
  onChangeEndingDate,
}: ParkingInfoViewProps) {
  const { colors } = useTheme();

  const duration = DateUtil.diffInMinutes(startingDate, endingDate);

  const finalPrice = spot?.price.amount
    ? `$${Math.round(spot?.price.amount * (duration / 60))}`
    : "-";

  return (
    <Surface style={[styles.container, { backgroundColor: colors.onSurface }]}>
      <Header address={spot?.title || "-"} number={spot?.title || "-"} />

      <View style={styles.inputsContainer}>
        <DateTimePickerInput
          date={startingDate}
          onChangeDate={onChangeStartingDate}
          label="Parking from"
          style={styles.input}
        />
        <DateTimePickerInput
          date={endingDate}
          onChangeDate={onChangeEndingDate}
          label="Parking until"
          style={styles.input}
        />
      </View>

      <TextInput
        ref={refs.spotId}
        label={"Spot ID"}
        keyboardType="email-address"
        autoCapitalize="none"
        value={values.spotId}
        error={showError.spotId}
        maxLength={8}
        onChangeText={(newSpotId) => handleChange(newSpotId, "spotId")}
      />
      <HelperText type="error">{showError.spotId && errors.spotId}</HelperText>

      <ExtraInfo distance={`${spot?.distance}m`} duration={duration} />
      <Footer price={finalPrice} />
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

function ExtraInfo({
  distance,
  duration,
}: {
  distance: string;
  duration: number;
}) {
  const { colors } = useTheme();
  return (
    <View
      style={[styles.extraInfoContainer, { backgroundColor: colors.backdrop }]}
    >
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text>{duration} min</Text>
        <Caption>Total duration</Caption>
      </View>
      <Divider
        style={{
          width: 1,
          height: "50%",
          backgroundColor: Colors.grey500,
          alignSelf: "center",
        }}
      />
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text>{distance}</Text>
        <Caption>To destination</Caption>
      </View>
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
    marginTop: 10,
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
    flexDirection: "row",
    justifyContent: "space-around",
    height: 80,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginTop: 12,
    marginBottom: 15,
  },
});
