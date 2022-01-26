import * as React from "react";
// Components
import { View, StyleSheet } from "react-native";
import { Button, Headline, Paragraph } from "react-native-paper";
// Types
import { ProfileScreenProps } from "./index";

export default function ProfileUnauthenticatedScreen({
  navigation,
}: ProfileScreenProps) {
  return (
    <View style={styles.screenContainer}>
      <Headline>Your Profile</Headline>

      <Paragraph style={{ marginBottom: 15, textAlign: "center" }}>
        To access your profile, please sign in or create a MAALTA Parking
        account
      </Paragraph>

      <Button
        onPress={() => navigation.navigate("SignIn")}
        mode="contained"
        style={{ marginTop: 15, marginBottom: 5 }}
      >
        Login in to your account
      </Button>
      <Button onPress={() => navigation.navigate("SignUp")} mode="text">
        Register
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 2,
  },
});
