/*
  Warnings:

  - You are about to drop the `PuntajeLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PuntajeLog" DROP CONSTRAINT "PuntajeLog_unidadId_fkey";

-- DropTable
DROP TABLE "PuntajeLog";
