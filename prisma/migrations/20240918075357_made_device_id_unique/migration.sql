/*
  Warnings:

  - A unique constraint covering the columns `[device_id]` on the table `history` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "history_device_id_key" ON "history"("device_id");
