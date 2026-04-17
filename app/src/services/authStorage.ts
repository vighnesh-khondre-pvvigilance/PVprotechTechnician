import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../types/user";

const USER_KEY = "auth_user";
const TOKEN_KEY = "auth_token";

export const saveAuth = async (user: User, token: string) => {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  await AsyncStorage.setItem(TOKEN_KEY, token);
};

export const getAuth = async () => {
  const user = await AsyncStorage.getItem(USER_KEY);
  const token = await AsyncStorage.getItem(TOKEN_KEY);

  return {
    user: user ? JSON.parse(user) : null,
    token,
  };
};

export const clearAuth = async () => {
  await AsyncStorage.removeItem(USER_KEY);
  await AsyncStorage.removeItem(TOKEN_KEY);
};