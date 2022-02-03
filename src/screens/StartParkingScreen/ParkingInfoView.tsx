import * as React from "react";
// Components
import { View, Image, StyleSheet } from "react-native";
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
  Portal,
  Modal,
  Button,
} from "react-native-paper";
import DateTimePickerInput from "../../components/input/DateTimePickerInput";
// Constants
import { Window } from "../../constants/Dimensions";
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
  const [isHelpModalVisible, setIsHelpModalVisible] = React.useState(false);
  const { colors } = useTheme();

  const duration = DateUtil.diffInMinutes(startingDate, endingDate);

  const price = spot?.price.amount
    ? `$${Math.round(spot?.price.amount * (duration / 60))}`
    : "-";

  return (
    <>
      <Surface style={[styles.container, { backgroundColor: colors.surface }]}>
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
          label={"Location ID"}
          keyboardType="email-address"
          autoCapitalize="none"
          value={values.spotId}
          error={showError.spotId}
          maxLength={8}
          right={
            <TextInput.Icon
              onPress={() => setIsHelpModalVisible(true)}
              name={"help"}
            />
          }
          onChangeText={(newSpotId) => handleChange(newSpotId, "spotId")}
        />
        <HelperText type="error">
          {showError.spotId && errors.spotId}
        </HelperText>

        <ExtraInfo distance={`${spot?.distance}m`} duration={duration} />
        <Footer price={price} />
      </Surface>

      <Portal>
        <Modal
          visible={isHelpModalVisible}
          onDismiss={() => setIsHelpModalVisible(false)}
          contentContainerStyle={{ backgroundColor: "white", padding: 10 }}
        >
          <Headline>Location ID</Headline>
          <Text>
            Every car spot will have a Location ID which is unique to that spot.
            You must fill in this ID to ensure you are parking your car in the
            right place. The Location ID is visible on the spot, as exemplified
            in the image below:
          </Text>

          <View style={styles.modalImageContainer}>
            <Image
              source={require("../../assets/LocationID/Station.jpg")}
              style={styles.modalImage}
            />
          </View>

          <Button
            onPress={() => setIsHelpModalVisible(false)}
            style={{ alignSelf: "flex-end" }}
          >
            Close
          </Button>
        </Modal>
      </Portal>
    </>
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
  return (
    <View
      style={[styles.extraInfoContainer, { backgroundColor: Colors.grey300 }]}
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
      <Headline>Price</Headline>
      <Headline>{price}</Headline>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    marginTop: 10,
  },
  modalImageContainer: {
    overflow: "hidden",
    alignSelf: "center",
    marginVertical: 10,
  },
  modalImage: {
    width: Window.width(100),
    height: 350,
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
