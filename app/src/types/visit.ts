// src/types/visit.ts

export type VisitStatus = "Pending" | "In Progress" | "Completed";

export interface Visit {
  id: string;
  plantId: string;
  taskId: string;

  siteName: string;
  clientName: string;
  location: string;

  assignedDate: string;
  technicianName: string;

  priority: "Low" | "Medium" | "High";
  status: VisitStatus;
}

export interface VisitWorkflowState {
  plantId: string;
  taskId: string;

  approvalConfirmed: boolean;

  safety: {
    verified: boolean;
    image: string | null;
  };

  visitForm: {
    visitDate: string;
    inverterStatus: string;
    inverterRemarks: string;

    importReading: string;
    exportReading: string;
    netReading: string;
    generationReading: string;

    extraRemarks: string;
    technicianId: string;
  };

  uploads: {
    clientSignature: string | null;
    extraPhoto: string | null;
    inverterPhoto: string | null;
    importPhoto: string | null;
    exportPhoto: string | null;
    netPhoto: string | null;
    generationPhoto: string | null;
  };

  cleaning: {
    done: boolean;
    before: string[];
    after: string[];
  };
}

export const defaultWorkflowState: VisitWorkflowState = {
  plantId: "",
  taskId: "",

  approvalConfirmed: false,

  safety: {
    verified: false,
    image: null,
  },

  visitForm: {
    visitDate: "",
    inverterStatus: "",
    inverterRemarks: "",

    importReading: "",
    exportReading: "",
    netReading: "",
    generationReading: "",

    extraRemarks: "",
    technicianId: "",
  },

  uploads: {
    clientSignature: null,
    extraPhoto: null,
    inverterPhoto: null,
    importPhoto: null,
    exportPhoto: null,
    netPhoto: null,
    generationPhoto: null,
  },

  cleaning: {
    done: false,
    before: [],
    after: [],
  },
};