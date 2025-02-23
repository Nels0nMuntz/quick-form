import { db } from "../lib";
import { CurrentUser } from "../user/types/currentUser";
import { CreateFormData } from "./schemas/createFormSchema";
import { UpdateFormData } from "./schemas/updateFormSchema";

const findMany = async ({
  userId,
  search,
  skip,
  take,
}: {
  userId: string;
  skip?: number;
  take?: number;
  search?: string;
}) => {
  return await db.form.findMany({
    where: {
      userId,
      name: {
        contains: search,
      },
    },
    skip,
    take,
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

const findBySlug = async (slug: string) => {
  return await db.form.findFirst({
    where: {
      slug,
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
  const { name, endsAt, config } = form;
  const { title, description, questions } = config;

  const savedForm = await db.form.create({
    data: {
      name,
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

const update = async ({ id: formId, name, endsAt, config }: UpdateFormData) => {
  await db.form.update({
    where: {
      id: formId,
    },
    data: {
      name,
      endsAt,
    },
  });

  await db.formConfig.update({
    where: {
      id: config.id,
    },
    data: {
      title: config.title,
      description: config.description,
    },
  });

  await db.formQuestion.deleteMany({
    where: { formConfigId: config.id },
  });

  if (!config.questions.length) return;

  for (const { type, title, required, options } of config.questions) {
    const savedQuestion = await db.formQuestion.create({
      data: {
        type,
        title,
        required,
        formConfigId: config.id,
      },
    });

    if (options?.length) {
      await db.formQuestionOption.createMany({
        data: options.map(({ value }) => ({
          value,
          questionId: savedQuestion.id,
        })),
      });
    }
  }
};

const remove = async (formId: number) => {
  return await db.form.delete({
    where: {
      id: formId,
    },
  });
};

export default { findById, findBySlug, findMany, create, update, remove };
