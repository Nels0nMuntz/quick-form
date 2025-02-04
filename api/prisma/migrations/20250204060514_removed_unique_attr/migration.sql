-- DropIndex
DROP INDEX "FormQuestion_formConfigId_key";

-- DropIndex
DROP INDEX "FormQuestionOption_questionId_key";

-- AlterTable
ALTER TABLE "Form" ALTER COLUMN "endsAt" DROP NOT NULL;
