// src/services/workService.ts

import { workData } from "../data/work";

const currentTech = "tech001";

/* -------------------- */
/* Assigned Clients */
/* -------------------- */
export const getAssignedClients =
async () => {
  const clients =
    workData.filter(
      (item) =>
        item.technicianId ===
          currentTech &&
        item.status ===
          "Pending"
    );

  const unique =
    [
      ...new Map(
        clients.map(
          (item) => [
            item.clientId ||
              item.clientName ||
              item.client,
            item,
          ]
        )
      ).values(),
    ];

  return unique;
};

/* -------------------- */
/* Pending Plants */
/* -------------------- */
export const getPendingPlants =
async () => {
  return workData.filter(
    (item) =>
      item.technicianId ===
        currentTech &&
      item.status ===
        "Pending"
  );
};

/* -------------------- */
/* ALL Pending Tasks */
/* NEW CONTROLLER */
/* -------------------- */
export const getPendingWork =
async () => {
  return workData.filter(
    (item) =>
      item.technicianId ===
        currentTech &&
      item.status ===
        "Pending"
  );
};

/* -------------------- */
/* ALL Completed */
/* -------------------- */
export const getCompletedWork =
async () => {
  return workData.filter(
    (item) =>
      item.technicianId ===
        currentTech &&
      item.status ===
        "Completed"
  );
};

/* -------------------- */
/* Today Completed */
/* -------------------- */
export const getTodayCompletedWork =
async () => {
  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  return workData.filter(
    (item) =>
      item.technicianId ===
        currentTech &&
      item.status ===
        "Completed" &&
      item.completedDate ===
        today
  );
};

/* -------------------- */
/* High Priority Pending */
/* -------------------- */
export const getHighPriorityTask =
async () => {
  const tasks =
    workData.filter(
      (item) =>
        item.technicianId ===
          currentTech &&
        item.status ===
          "Pending" &&
        item.priority ===
          "High"
    );

  return tasks[0] || null;
};
export const getPendingApprovalWork =
async () => {
  return workData.filter(
    (item) =>
      item.technicianId === currentTech &&
      item.status === "Completed" &&
      item.adminApproval === "Pending"
  );
};

/* -------------------- */
/* Today All Work */
/* -------------------- */
export const getTodayAllWork =
async () => {
  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  return workData.filter(
    (item) =>
      item.technicianId ===
        currentTech &&
      (
        item.assignedDate ===
          today ||
        item.completedDate ===
          today
      )
  );
};