import * as React from "react";
import { ActivityIndicator, ActivityIndicatorProps } from "react-native";
import { withTheme } from "react-native-paper";

interface LoadingIndicatorProps extends ActivityIndicatorProps {
  theme: ReactNativePaper.Theme;
}

export default withTheme(function LoadingIndicator({
  theme,
  ...props
}: LoadingIndicatorProps) {
  return (
    <ActivityIndicator color={theme.colors.backdrop} size={40} {...props} />
  );
});
