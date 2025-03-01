/*
  Warnings:

  - You are about to drop the `FormQuestionResponse` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FormQuestionResponse" DROP CONSTRAINT "FormQuestionResponse_formResponseId_fkey";

-- DropTable
DROP TABLE "FormQuestionResponse";

-- CreateTable
CREATE TABLE "FormQuestionAnswer" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "value" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "formResponseId" TEXT NOT NULL,

    CONSTRAINT "FormQuestionAnswer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FormQuestionAnswer" ADD CONSTRAINT "FormQuestionAnswer_formResponseId_fkey" FOREIGN KEY ("formResponseId") REFERENCES "FormResponse"("id") ON DELETE CASCADE ON UPDATE CASCADE;
