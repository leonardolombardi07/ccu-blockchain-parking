// Components
import { View, StyleSheet } from "react-native";
import {
  Avatar,
  Headline,
  Paragraph,
  Subheading,
  Divider,
  Button,
  Colors,
} from "react-native-paper";
// Utils
import * as DateUtil from "../../utils/Date";
// Types
import { StackScreenProps } from "@react-navigation/stack";
import { MainStackParamList } from "../../navigation";
import { useNavigation } from "@react-navigation/native";

export type PaymentConfirmationScreenProps = StackScreenProps<
  MainStackParamList,
  "PaymentConfirmation"
> & {
  theme: ReactNativePaper.Theme;
};

export default function PaymentConfirmationScreen({
  route: { params },
}: PaymentConfirmationScreenProps) {
  // TODO: FIX THIS!! We are dealing with nested navigation but it was too hard for me 😭
  // Change "any" to appropriate type / type check props
  const navigation: any = useNavigation();

  const { parking } = params || {};
  const { startingDate, endingDate, spot } = parking || {};
  return (
    <View style={styles.screenContainer}>
      <View style={styles.header}>
        <Avatar.Icon
          size={50}
          icon="check"
          color={Colors.green500}
          style={styles.headerIcon}
        />
        <Headline>PAYMENT RECEIVED</Headline>
        <Paragraph>Thank you, your payment has been sucessful</Paragraph>
      </View>

      <View style={styles.infoContainer}>
        <Subheading style={{ fontWeight: "bold" }}>
          Parking Information
        </Subheading>
        <Divider
          style={{ backgroundColor: Colors.grey500, marginBottom: 15 }}
        />

        <View style={styles.infoRowsContainer}>
          <InfoRow
            label="Parked from"
            value={startingDate ? DateUtil.humanReadable(startingDate) : "-"}
          />
          <InfoRow
            label="To"
            value={endingDate ? DateUtil.humanReadable(endingDate) : "-"}
          />
          <InfoRow label="Location" value={spot?.title || "-"} />
          <InfoRow
            label="Price"
            value={
              spot?.price
                ? `${parseFloat(String(spot?.price?.amount)).toFixed(2)}$`
                : "-"
            }
          />
        </View>
      </View>

      <Button
        mode="contained"
        color={Colors.green500}
        onPress={() =>
          navigation.navigate("BottomTab", { screen: "MapSearch" })
        }
        style={{ width: "95%" }}
      >
        Continue Parking
      </Button>
    </View>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Subheading>{label}</Subheading>
      <Paragraph>{value}</Paragraph>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    padding: 10,
    marginBottom: 20,
  },
  headerIcon: {
    borderColor: Colors.green500,
    borderWidth: 1,
    backgroundColor: "transparent",
    marginBottom: 10,
  },
  infoContainer: {
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 50,
  },
  infoRowsContainer: {
    paddingHorizontal: 20,
  },
});
