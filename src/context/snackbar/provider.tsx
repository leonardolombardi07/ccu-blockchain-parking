import * as React from "react";
import { SnackbarContext, SnackbarAction, SnackbarState } from "./context";
import Snackbar from "./Snackbar";

function snackbarReducer(
  state: SnackbarState,
  action: SnackbarAction
): SnackbarState {
  switch (action.type) {
    case "SHOW":
      return { snack: action.payload };
    case "HIDE":
      return { snack: null };
  }
}

interface SnackbarProviderProps {
  children: React.ReactNode;
}

export default function SnackbarProvider({ children }: SnackbarProviderProps) {
  const [state, dispatch] = React.useReducer(snackbarReducer, {
    snack: null,
  });

  const value = { state, dispatch };
  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <Snackbar />
    </SnackbarContext.Provider>
  );
}
