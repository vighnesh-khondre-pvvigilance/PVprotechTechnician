export type UserRole = "Technician" | "Admin" | "SuperAdmin";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role?: string;
  avatar?: string; // ✅ ADD THIS
}