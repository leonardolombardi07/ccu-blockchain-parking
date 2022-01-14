import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../../types";

const USER_PERSISTENCE_KEY = "User_PERSISTENCE_KEY";

export async function getUser() {
  const savedUserState = await AsyncStorage?.getItem(USER_PERSISTENCE_KEY);
  return savedUserState ? (JSON.parse(savedUserState) as User) : undefined;
}

export async function saveUser(user: User) {
  await AsyncStorage?.setItem(USER_PERSISTENCE_KEY, JSON.stringify(user));
}

export function removeUser() {
  return AsyncStorage.removeItem(USER_PERSISTENCE_KEY);
}
