import * as React from "react";
import { TextInput as NativeTextInput } from "react-native";
import { TextInput } from "react-native-paper";

type PasswordInputProps = React.ComponentProps<typeof TextInput>;

const PasswordInput = React.forwardRef<NativeTextInput, PasswordInputProps>(
  function PasswordInputWithoutRef(props, ref) {
    const [isVisible, setIsVisible] = React.useState(false);

    function toggleVisibility() {
      setIsVisible((isVisible) => !isVisible);
    }

    return (
      <TextInput
        ref={ref}
        label={"password"}
        right={
          <TextInput.Icon
            onPress={toggleVisibility}
            name={isVisible ? "eye" : "eye-off"}
          />
        }
        secureTextEntry={isVisible}
        {...props}
      />
    );
  }
);

export default PasswordInput;
