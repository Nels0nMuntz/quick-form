import responseRepository from "./response.repository";
import { CreateResponseData } from "./schemas/createResponseSchema";
import { GetResponseData } from "./schemas/getResponseSchema";
import { NotFoundError } from "../utils";
import { RemoveResponseData } from "./schemas/removeResponseSchema";
import { GetResponsesData } from "./schemas/getStatsSchema";

const create = async (data: CreateResponseData) => {
  return await responseRepository.create(data);
};

const get = async (data: GetResponseData) => {
  const responses = await responseRepository.getByFormId(Number(data.id));
  if (!responses) {
    throw new NotFoundError("Form response not found");
  }
  return responses.map((response) => ({
    id: response.id,
    formId: response.formId,
    createdAt: response.createdAt,
    answers: response.answers.map((item) => ({
      id: item.id,
      questionId: item.questionId,
      type: item.type,
      value: item.type === "Checkbox" ? item.value : item.value[0],
    })),
  }));
};

const getStats = async (data: GetResponsesData) => {
  const result = {} as Record<
    number,
    { count: number; lastResponseDate?: Date }
  >;
  const formsIds = data.ids.split(",").map((id) => Number(id));
  const responses = await responseRepository.getByFormIdList(formsIds);
  const ids = Array.from(new Set(responses.map(({ formId }) => formId)));

  ids.forEach((id) => {
    const responsesByFormId = responses.filter(({ formId }) => formId === id);

    result[id] = {
      count: responsesByFormId.length,
    };

    if (responsesByFormId.length) {
      const lastResponseDate = responsesByFormId.sort(
        (resA, resB) => +new Date(resB.createdAt) - +new Date(resA.createdAt)
      )[0].createdAt;
      result[id].lastResponseDate = lastResponseDate;
    }
  });

  return result;
};

const remove = async (data: RemoveResponseData) => {
  await responseRepository.remove(data.responseId);
};

export default { create, get, getStats, remove };
