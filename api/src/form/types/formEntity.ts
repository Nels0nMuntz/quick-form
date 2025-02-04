export interface FormEntity {
  id: number;
  config: FormConfig;
  createdAt: Date;
  updatedAt: Date;
  endsAt: Date | null;
}

interface FormConfig {
  id: string;
  name: string;
  title: object;
  description?: object;
  questions: FormQuestion[];
}

interface FormQuestion {
  id: string;
  title: object;
  type: FormQuestionsType;
  options: FormQuestionOption[];
  required?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface FormQuestionOption {
  id: string;
  value: string;
}

type FormQuestionsType =
  | "Short text"
  | "Long text"
  | "Checkbox"
  | "Dropdown";
