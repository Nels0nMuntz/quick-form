import responseRepository from "./response.repository";
import { CreateResponseData } from "./schemas/createResponseSchema";
import { GetResponseData } from "./schemas/getResponseSchema";
import { NotFoundError } from "../utils";
import { RemoveResponseData } from "./schemas/removeResponseSchema";

const create = async (data: CreateResponseData) => {
  return await responseRepository.create(data);
};

const get = async (data: GetResponseData) => {
  const response = await responseRepository.getByFormId(data.fomrId);
  if (!response) {
    throw new NotFoundError("Form response not found");
  }
  return {
    id: response.id,
    formId: response.formId,
    createdAt: response.createdAt,
    responses: response.responses.map((item) => ({
      id: item.id,
      questionId: item.questionId,
      type: item.type,
      response: item.type === "Checkbox" ? item.response : item.response[0],
    })),
  };
};

const remove = async (data: RemoveResponseData) => {
  await responseRepository.remove(data.responseId);
};

export default { create, get, remove };
