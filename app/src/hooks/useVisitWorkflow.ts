// src/hooks/useVisitWorkflow.ts

import { useState } from "react";
import {
  VisitWorkflowState,
  defaultWorkflowState,
} from "../types/visit";

export function useVisitWorkflow(
  taskId: string,
  plantId: string
) {
  const [step, setStep] = useState<number>(1);

  const [form, setForm] = useState<VisitWorkflowState>({
    ...defaultWorkflowState,
    taskId,
    plantId,
  });

  /**
   * ✅ Safe nested update
   * Example:
   * updateForm({
   *   safety: { verified: true }
   * })
   */
  const updateForm = (
    patch: Partial<VisitWorkflowState>
  ) => {
    setForm((prev) => deepMerge(prev, patch));
  };

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const resetWorkflow = () => {
    setStep(1);

    setForm({
      ...defaultWorkflowState,
      taskId,
      plantId,
    });
  };

  return {
    step,
    setStep,

    nextStep,
    prevStep,

    form,
    setForm,
    updateForm,

    resetWorkflow,
  };
}

/**
 * 🔥 Deep Merge Helper
 * Supports nested objects safely
 */
function deepMerge<T>(
  target: T,
  source: Partial<T>
): T {
  const output: any = { ...target };

  for (const key in source) {
    const sourceValue: any = source[key];
    const targetValue: any = output[key];

    if (
      sourceValue &&
      typeof sourceValue === "object" &&
      !Array.isArray(sourceValue)
    ) {
      output[key] = deepMerge(
        targetValue || {},
        sourceValue
      );
    } else {
      output[key] = sourceValue;
    }
  }

  return output as T;
}