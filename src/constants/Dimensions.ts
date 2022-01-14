import { Dimensions } from "react-native";

const _window = Dimensions.get("window");

export function windowWidth(percentage: number) {
  return (_window.width * percentage) / 100;
}

export function windowHeight(percentage: number) {
  return (_window.height * percentage) / 100;
}

export const Window = {
  width: windowWidth,
  height: windowHeight,
};
