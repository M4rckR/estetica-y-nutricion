import { create } from 'zustand';
import { CompleteRegistrationFormType } from '@/types/auth/register';

interface RegisterStore {
  currentStep: number;
  totalSteps: number;
  formData: Partial<CompleteRegistrationFormType>;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateFormData: (data: Partial<CompleteRegistrationFormType>) => void;
  reset: () => void;
}

export const useRegisterStore = create<RegisterStore>((set, get) => ({
  currentStep: 0,
  totalSteps: 4,
  formData: {},
  setCurrentStep: (step) => set({ currentStep: step }),
  nextStep: () => {
    const { currentStep, totalSteps } = get();
    if (currentStep < totalSteps - 1) {
      set({ currentStep: currentStep + 1 });
    }
  },
  prevStep: () => {
    const { currentStep } = get();
    if (currentStep > 0) {
      set({ currentStep: currentStep - 1 });
    }
  },
  updateFormData: (data) => set((state) => ({
    formData: { ...state.formData, ...data }
  })),
  reset: () => set({ currentStep: 0, formData: {} }),
}));