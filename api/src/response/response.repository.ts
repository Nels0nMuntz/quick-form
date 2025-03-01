import { db } from "../lib";
import { CreateResponseData } from "./schemas/createResponseSchema";

const create = async ({ formId, answers }: CreateResponseData) => {
  const savedResponse = await db.formResponse.create({
    data: { formId },
  });

  for (const { type, value, questionId } of answers) {
    await db.formQuestionAnswer.create({
      data: {
        type,
        questionId,
        value: Array.isArray(value) ? value : [value],
        formResponseId: savedResponse.id,
      },
    });
  }

  return savedResponse;
};

const getByFormId = async (formId: number) => {
  return await db.formResponse.findMany({
    where: { formId },
    include: { answers: true },
  });
};

const getByFormIdList = async (formIdList: number[]) => {
  return await db.formResponse.findMany({
    where: { formId: { in: formIdList } },
    include: { answers: true },
  });
};

const remove = async (responseId: string) => {
  return await db.formResponse.delete({
    where: { id: responseId },
  });
};

export default { create, getByFormId, getByFormIdList, remove };
