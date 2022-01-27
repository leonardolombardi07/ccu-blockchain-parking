import { View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

export default function DragHint({ color }: { color?: string }) {
  const { colors } = useTheme();
  const finalColor = color ? color : colors.onSurface;
  return <View style={[styles.hint, { backgroundColor: finalColor }]} />;
}

const styles = StyleSheet.create({
  hint: {
    width: 40,
    height: 6,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
});
