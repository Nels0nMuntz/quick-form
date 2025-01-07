export interface FetchResponse<Data> {
  ok: boolean;
  status: number;
  data: Data;
}
