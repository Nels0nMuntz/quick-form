-- CreateTable
CREATE TABLE "FormResponse" (
    "id" TEXT NOT NULL,
    "formId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FormResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormQuestionResponse" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "response" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "formResponseId" TEXT NOT NULL,

    CONSTRAINT "FormQuestionResponse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FormResponse_formId_key" ON "FormResponse"("formId");

-- AddForeignKey
ALTER TABLE "FormQuestionResponse" ADD CONSTRAINT "FormQuestionResponse_formResponseId_fkey" FOREIGN KEY ("formResponseId") REFERENCES "FormResponse"("id") ON DELETE CASCADE ON UPDATE CASCADE;
