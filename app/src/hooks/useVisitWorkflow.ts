import { useState } from "react";
import { VisitWorkflowState } from "../types/visit";

export function useVisitWorkflow(taskId: string, plantId: string) {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState<VisitWorkflowState>({
    taskId,
    plantId,

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
  });

  // ✅ SAFE nested update helper
  const updateForm = (patch: Partial<VisitWorkflowState>) => {
    setForm((prev) => deepMerge(prev, patch));
  };

  return {
    step,
    setStep,
    form,
    setForm,
    updateForm,
  };
}

/**
 * 🔥 Deep merge helper (safe for nested workflow state)
 */
function deepMerge<T>(target: T, source: Partial<T>): T {
  const output = { ...target };

  for (const key in source) {
    const value = source[key];

    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value)
    ) {
      output[key] = {
        ...output[key],
        ...value,
      };
    } else {
      output[key] = value as any;
    }
  }

  return output;
}