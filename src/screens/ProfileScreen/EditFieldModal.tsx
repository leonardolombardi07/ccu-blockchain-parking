import * as React from "react";
// Components
import { StyleSheet, View, TextInput as NativeTextInput } from "react-native";
import {
  Button,
  Modal,
  TextInput,
  withTheme,
  Paragraph,
  Colors,
} from "react-native-paper";
import { useAuth } from "../../context/auth";
// Services
import * as Firebase from "../../services/firebase";
import * as AuthStorage from "../../services/storage/auth";
// Types
import { User } from "../../types";

interface EditFieldModalProps {
  label: string;
  value: string;
  fieldName: keyof User;
  isVisible: boolean;
  dismiss: () => void;
  theme: ReactNativePaper.Theme;
}

export default withTheme(EditFieldModal);

function EditFieldModal({
  isVisible,
  dismiss,
  label,
  value,
  fieldName,
  theme: { colors },
}: EditFieldModalProps) {
  const inputRef = React.useRef<NativeTextInput>(null);

  const [input, setInput] = React.useState(value);
  const [isSubmiting, setIsSubmiting] = React.useState<boolean>(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const {
    state: { user },
    dispatch,
  } = useAuth();

  React.useEffect(
    function onValueChange() {
      setInput(value);
    },
    [value]
  );

  React.useEffect(
    function onVisible() {
      if (isVisible) inputRef.current?.focus();
    },
    [isVisible]
  );

  async function handlePress() {
    if (isSubmiting) return;
    if (input == value) return dismiss();

    setIsSubmiting(true);
    setSubmitError(null);
    try {
      const fieldToUpdate = { [fieldName]: input };
      if (user?.uid) {
        await Firebase.editUser(user?.uid, fieldToUpdate);
        const newUser = { ...user, ...fieldToUpdate };
        AuthStorage.saveUser(newUser);
      }
      dispatch({ type: "EDIT_USER", payload: fieldToUpdate });
      dismiss();
    } catch (error: any) {
      setSubmitError(error || "Something went wrong");
    } finally {
      setIsSubmiting(false);
    }
  }

  return (
    <Modal
      visible={isVisible}
      onDismiss={dismiss}
      contentContainerStyle={[
        styles.contentContainer,
        { backgroundColor: colors.surface },
      ]}
    >
      <View>
        <TextInput
          ref={inputRef}
          label={label}
          autoCapitalize="none"
          value={input}
          onChangeText={(t) => setInput(t)}
          style={{ marginBottom: 15 }}
        />

        <Paragraph style={{ color: Colors.red900, fontWeight: "bold" }}>
          {submitError || ""}
        </Paragraph>
      </View>

      <Button mode="contained" loading={isSubmiting} onPress={handlePress}>
        Done
      </Button>
      <Button
        style={{ marginTop: 10 }}
        disabled={isSubmiting}
        onPress={dismiss}
      >
        Cancel
      </Button>
    </Modal>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 20,
  },
});
