import React from "react";
// Components
import { View, StyleSheet } from "react-native";
import { Headline } from "react-native-paper";
// Types
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { BottomTabsParamList } from "../../navigation";

type SearchScreenProps = BottomTabScreenProps<BottomTabsParamList, "Search">;

export default function SearchScreen({}: SearchScreenProps) {
  return (
    <View style={styles.container}>
      <Headline>Search Screen</Headline>
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
