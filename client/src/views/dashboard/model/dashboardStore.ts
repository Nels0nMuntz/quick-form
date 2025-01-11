import { create } from "zustand";
import { Form } from "@/entities/form";

type DashboardState = {
  forms: Form[];
};

type DashboardActions = {
  actions: {
    setForms: (forms: Form[]) => void;
  };
};

type DashboardStore = DashboardState & DashboardActions;

const useDashboardStore = create<DashboardStore>()((set) => ({
  forms: [],
  actions: {
    setForms: (forms) => set({ forms }),
  },
}));

export const useForms = () => useDashboardStore((state) => state.forms);
export const useDashboardActions = useDashboardStore((state) => state.actions);
