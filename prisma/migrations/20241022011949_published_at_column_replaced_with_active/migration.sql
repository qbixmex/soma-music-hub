/*
  Warnings:

  - You are about to drop the column `published_at` on the `events` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "events" DROP COLUMN "published_at",
ADD COLUMN     "active" BOOLEAN DEFAULT false;
