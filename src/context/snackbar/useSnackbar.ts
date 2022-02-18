import * as React from "react";
import { SnackbarContext } from "./context";

export default function useSnackbar() {
  const context = React.useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error("useSnackbar must be used within an SnackbarProvider");
  }
  return context;
}
