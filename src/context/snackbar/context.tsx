import * as React from "react";

interface Snack {
  duration?: number;
  action?: { label: string };
  message: string;
}

export interface SnackbarState {
  snack: Snack | null;
}

export type SnackbarAction =
  | { type: "SHOW"; payload: Snack }
  | { type: "HIDE" };
type SnackbarDispatch = (action: SnackbarAction) => void;

interface SnackbarContext {
  state: SnackbarState;
  dispatch: SnackbarDispatch;
}

export const SnackbarContext = React.createContext<SnackbarContext | undefined>(
  undefined
);
