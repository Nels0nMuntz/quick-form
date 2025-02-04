import { PartialFormQuestion } from "@/entities/question";
import { EditorJSONContent } from "./EditorJSONContent";

export interface FormConfig {
  name: string;
  title: EditorJSONContent;
  description?: EditorJSONContent;
  questions: PartialFormQuestion[];
}
