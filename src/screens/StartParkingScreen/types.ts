import { TextInput as NativeTextInput } from "react-native";

type InputType = "spotId";

export type Values = {
  [key in InputType]: string;
};

export type Errors = {
  [key in InputType]: string | null;
};

export type ShowError = {
  [key in InputType]: boolean;
};

export type Refs = {
  [key in InputType]: React.RefObject<NativeTextInput>;
};

export type HandleChange = (newValue: string, type: InputType) => void;
