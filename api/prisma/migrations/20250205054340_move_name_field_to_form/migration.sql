/*
  Warnings:

  - You are about to drop the column `name` on the `FormConfig` table. All the data in the column will be lost.
  - Added the required column `name` to the `Form` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Form" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "FormConfig" DROP COLUMN "name";
