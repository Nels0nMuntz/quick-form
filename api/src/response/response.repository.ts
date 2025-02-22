import { db } from "../lib";
import { CreateResponseData } from "./schemas/createResponseSchema";

const create = async ({ formId, responses }: CreateResponseData) => {
  const savedResponse = await db.formResponse.create({
    data: { formId },
  });

  for (const { type, response, questionId } of responses) {
    await db.formQuestionResponse.create({
      data: {
        type,
        questionId,
        response: Array.isArray(response) ? response : [response],
        formResponseId: savedResponse.id,
      },
    });
  }

  return savedResponse;
};

const getByFormId = async (formId: number) => {
  return await db.formResponse.findMany({
    where: { formId },
    include: { responses: true },
  });
};

const remove = async (responseId: string) => {
  return await db.formResponse.delete({
    where: { id: responseId },
  });
};

export default { create, getByFormId, remove };
