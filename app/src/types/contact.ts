export type Role = "Super Admin" | "Admin" | "Technician";

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
}