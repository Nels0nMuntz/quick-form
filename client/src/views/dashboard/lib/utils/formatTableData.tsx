import { Form } from "@/entities/form";
import dayjs from "dayjs";

export const formatTableData = (data: Form[]) => {
  return data.map((form) => ({
    ...form,
    updatedAt: dayjs(form.updatedAt).format("DD MMM YYYY - HH:mm"),
  }));
};
