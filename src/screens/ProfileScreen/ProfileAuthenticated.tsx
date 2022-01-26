import * as React from "react";
// Components
import { View, Alert, StyleSheet } from "react-native";
import { Button, List, withTheme } from "react-native-paper";
import Header from "./Header";
import Field from "./Field";
import EditFieldModal from "./EditFieldModal";
// Hooks
import { useAuth } from "../../context/auth";
// Services
import * as AuthStorage from "../../services/storage/auth";
// Types
import { User } from "../../types";
import { ProfileScreenProps } from "./index";

export default function ProfileAuthenticatedScreen({
  theme,
  navigation,
}: ProfileScreenProps) {
  const {
    state: { user },
  } = useAuth();

  const [isVisible, setIsVisible] = React.useState(false);
  const [label, setLabel] = React.useState("E-mail");
  const [value, setValue] = React.useState<string>(user?.email || "");
  const [fieldName, setFieldName] = React.useState<keyof User>("email");

  function openModal(label: string, value: string, fieldName: keyof User) {
    setIsVisible((v) => !v);
    setLabel(label);
    setValue(value);
    setFieldName(fieldName);
  }

  return (
    <View style={styles.screenContainer}>
      <View style={styles.content}>
        <Header
          theme={theme}
          onEditName={() => openModal("Name", user?.name || "", "name")}
        />

        <List.Item
          title="Previous Parkings"
          onPress={() => navigation.navigate("MyParkings")}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
        />
        <View style={styles.fieldsContainer}>
          <Field
            label="E-mail"
            value={user?.email || "-"}
            onEdit={() => openModal("E-mail", user?.email || "", "email")}
            editable={false}
          />
          <Field
            label="Car Plate"
            value={user?.plate || "-"}
            onEdit={() => openModal("Car Plarte", user?.plate || "", "plate")}
          />
        </View>
      </View>

      <EditFieldModal
        isVisible={isVisible}
        label={label}
        value={value}
        fieldName={fieldName}
        dismiss={() => setIsVisible(false)}
      />

      <SignOutButton color={theme.colors.error} />
    </View>
  );
}

function SignOutButton({ color }: { color: string }) {
  const { dispatch } = useAuth();

  function signOut() {
    dispatch({ type: "SIGN_OUT" });
    AuthStorage.removeUser();
  }

  function handlePress() {
    Alert.alert("Are you sure you want to sign out?", "", [
      { text: "Cancel", style: "cancel" },
      { text: "Yes", onPress: signOut },
    ]);
  }

  return (
    <Button color={color} onPress={handlePress}>
      Sign Out
    </Button>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  content: {
    width: "100%",
    height: "90%",
  },
  fieldsContainer: {
    paddingVertical: 15,
    height: "75%",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
});
