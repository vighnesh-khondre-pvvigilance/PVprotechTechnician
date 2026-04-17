import { User } from "../types/user";
import { mockUser } from "../data/user";

export const getUserProfile = async (): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUser);
    }, 300);
  });
};