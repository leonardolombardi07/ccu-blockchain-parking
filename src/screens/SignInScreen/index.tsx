import * as React from "react";
// Components
import { View, TextInput as NativeTextInput, StyleSheet } from "react-native";
import {
  Button,
  Divider,
  HelperText,
  Paragraph,
  Snackbar,
  TextInput,
} from "react-native-paper";
import { Link, PasswordInput } from "../../components";
// Hooks
import { useIsMounted } from "../../hooks";
import { useAuth } from "../../context/auth";
// Services
import * as Firebase from "../../services/firebase";
import * as AuthStorage from "../../services/storage/auth";
// Constants
import { Window } from "../../constants/Dimensions";
// Utils
import * as Validation from "../../utils/Validation";
// Types
import { StackScreenProps } from "@react-navigation/stack";
import { AuthStackParamList } from "../../navigation";

type InputType = "email" | "password";

type SignInScreenProps = StackScreenProps<AuthStackParamList, "SignIn">;

export default function SignInScreen({ navigation }: SignInScreenProps) {
  const isMounted = useIsMounted();
  const emailRef = React.useRef<NativeTextInput>(null);
  const passwordRef = React.useRef<NativeTextInput>(null);

  const [values, setValues] = React.useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = React.useState({
    email: "",
    password: "",
  });

  function handleChange(newValue: string, type: InputType) {
    setErrors((e) => ({ ...e, [type]: Validation.validate(type, newValue) }));
    setValues((p) => ({ ...p, [type]: newValue }));
  }

  const [isSubmiting, setIsSubmiting] = React.useState(false);
  const [hasSubmitted, setHasSubmitted] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [isSnackbarVisible, setIsSnackbarVisible] = React.useState(false);

  const { dispatch } = useAuth();
  async function handleSubmit() {
    setHasSubmitted(true);
    if (isSubmiting) return;
    const emailError = Validation.validate("email", values.email);
    if (emailError) return emailRef.current?.focus();
    const passwordError = Validation.validate("password", values.password);
    if (passwordError) return passwordRef.current?.focus();
    setIsSnackbarVisible(false);
    setIsSubmiting(true);
    try {
      const user = await Firebase.signIn({
        email: values.email,
        password: values.password,
      });
      dispatch({ type: "SIGN_IN", payload: user });
      AuthStorage.saveUser(user);
    } catch (error: any) {
      setSubmitError(error?.message || "Something went Wrong");
      setIsSnackbarVisible(true);
    } finally {
      if (isMounted) setIsSubmiting(false);
    }
  }

  const showError = {
    email: Boolean(hasSubmitted && errors.email),
    password: Boolean(hasSubmitted && errors.password),
  };

  const hasErrors = Object.values(showError).find((e) => e == true);

  return (
    <View style={styles.container}>
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
        onSubmitEditing={handleSubmit}
      />
      <HelperText type="error">
        {showError.password && errors.password}
      </HelperText>

      <Button
        mode="contained"
        disabled={hasSubmitted && hasErrors}
        onPress={handleSubmit}
        loading={isSubmiting}
        style={{ marginBottom: 20 }}
      >
        Login
      </Button>

      <Paragraph style={{ alignSelf: "center" }}>OR</Paragraph>
      <Divider style={{ margin: 5 }} />
      <Link onPress={() => navigation.navigate("SignUp")}>
        Click here register
      </Link>

      <Snackbar
        visible={isSnackbarVisible}
        onDismiss={() => setIsSnackbarVisible((v) => !v)}
        action={{ label: "Ok" }}
        duration={Infinity}
        wrapperStyle={{ width: Window.width(100), alignSelf: "center" }}
      >
        {submitError}
      </Snackbar>
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
