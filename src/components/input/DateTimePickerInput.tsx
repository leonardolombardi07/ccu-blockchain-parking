import * as React from "react";
import {
  Platform,
  StyleSheet,
  View,
  ViewStyle,
  TextInputProps,
  StyleProp,
} from "react-native";
import DateTimePicker, { Event } from "@react-native-community/datetimepicker";
import { TextInput, TouchableRipple } from "react-native-paper";
// Utils
import * as DateUtil from "../../utils/Date";

type DateTimePickerModes = "datetime" | "date" | "time" | undefined;

const initialMode = Platform.OS == "ios" ? "datetime" : "date";

interface DateTimePickerInputProps {
  date: Date;
  onChangeDate: (selectedDate: Date) => void;
  label: string;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

export default function DateTimePickerInput({
  date,
  onChangeDate,
  label,
  style,
  containerStyle,
}: DateTimePickerInputProps) {
  const [isDatePickerVisible, setIsDatePickerVisible] = React.useState(false);
  const [mode, setMode] = React.useState<DateTimePickerModes>(initialMode);

  function handleChangeDate(event: Event, selectedDate: Date | undefined) {
    if (selectedDate == undefined) return setIsDatePickerVisible(false); // Cancelled
    return Platform.OS == "ios"
      ? handleChangeDateIOS(selectedDate)
      : handleChangeDateAndroid(selectedDate);
  }

  function handleChangeDateIOS(selectedDatetime: Date) {
    setIsDatePickerVisible(false);
    onChangeDate(selectedDatetime);
  }

  function handleChangeDateAndroid(selectedDate: Date) {
    setIsDatePickerVisible(false);
    switch (mode) {
      case undefined:
      case "date": {
        onChangeDate(selectedDate);
        setMode("time");
        return setIsDatePickerVisible(true); // to show the picker again in "time" mode
      }
      case "time": {
        onChangeDate(selectedDate);
        setMode("date");
        return setIsDatePickerVisible(false);
      }
    }
  }

  function showDatePicker() {
    setIsDatePickerVisible(true);
    setMode("date");
  }

  return (
    <>
      <TouchableRipple onPress={showDatePicker} style={containerStyle}>
        <View pointerEvents="none">
          <TextInput
            label={label}
            value={DateUtil.humanReadable(date)}
            disabled={true}
            style={[styles.input, style]}
            right={<TextInput.Icon name={"chevron-down"} />}
          />
        </View>
      </TouchableRipple>

      {isDatePickerVisible && (
        <DateTimePicker
          value={date}
          mode={mode as any}
          onChange={handleChangeDate}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 14,
    backgroundColor: "transparent",
  },
});
