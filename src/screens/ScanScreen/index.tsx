import React from "react";
// Components
import { View, StyleSheet } from "react-native";
import { Headline } from "react-native-paper";
// Types
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { BottomTabsParamList } from "../../navigation";

type ScanScreenProps = BottomTabScreenProps<BottomTabsParamList, "Scan">;

export default function ScanScreen({}: ScanScreenProps) {
  return (
    <View style={styles.container}>
      <Headline>Scan QR Code Screen</Headline>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
