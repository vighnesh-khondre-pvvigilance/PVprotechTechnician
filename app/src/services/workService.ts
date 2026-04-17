import { Work } from "../types/work";
import { workData } from "../data/work";

//
// ✅ Helper (VERY IMPORTANT)
// Fixes timezone issue for "YYYY-MM-DD"
//
const toLocalDate = (date: string) => {
  return new Date(date + "T00:00:00");
};

//
// 🔵 Pending (Work Screen)
//
export const getPendingWork = async (): Promise<Work[]> => {
  return workData.filter((item) => item.status === "Pending");
};

//
// 🟢 Completed (History)
//
export const getCompletedWork = async (): Promise<Work[]> => {
  return workData.filter((item) => item.status === "Completed");
};

//
// 🟣 Today Completed (FIXED)
//
export const getTodayCompletedWork = async (): Promise<Work[]> => {
  const today = new Date();

  return workData.filter((item) => {
    if (!item.completedDate) return false;

    const d = toLocalDate(item.completedDate);

    return (
      item.status === "Completed" &&
      d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear()
    );
  });
};

//
// 🟡 (OPTIONAL) Today ALL (Pending + Completed)
//
export const getTodayAllWork = async (): Promise<Work[]> => {
  const today = new Date();

  return workData.filter((item) => {
    const dateStr = item.completedDate || item.assignedDate;
    if (!dateStr) return false;

    const d = toLocalDate(dateStr);

    return (
      d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear()
    );
  });
};