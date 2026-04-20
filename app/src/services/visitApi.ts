// src/services/visitApi.ts

import {
  Visit,
  VisitWorkflowState,
} from "../types/visit";

/**
 * Dummy Visit Data
 */
const dummyVisits: Visit[] = [
  {
    id: "1001",
    plantId: "PLANT-001",
    taskId: "TASK-1001",

    siteName: "ABC Solar Plant",
    clientName: "ABC Energy",
    location: "Pune",

    assignedDate: "20 Apr 2026",
    technicianName: "Vighnesh",

    status: "Pending",
    priority: "High",
  },

  {
    id: "1002",
    plantId: "PLANT-002",
    taskId: "TASK-1002",

    siteName: "XYZ Rooftop",
    clientName: "XYZ Infra",
    location: "Mumbai",

    assignedDate: "21 Apr 2026",
    technicianName: "Rahul",

    status: "In Progress",
    priority: "Medium",
  },

  {
    id: "1003",
    plantId: "PLANT-003",
    taskId: "TASK-1003",

    siteName: "Green Energy Farm",
    clientName: "Green Pvt Ltd",
    location: "Nashik",

    assignedDate: "22 Apr 2026",
    technicianName: "Amit",

    status: "Completed",
    priority: "Low",
  },
];

export const visitApi = {
  /**
   * Get all visits
   */
  getVisits: async (): Promise<Visit[]> => {
    await delay(500);
    return dummyVisits;
  },

  /**
   * Get visit by id
   */
  getVisitById: async (
    id: string
  ): Promise<Visit> => {
    await delay(600);

    const data = dummyVisits.find(
      (item) => item.id === id
    );

    return data || dummyVisits[0];
  },

  /**
   * Get visit by taskId
   */
  getVisitByTaskId: async (
    taskId: string
  ): Promise<Visit> => {
    await delay(600);

    const data = dummyVisits.find(
      (item) => item.taskId === taskId
    );

    return data || dummyVisits[0];
  },

  /**
   * Submit workflow form
   */
  submitVisit: async (
    payload: VisitWorkflowState
  ) => {
    await delay(1200);

    console.log("Submitted Workflow:", payload);

    return {
      success: true,
      message: "Visit submitted successfully",
    };
  },

  /**
   * Mark visit completed
   */
  completeVisit: async (id: string) => {
    await delay(500);

    console.log("Completed Visit:", id);

    return {
      success: true,
    };
  },
};

/**
 * Reusable delay
 */
function delay(ms: number) {
  return new Promise((resolve) =>
    setTimeout(resolve, ms)
  );
}