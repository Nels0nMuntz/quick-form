import { Form } from "./form";

export interface FetchFormsRequest {
  query?: string;
  take?: number;
  skip?: number;
  fields?: (keyof Form)[];
}
