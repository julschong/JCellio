/*
  Warnings:

  - You are about to drop the column `index` on the `Board` table. All the data in the column will be lost.
  - You are about to drop the column `index` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Board" DROP COLUMN "index";

-- AlterTable
ALTER TABLE "Column" ADD COLUMN     "taskPos" INTEGER[];

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "index";
