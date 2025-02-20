import dayjs from "dayjs";
import { FetchFormsResponse } from "@/entities/form";

export const formatTableData = (data: FetchFormsResponse["forms"]) => {
  return data.map((form) => ({
    ...form,
    updatedAt: dayjs(form.updatedAt).format("DD MMM YYYY - HH:mm"),
  }));
};
