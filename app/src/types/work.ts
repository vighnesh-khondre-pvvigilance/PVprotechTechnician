export type WorkStatus = "Pending" | "In Progress" | "Completed";

export interface Work {
  id: string;
  title: string;
  location: string;
  status: WorkStatus;
  assignedDate: string;
  completedDate?: string;
  report?: string;
  image?: string;
   issue?: string;
  plantName?: string;
  ownerName?: string;
  capacity?: string;

  beforeImage?: string;
  afterImage?: string;
}