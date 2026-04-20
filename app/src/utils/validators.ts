// src/utils/validators.ts

import { VisitWorkflowState } from "../types/visit";

export const validateVisitForm = (
  form: VisitWorkflowState,
  step: number
): string | null => {
  /**
   * Step 1 = Approval
   */
  if (step === 1) {
    if (!form.approvalConfirmed) {
      return "Please confirm approval to continue";
    }
  }

  /**
   * Step 2 = Safety
   */
  if (step === 2) {
    if (!form.safety.verified) {
      return "Please verify safety checklist";
    }

    if (!form.safety.image) {
      return "Please upload safety image";
    }
  }

  /**
   * Step 3 = Visit Form
   */
  if (step === 3) {
    if (!form.visitForm?.visitDate?.trim()) {
  return "Please select visit date";
}

    if (!form.visitForm.inverterStatus.trim()) {
      return "Please enter inverter status";
    }

    if (!form.visitForm.importReading.trim()) {
      return "Enter import reading";
    }

    if (!form.visitForm.exportReading.trim()) {
      return "Enter export reading";
    }

    if (!form.visitForm.netReading.trim()) {
      return "Enter net reading";
    }

    if (!form.visitForm.generationReading.trim()) {
      return "Enter generation reading";
    }

    if (!form.visitForm.technicianId.trim()) {
      return "Enter technician ID";
    }
  }

  /**
   * Step 4 = Uploads
   */
  if (step === 4) {
    if (!form.uploads.clientSignature) {
      return "Upload client signature";
    }

    if (!form.uploads.inverterPhoto) {
      return "Upload inverter photo";
    }

    if (!form.uploads.importPhoto) {
      return "Upload import meter photo";
    }

    if (!form.uploads.exportPhoto) {
      return "Upload export meter photo";
    }

    if (!form.uploads.netPhoto) {
      return "Upload net meter photo";
    }

    if (!form.uploads.generationPhoto) {
      return "Upload generation meter photo";
    }
  }

  /**
   * Step 5 = Cleaning
   */
  if (step === 5) {
    if (!form.cleaning.done) {
      return "Please confirm cleaning completed";
    }

    if (form.cleaning.before.length === 0) {
      return "Upload before cleaning photos";
    }

    if (form.cleaning.after.length === 0) {
      return "Upload after cleaning photos";
    }
  }

  return null;
};