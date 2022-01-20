import * as React from "react";
import { ParkingSpot } from "../screens/MapSearchScreen/mockParkingApi";

type ParkingStatus = "SEARCHING" | "ONGOING";

interface ParkingState {
  ongoingParking: ParkingSpot | null;
}

type ParkingAction = {
  type: "SET_ONGOING_PARKING";
  payload: ParkingSpot | null;
};
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
