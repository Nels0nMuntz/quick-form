/*
  Warnings:

  - Added the required column `name` to the `FormConfig` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FormConfig" ADD COLUMN     "name" TEXT NOT NULL;
