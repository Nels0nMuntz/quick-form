import { PartialFormQuestion } from "@/entities/question";

export interface FormConfig {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  data: {
    title: string;
    description?: string;
    questions: PartialFormQuestion[];
  };
}
