import * as React from "react";
import { User } from "../types";

interface AuthState {
  user: User | undefined;
  isAuthenticated: boolean;
}

type AuthAction =
  | { type: "SIGN_IN"; payload: User }
  | { type: "SIGN_OUT" }
  | { type: "EDIT_USER"; payload: Partial<User> };
type AuthDispatch = (action: AuthAction) => void;

interface AuthContext {
  state: AuthState;
  dispatch: AuthDispatch;
}

const AuthContext = React.createContext<AuthContext | undefined>(undefined);

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "SIGN_IN":
      return { user: action.payload, isAuthenticated: true };
    case "SIGN_OUT":
      return { user: undefined, isAuthenticated: false };
    case "EDIT_USER": {
      const editedUser = { ...state.user, ...action.payload } as User;
      return { ...state, user: editedUser };
    }
  }
}

interface AuthProviderProps {
  children: React.ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = React.useReducer(authReducer, {
    user: undefined,
    isAuthenticated: false,
  });

  const value = { state, dispatch };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
