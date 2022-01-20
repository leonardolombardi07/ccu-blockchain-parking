import { UserInfo as FirebaseUserInfo } from "firebase/auth";

export interface User extends FirebaseUserInfo {
  name: string;
  plate: string;
}
