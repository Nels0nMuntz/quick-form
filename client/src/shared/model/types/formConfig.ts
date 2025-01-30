import { PartialFormQuestion } from "@/entities/question";
import { EditorJSONContent } from "./EditorJSONContent";

export interface FormConfig {
  title: EditorJSONContent;
  description?: EditorJSONContent;
  questions: PartialFormQuestion[];
}
