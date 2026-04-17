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