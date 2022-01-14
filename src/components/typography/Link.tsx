import * as React from "react";
import { TouchableOpacity } from "react-native";
import { Colors, Paragraph } from "react-native-paper";

type LinkProps = React.ComponentProps<typeof Paragraph>;

export default function Link({
  children,
  onPress,
  style,
  ...props
}: LinkProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Paragraph
        style={[{ color: Colors.blue500, alignSelf: "center" }, style]}
        {...props}
      >
        {children}
      </Paragraph>
    </TouchableOpacity>
  );
}
