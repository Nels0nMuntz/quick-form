import dayjs from "dayjs";
import { FetchFormsResponse } from "@/entities/form";
import { GetStatsOutput } from "@/entities/response";

export const formatTableData = (
  data: FetchFormsResponse["forms"],
  stats: GetStatsOutput,
) => {
  return data.map((form) => ({
    ...form,
    updatedAt: dayjs(form.updatedAt).format("DD MMM YYYY - HH:mm"),
    responsesCount: stats[form.id] ? stats[form.id].count : "",
    lastResponseDate: stats[form.id]
      ? dayjs(stats[form.id].lastResponseDate).format("DD MMM YYYY - HH:mm")
      : "",
  }));
};
