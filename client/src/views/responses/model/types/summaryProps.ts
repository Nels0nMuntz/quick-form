import { FormResponse } from "@/entities/response";

export interface SummaryProps {
  questionId: string;
  responses: FormResponse[];
}
