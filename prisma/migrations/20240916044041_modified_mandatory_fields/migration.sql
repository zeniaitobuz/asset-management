/*
  Warnings:

  - You are about to drop the column `created_at ` on the `devices` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[device_assignment_id]` on the table `devices` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "devices" DROP COLUMN "created_at ",
ADD COLUMN     "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "is_outdated" SET DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "devices_device_assignment_id_key" ON "devices"("device_assignment_id");
