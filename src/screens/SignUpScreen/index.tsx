import * as React from "react";
// Components
import { View, TextInput as NativeTextInput, StyleSheet } from "react-native";
import {
  Button,
  Divider,
  HelperText,
  Paragraph,
  TextInput,
} from "react-native-paper";
import { Link, PasswordInput } from "../../components";
// Hooks
import { useIsMounted } from "../../hooks";
import { useAuth } from "../../context/auth";
import { useSnackbar } from "../../context/snackbar";
// Services
import * as Firebase from "../../services/firebase";
import * as AuthStorage from "../../services/storage/auth";
// Utils
import * as Validation from "../../utils/Validation";
// Types
import { StackScreenProps } from "@react-navigation/stack";
import { MainStackParamList } from "../../navigation";

type FieldType = "name" | "email" | "password" | "plate";

type SignUpScreenProps = StackScreenProps<MainStackParamList, "SignUp">;

export default function SignUpScreen({ navigation }: SignUpScreenProps) {
  const isMounted = useIsMounted();
  const nameRef = React.useRef<NativeTextInput>(null);
  const emailRef = React.useRef<NativeTextInput>(null);
  const passwordRef = React.useRef<NativeTextInput>(null);
  const plateRef = React.useRef<NativeTextInput>(null);

  const [values, setValues] = React.useState({
    name: "",
    email: "",
    password: "",
    plate: "",
  });

  const [errors, setErrors] = React.useState({
    name: "",
    email: "",
    password: "",
    plate: "",
  });

  function handleChange(newValue: string, type: FieldType) {
    setErrors((e) => ({ ...e, [type]: Validation.validate(type, newValue) }));
    setValues((p) => ({ ...p, [type]: newValue }));
  }

  const [isSubmiting, setIsSubmiting] = React.useState(false);
  const [hasSubmitted, setHasSubmitted] = React.useState(false);

  const { dispatch } = useAuth();
  const { dispatch: snackDispatch } = useSnackbar();
  async function handleSubmit() {
    setHasSubmitted(true);
    if (isSubmiting) return;
    const nameError = Validation.validate("name", values.name);
    if (nameError) return nameRef.current?.focus();
    const emailError = Validation.validate("email", values.email);
    if (emailError) return emailRef.current?.focus();
    const passwordError = Validation.validate("password", values.password);
    if (passwordError) return passwordRef.current?.focus();
    const plateError = Validation.validate("plate", values.plate);
    if (plateError) return plateRef.current?.focus();
    snackDispatch({ type: "HIDE" });
    setIsSubmiting(true);
    try {
      const user = await Firebase.signUp({
        name: values.name,
        email: values.email,
        password: values.password,
        plate: values.plate,
      });
      dispatch({ type: "SIGN_IN", payload: user });
      AuthStorage.saveUser(user);
      navigation.navigate("BottomTab");
    } catch (error: any) {
      snackDispatch({
        type: "SHOW",
        payload: {
          message: error?.message || "Something went Wrong",
          duration: Infinity,
        },
      });
    } finally {
      if (isMounted) setIsSubmiting(false);
    }
  }

  const showError = {
    name: Boolean(hasSubmitted && errors.name),
    email: Boolean(hasSubmitted && errors.email),
    password: Boolean(hasSubmitted && errors.password),
    plate: Boolean(hasSubmitted && errors.plate),
  };

  const hasErrors = Object.values(showError).find((e) => e == true);

  return (
    <View style={styles.container}>
      <TextInput
        ref={nameRef}
        label={"name"}
        autoCapitalize="none"
        value={values.name}
        error={showError.name}
        onChangeText={(newName) => handleChange(newName, "name")}
        onSubmitEditing={() => emailRef.current?.focus()}
      />
      <HelperText type="error">{showError.name && errors.name}</HelperText>

      <TextInput
        ref={emailRef}
        label={"email"}
        keyboardType="email-address"
        autoCapitalize="none"
        value={values.email}
        error={showError.email}
        onChangeText={(newEmail) => handleChange(newEmail, "email")}
        onSubmitEditing={() => passwordRef.current?.focus()}
      />
      <HelperText type="error">{showError.email && errors.email}</HelperText>

      <PasswordInput
        ref={passwordRef}
        label={"password"}
        autoCapitalize="none"
        value={values.password}
        error={showError.password}
        onChangeText={(newPass) => handleChange(newPass, "password")}
        onSubmitEditing={() => plateRef.current?.focus()}
      />
      <HelperText type="error">
        {showError.password && errors.password}
      </HelperText>

      <TextInput
        ref={plateRef}
        label={"plate"}
        keyboardType="default"
        autoCapitalize="none"
        value={values.plate}
        error={showError.plate}
        onChangeText={(newPlate) => handleChange(newPlate, "plate")}
        maxLength={8}
        onSubmitEditing={handleSubmit}
      />
      <HelperText type="error">{showError.plate && errors.plate}</HelperText>

      <Button
        mode="contained"
        disabled={hasSubmitted && hasErrors}
        onPress={handleSubmit}
        loading={isSubmiting}
        style={{ marginBottom: 20 }}
      >
        Register
      </Button>

      <Paragraph style={{ alignSelf: "center" }}>OR</Paragraph>
      <Divider style={{ margin: 5 }} />
      <Link onPress={() => navigation.navigate("SignIn")}>
        Click here to login
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "10%",
    justifyContent: "center",
  },
});
