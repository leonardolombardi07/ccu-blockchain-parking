import * as React from "react";
// Components
import { Snackbar as RNPaperSnackbar } from "react-native-paper";
// Hooks
import useSnackbar from "./useSnackbar";
// Constants
import { Window } from "../../constants/Dimensions";

export default function Snackbar() {
  const {
    state: { snack },
    dispatch,
  } = useSnackbar();

  function dismiss() {
    dispatch({ type: "HIDE" });
  }

  return (
    <RNPaperSnackbar
      visible={Boolean(snack)}
      onDismiss={dismiss}
      action={{
        label: snack?.action?.label || "Ok",
        onPress: dismiss,
      }}
      duration={snack?.duration || 5000}
      wrapperStyle={{ width: Window.width(100), alignSelf: "center" }}
    >
      {snack?.message}
    </RNPaperSnackbar>
  );
}
