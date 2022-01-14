// Components
import { useTheme } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";
import { Button, Paragraph } from "react-native-paper";

interface FieldProps {
  label: string;
  value: string;
  editable?: boolean;
  onEdit?: () => void;
}

export default function Field({
  label,
  value,
  onEdit,
  editable = true,
}: FieldProps) {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.container,
        styles.shadow,
        { backgroundColor: colors.background },
      ]}
    >
      <View>
        <Paragraph style={{ fontWeight: "bold" }}>{label}</Paragraph>
        <Paragraph>{value}</Paragraph>
      </View>

      {editable && <Button onPress={onEdit}>Edit</Button>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  shadow: {
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
});
