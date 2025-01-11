import { Form } from "@/entities/form";
import { create } from "zustand";

type SearchFormState = {
  searchResult: Form[];
};

type SearchFormActions = {
  actions: {
    setSearchResult: (result: Form[]) => void;
  };
};

type SearchFormStore = SearchFormState & SearchFormActions;

const useSearchFormStore = create<SearchFormStore>()((set) => ({
  searchResult: [],
  actions: {
    setSearchResult: (result) => set({ searchResult: result }),
  },
}));

export const useSearchResult = () =>
  useSearchFormStore((state) => state.searchResult);
export const useSearchActions = () =>
  useSearchFormStore((state) => state.actions);
