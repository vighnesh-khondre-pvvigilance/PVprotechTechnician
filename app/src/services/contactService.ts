import { Contact } from "../types/contact";
import { CONTACTS } from "../data/contact";

// Simulated API (later replace)
export const getContacts = async (): Promise<Contact[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(CONTACTS);
    }, 500);
  });
};