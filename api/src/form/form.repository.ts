import { CurrentUser } from "../user/types/currentUser";
import { db } from "../lib";
import { CreateFormData } from "./types/createFormData";

const findByUserId = async (userId: string) => {
  return await db.form.findMany({
    where: {
      userId,
    },
    include: {
      config: true,
    },
  });
};

const findById = async (formId: number) => {
  return await db.form.findUnique({
    where: {
      id: formId,
    },
    include: {
      config: {
        include: {
          questions: {
            include: {
              options: true,
            },
          },
        },
      },
    },
  });
};

const create = async (form: CreateFormData, user: CurrentUser) => {
  const { endsAt, config } = form;
  const { name, title, description, questions } = config;

  const savedForm = await db.form.create({
    data: {
      user: {
        connect: {
          id: user.id,
        },
      },
      endsAt,
    },
  });

  const savedFormConfig = await db.formConfig.create({
    data: {
      name,
      title,
      description,
      formId: savedForm.id,
    },
  });

  for (const { type, title, required, options } of questions) {
    const savedQuestion = await db.formQuestion.create({
      data: {
        type,
        title,
        required,
        formConfigId: savedFormConfig.id,
      },
    });

    if (options && options.length) {
      await db.formQuestionOption.createMany({
        data: options.map(({ value }) => ({
          value,
          questionId: savedQuestion.id,
        })),
      });
    }
  }
};

export default { findById, findByUserId, create };
