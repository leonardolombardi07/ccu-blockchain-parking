import * as React from "react";
import { Parking } from "../types";

interface ParkingState {
  ongoingParking: Parking | null;
}

type ParkingAction =
  | {
      type: "SET_ONGOING_PARKING";
      payload: Parking | null;
    }
  | { type: "EDIT_ONGOING_PARKING"; payload: Partial<Parking> };
type ParkingDispatch = (action: ParkingAction) => void;

interface ParkingContext {
  state: ParkingState;
  dispatch: ParkingDispatch;
}

const ParkingContext = React.createContext<ParkingContext | undefined>(
  undefined
);

function parkingReducer(
  state: ParkingState,
  action: ParkingAction
): ParkingState {
  switch (action.type) {
    case "SET_ONGOING_PARKING":
      return { ...state, ongoingParking: action.payload };

    case "EDIT_ONGOING_PARKING": {
      if (state.ongoingParking) {
        return {
          ...state,
          ongoingParking: { ...state.ongoingParking, ...action.payload },
        };
      }
    }

    default:
      return state;
  }
}

interface ParkingProviderProps {
  children: React.ReactNode;
}

function ParkingProvider({ children }: ParkingProviderProps) {
  const [state, dispatch] = React.useReducer(parkingReducer, {
    ongoingParking: null,
  });

  const value = { state, dispatch };
  return (
    <ParkingContext.Provider value={value}>{children}</ParkingContext.Provider>
  );
}

function useParking() {
  const context = React.useContext(ParkingContext);
  if (context === undefined) {
    throw new Error("useParking must be used within an ParkingProvider");
  }
  return context;
}

export { ParkingProvider, useParking };
