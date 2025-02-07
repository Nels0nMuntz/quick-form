export interface FormEntity {
  id: number;
  name: string;
  config: FormConfig;
  createdAt: Date;
  updatedAt: Date;
  endsAt: Date | null;
}

export interface FormConfig {
  id: string;
  title: object;
  description?: object;
  questions: FormQuestion[];
}

export interface FormQuestion {
  id: string;
  title: object;
  type: FormQuestionsType;
  options: FormQuestionOption[];
  required?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface FormQuestionOption {
  id: string;
  value: string;
}

type FormQuestionsType =
  | "Short text"
  | "Long text"
  | "Checkbox"
  | "Dropdown";
